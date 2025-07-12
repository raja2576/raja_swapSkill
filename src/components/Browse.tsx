import React, { useState, useMemo } from 'react';
import {
  Search, Filter, MapPin, Star, Clock, MessageSquare, Users
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useSwap } from '../context/SwapContext';

export function Browse() {
  const { user, users } = useUser();
  const { createSwapRequest } = useSwap();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const sampleUsers = useMemo(() => user ? [
    {
      id: '2',
      name: 'Alex Chen',
      email: 'alex@example.com',
      location: 'New York, NY',
      profilePhoto: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      skillsOffered: [
        { id: '1', name: 'React.js', description: 'Advanced React development with hooks and context', category: 'Programming' },
        { id: '2', name: 'UI/UX Design', description: 'Modern web design and user experience', category: 'Design' }
      ],
      skillsWanted: [
        { id: '1', name: 'Machine Learning', description: 'Python-based ML fundamentals', category: 'Programming' }
      ],
      availability: ['weekdays-evening', 'weekends'],
      isPublic: true,
      role: 'user',
      rating: 4.9,
      swapsCompleted: 23,
      joinedDate: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'maria@example.com',
      location: 'Los Angeles, CA',
      profilePhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      skillsOffered: [
        { id: '1', name: 'Spanish', description: 'Native Spanish speaker offering conversation practice', category: 'Language' },
        { id: '2', name: 'Photography', description: 'Professional portrait and event photography', category: 'Creative' }
      ],
      skillsWanted: [
        { id: '1', name: 'Digital Marketing', description: 'Social media and online marketing strategies', category: 'Marketing' }
      ],
      availability: ['weekends', 'weekdays-evening'],
      isPublic: true,
      role: 'user',
      rating: 4.7,
      swapsCompleted: 18,
      joinedDate: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@example.com',
      location: 'San Francisco, CA',
      profilePhoto: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150',
      skillsOffered: [
        { id: '1', name: 'Guitar', description: 'Acoustic and electric guitar lessons for beginners', category: 'Music' },
        { id: '2', name: 'Cooking', description: 'Asian cuisine and knife skills', category: 'Cooking' }
      ],
      skillsWanted: [
        { id: '1', name: 'Video Editing', description: 'Adobe Premiere Pro basics', category: 'Creative' }
      ],
      availability: ['weekends', 'flexible'],
      isPublic: true,
      role: 'user',
      rating: 4.8,
      swapsCompleted: 15,
      joinedDate: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Emma Thompson',
      email: 'emma@example.com',
      location: 'Austin, TX',
      profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      skillsOffered: [
        { id: '1', name: 'Content Writing', description: 'SEO-optimized blog posts and copywriting', category: 'Writing' },
        { id: '2', name: 'Social Media Marketing', description: 'Instagram and TikTok growth strategies', category: 'Marketing' }
      ],
      skillsWanted: [
        { id: '1', name: 'Web Development', description: 'HTML, CSS, and JavaScript basics', category: 'Programming' }
      ],
      availability: ['weekdays-morning', 'weekends'],
      isPublic: true,
      role: 'user',
      rating: 4.6,
      swapsCompleted: 12,
      joinedDate: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'James Wilson',
      email: 'james@example.com',
      location: 'Seattle, WA',
      profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      skillsOffered: [
        { id: '1', name: 'Data Analysis', description: 'Excel, Python pandas, and data visualization', category: 'Business' },
        { id: '2', name: 'Public Speaking', description: 'Presentation skills and confidence building', category: 'Business' }
      ],
      skillsWanted: [
        { id: '1', name: 'Graphic Design', description: 'Adobe Illustrator and logo design', category: 'Design' }
      ],
      availability: ['weekdays-evening', 'flexible'],
      isPublic: true,
      role: 'user',
      rating: 4.9,
      swapsCompleted: 28,
      joinedDate: new Date().toISOString(),
    }
  ] : [], [user]);

  const allUsers = [...users, ...sampleUsers].filter(u => u.id !== user?.id && u.isPublic);

  const categories = ['Programming', 'Design', 'Language', 'Music', 'Creative', 'Business', 'Marketing', 'Writing', 'Photography', 'Cooking'];
  const locations = [...new Set(allUsers.map(u => u.location))];

  const filteredUsers = useMemo(() => {
    return allUsers.filter(u => {
      const matchesSearch = searchTerm === '' ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.skillsOffered.some(skill =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory = selectedCategory === '' ||
        u.skillsOffered.some(skill => skill.category === selectedCategory);
      const matchesLocation = selectedLocation === '' || u.location === selectedLocation;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [allUsers, searchTerm, selectedCategory, selectedLocation]);

  const handleSwapRequest = (targetUserId: string, targetSkillId: string, offeredSkillId: string) => {
    if (!user) return;
    createSwapRequest({
      requesterId: user.id,
      targetId: targetUserId,
      requestedSkillId: targetSkillId,
      offeredSkillId: offeredSkillId,
      message: `Hi! I'd like to learn ${targetSkillId} and can offer ${offeredSkillId} in return.`
    });
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Please sign in to browse skills</h3>
          <p className="text-gray-500">Create an account or sign in to discover amazing skills in our community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-4 space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users or skills..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-black"
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="flex gap-4 mb-4">
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="p-2 border rounded">
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="p-2 border rounded">
            <option value="">All Locations</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(u => (
          <div key={u.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex items-center space-x-4 mb-2">
              <img src={u.profilePhoto} alt={u.name} className="w-12 h-12 rounded-full" />
              <div>
                <h4 className="font-semibold">{u.name}</h4>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {u.location}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" /> {u.rating} · <Clock className="w-4 h-4 mx-1" /> {u.swapsCompleted} swaps
            </p>
            <h5 className="font-medium text-sm mb-1">Skills Offered:</h5>
            <ul className="mb-2">
              {u.skillsOffered.map(skill => (
                <li key={skill.id} className="text-sm text-gray-700">• {skill.name}</li>
              ))}
            </ul>
            <button
              onClick={() =>
                handleSwapRequest(
                  u.id,
                  u.skillsWanted[0]?.id || '',
                  user.skillsOffered?.[0]?.id || ''
                )
              }
              className="mt-2 w-full text-sm flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <MessageSquare className="w-4 h-4" />
              Request Swap
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
