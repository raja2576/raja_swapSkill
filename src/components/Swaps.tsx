import React, { useState } from 'react';
import { Clock, Check, X, Star, MessageSquare, User, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useSwap } from '../context/SwapContext';

export function Swaps() {
  const { user, users } = useUser();
  const { swapRequests, updateSwapRequest, deleteSwapRequest } = useSwap();
  const [activeTab, setActiveTab] = useState('received');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  if (!user) return null;

  const receivedRequests = swapRequests.filter(req => req.targetId === user.id);
  const sentRequests = swapRequests.filter(req => req.requesterId === user.id);
  const completedSwaps = swapRequests.filter(req => 
    (req.requesterId === user.id || req.targetId === user.id) && req.status === 'completed'
  );

  const handleAccept = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'accepted' });
  };

  const handleReject = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'rejected' });
  };

  const handleComplete = (requestId: string) => {
    updateSwapRequest(requestId, { status: 'completed', completedAt: new Date().toISOString() });
  };

  const handleDelete = (requestId: string) => {
    deleteSwapRequest(requestId);
  };

  const openRatingModal = (swap: any) => {
    setSelectedSwap(swap);
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (selectedSwap) {
      // In a real app, this would update the other user's rating
      updateSwapRequest(selectedSwap.id, {
        rating: rating,
        feedback: feedback,
        ratedBy: user.id
      });
      setShowRatingModal(false);
      setRating(5);
      setFeedback('');
    }
  };

  const getUserById = (id: string) => {
    return users.find(u => u.id === id) || {
      id,
      name: 'Unknown User',
      profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Unknown'
    };
  };

  const tabs = [
    { id: 'received', label: 'Received', count: receivedRequests.length },
    { id: 'sent', label: 'Sent', count: sentRequests.length },
    { id: 'completed', label: 'Completed', count: completedSwaps.length },
  ];

  const renderSwapCard = (swap: any, type: 'received' | 'sent' | 'completed') => {
    const otherUser = type === 'received' 
      ? getUserById(swap.requesterId)
      : getUserById(swap.targetId);

    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };

    return (
      <div key={swap.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={otherUser.profilePhoto}
              alt={otherUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
              <p className="text-gray-600 text-sm">{otherUser.location}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[swap.status]}`}>
            {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {type === 'received' ? 'They want to learn:' : 'You want to learn:'}
              </p>
              <p className="font-medium text-blue-600">{swap.requestedSkillId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {type === 'received' ? 'They offer:' : 'You offer:'}
              </p>
              <p className="font-medium text-green-600">{swap.offeredSkillId}</p>
            </div>
          </div>
          {swap.message && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-700">"{swap.message}"</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date(swap.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex space-x-2">
            {type === 'received' && swap.status === 'pending' && (
              <>
                <button
                  onClick={() => handleReject(swap.id)}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleAccept(swap.id)}
                  className="flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept</span>
                </button>
              </>
            )}

            {type === 'sent' && swap.status === 'pending' && (
              <button
                onClick={() => handleDelete(swap.id)}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            )}

            {swap.status === 'accepted' && (
              <button
                onClick={() => handleComplete(swap.id)}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Mark Complete</span>
              </button>
            )}

            {swap.status === 'completed' && !swap.rating && (
              <button
                onClick={() => openRatingModal(swap)}
                className="flex items-center space-x-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <Star className="w-4 h-4" />
                <span>Rate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'received' && (
          <div className="space-y-4">
            {receivedRequests.length > 0 ? (
              receivedRequests.map(swap => renderSwapCard(swap, 'received'))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No swap requests received</h3>
                <p className="text-gray-500">When others request to learn from you, they'll appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sent' && (
          <div className="space-y-4">
            {sentRequests.length > 0 ? (
              sentRequests.map(swap => renderSwapCard(swap, 'sent'))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No swap requests sent</h3>
                <p className="text-gray-500">Start browsing skills to find people you'd like to learn from!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedSwaps.length > 0 ? (
              completedSwaps.map(swap => renderSwapCard(swap, 'completed'))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No completed swaps yet</h3>
                <p className="text-gray-500">Your completed skill exchanges will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && selectedSwap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Your Experience</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star className="w-full h-full fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience with this skill swap..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}