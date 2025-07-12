import React from 'react';
import { ArrowRight, Users, BookOpen, Award, Star, TrendingUp, Shield, Clock } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  const features = [
    {
      icon: Users,
      title: 'Connect with Experts',
      description: 'Find skilled professionals and passionate learners in your area ready to share knowledge.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: BookOpen,
      title: 'Learn & Teach',
      description: 'Exchange skills in a mutually beneficial way. Teach what you know, learn what you need.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Build Your Reputation',
      description: 'Earn ratings and reviews as you complete successful skill exchanges with the community.',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Active Members' },
    { number: '15,000+', label: 'Skills Exchanged' },
    { number: '98%', label: 'Success Rate' },
    { number: '50+', label: 'Skill Categories' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'UX Designer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'I learned Spanish conversation skills in exchange for teaching web design. The platform made it so easy to find the perfect match!'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Teaching Python helped me improve my communication skills while learning photography. Win-win situation!'
    },
    {
      name: 'Emily Johnson',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'The quality of people on this platform is amazing. I\'ve made lasting connections while expanding my skillset.'
    }
  ];

  const categories = [
    { name: 'Programming', count: '1,200+ skills', color: 'bg-blue-100 text-blue-800' },
    { name: 'Design', count: '800+ skills', color: 'bg-purple-100 text-purple-800' },
    { name: 'Languages', count: '600+ skills', color: 'bg-green-100 text-green-800' },
    { name: 'Music', count: '400+ skills', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Business', count: '500+ skills', color: 'bg-red-100 text-red-800' },
    { name: 'Creative', count: '700+ skills', color: 'bg-indigo-100 text-indigo-800' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Exchange Skills,
                  <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Expand Horizons
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Join a thriving community where knowledge flows freely. Learn from experts, share your expertise, and grow together.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('auth')}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setCurrentPage('browse')}
                  className="border-2 border-slate-600 hover:border-slate-500 text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Browse Skills
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://images.pexels.com/photos/${774909 + i * 100}/pexels-photo-${774909 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=50`}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.9/5</span>
                  </div>
                  <p className="text-slate-400">from 2,500+ members</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">JavaScript Mastery</p>
                        <p className="text-sm text-slate-300">with Alex Chen</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-emerald-400">Active</p>
                      <p className="text-xs text-slate-400">2 sessions left</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Spanish Conversation</p>
                        <p className="text-sm text-slate-300">with Maria Lopez</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-purple-400">Scheduled</p>
                      <p className="text-xs text-slate-400">Tomorrow 3 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Photography Basics</p>
                        <p className="text-sm text-slate-300">Teaching David Kim</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-400">Completed</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-slate-400">5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How SkillSwap Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform makes skill exchange simple, safe, and rewarding for everyone involved.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Popular Skill Categories
            </h2>
            <p className="text-xl text-slate-600">
              Discover skills across diverse fields and find your perfect learning match.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-slate-50 hover:bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-slate-100 hover:border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500">{category.count}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                    Popular
                  </span>
                </div>
                <div className="mt-4 flex items-center text-slate-400 group-hover:text-slate-600 transition-colors">
                  <span className="text-sm">Explore category</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-slate-300">
              Real stories from real people who've transformed their skills.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join thousands of learners and experts who are already exchanging skills and building meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('auth')}
              className="bg-white text-emerald-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Join SkillSwap Today
            </button>
            <button
              onClick={() => setCurrentPage('browse')}
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Explore Skills
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-emerald-100">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Growing Community</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}