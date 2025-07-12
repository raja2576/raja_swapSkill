import React from 'react';
import { Star, Users, Clock, TrendingUp, MessageSquare, Award, ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useSwap } from '../context/SwapContext';

interface DashboardProps {
  setCurrentPage: (page: string) => void;
}

export function Dashboard({ setCurrentPage }: DashboardProps) {
  const { user } = useUser();
  const { swapRequests } = useSwap();

  if (!user) return null;

  const pendingRequests = swapRequests.filter(req => 
    (req.requesterId === user.id || req.targetId === user.id) && req.status === 'pending'
  ).length;

  const stats = [
    { 
      label: 'Skills Offered', 
      value: user.skillsOffered.length, 
      icon: BookOpen, 
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    { 
      label: 'Skills Wanted', 
      value: user.skillsWanted.length, 
      icon: TrendingUp, 
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    { 
      label: 'Swaps Completed', 
      value: user.swapsCompleted, 
      icon: Award, 
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    { 
      label: 'Pending Requests', 
      value: pendingRequests, 
      icon: MessageSquare, 
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
  ];

  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Add skills and manage your profile',
      action: () => setCurrentPage('profile'),
      color: 'from-emerald-500 to-teal-600',
      icon: Users
    },
    {
      title: 'Browse Skills',
      description: 'Find people with skills you need',
      action: () => setCurrentPage('browse'),
      color: 'from-blue-500 to-indigo-600',
      icon: BookOpen
    },
    {
      title: 'Manage Swaps',
      description: 'View and respond to swap requests',
      action: () => setCurrentPage('swaps'),
      color: 'from-purple-500 to-pink-600',
      icon: MessageSquare
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold mb-3">Welcome back, {user.name}!</h1>
            <p className="text-slate-300 text-lg mb-4">
              Ready to share and learn new skills today?
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{user.rating.toFixed(1)} Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">{user.swapsCompleted} Swaps</span>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{user.skillsOffered.length + user.skillsWanted.length}</div>
              <div className="text-slate-300 text-sm">Total Skills</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border ${stat.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} border ${stat.border}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`group bg-gradient-to-r ${action.color} text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-left relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 opacity-20">
                <action.icon className="w-12 h-12" />
              </div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-white/90 mb-4">{action.description}</p>
                <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Get started</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {pendingRequests > 0 ? (
            <div className="flex items-start space-x-4 p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="p-2 bg-amber-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 mb-1">
                  You have {pendingRequests} pending swap request{pendingRequests > 1 ? 's' : ''}
                </p>
                <p className="text-slate-600 text-sm mb-3">Review and respond to incoming requests</p>
                <button
                  onClick={() => setCurrentPage('swaps')}
                  className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium text-sm"
                >
                  View requests
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No recent activity</h3>
              <p className="text-slate-500 mb-4">Start by browsing skills or updating your profile!</p>
              <button
                onClick={() => setCurrentPage('browse')}
                className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Browse Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}