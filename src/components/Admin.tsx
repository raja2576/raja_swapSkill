import React, { useState } from 'react';
import { Shield, Users, MessageSquare, AlertTriangle, Download, Bell, Ban, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useSwap } from '../context/SwapContext';

export function Admin() {
  const { user, users } = useUser();
  const { swapRequests } = useSwap();
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600">Access Denied</h2>
        <p className="text-gray-500">You don't have permission to access this page.</p>
      </div>
    );
  }

  const stats = {
    totalUsers: users.length,
    activeSwaps: swapRequests.filter(req => req.status === 'accepted').length,
    pendingRequests: swapRequests.filter(req => req.status === 'pending').length,
    completedSwaps: swapRequests.filter(req => req.status === 'completed').length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'swaps', label: 'Swaps', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Download },
  ];

  const sendPlatformMessage = () => {
    // In a real app, this would send a notification to all users
    alert(`Platform message sent: "${message}"`);
    setMessage('');
    setShowMessageModal(false);
  };

  const downloadReport = (type: string) => {
    // In a real app, this would generate and download actual reports
    const data = {
      users: type === 'users' ? users : null,
      swaps: type === 'swaps' ? swapRequests : null,
      activity: type === 'activity' ? { users, swaps: swapRequests } : null,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-orange-100 text-lg">Monitor and manage the SkillSwap platform</p>
          </div>
          <button
            onClick={() => setShowMessageModal(true)}
            className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-all"
          >
            <Bell className="w-5 h-5" />
            <span>Send Message</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeSwaps}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingRequests}</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Swaps</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedSwaps}</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-100">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {swapRequests.slice(0, 5).map(swap => (
                <div key={swap.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Swap request: {swap.requestedSkillId} ↔ {swap.offeredSkillId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{swap.status}</span>
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(swap.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">User Management</h2>
          <div className="space-y-4">
            {users.map(targetUser => (
              <div key={targetUser.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={targetUser.profilePhoto}
                    alt={targetUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{targetUser.name}</h3>
                    <p className="text-gray-600 text-sm">{targetUser.email}</p>
                    <p className="text-gray-500 text-sm">
                      {targetUser.skillsOffered.length} skills offered • {targetUser.swapsCompleted} swaps completed
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Ban className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'swaps' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Swap Monitoring</h2>
          <div className="space-y-4">
            {swapRequests.map(swap => (
              <div key={swap.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {swap.requestedSkillId} ↔ {swap.offeredSkillId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Requester: {swap.requesterId} → Target: {swap.targetId}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    swap.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    swap.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {swap.status}
                  </span>
                </div>
                {swap.message && (
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                    "{swap.message}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => downloadReport('users')}
              className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center"
            >
              <Download className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">User Report</h3>
              <p className="text-gray-600 text-sm">Download user activity and profile data</p>
            </button>
            
            <button
              onClick={() => downloadReport('swaps')}
              className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-center"
            >
              <Download className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Swaps Report</h3>
              <p className="text-gray-600 text-sm">Download swap requests and feedback data</p>
            </button>
            
            <button
              onClick={() => downloadReport('activity')}
              className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-center"
            >
              <Download className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Activity Report</h3>
              <p className="text-gray-600 text-sm">Download comprehensive platform analytics</p>
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Platform Message</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your platform-wide message..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendPlatformMessage}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}