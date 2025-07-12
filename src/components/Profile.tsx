import React, { useState } from 'react';
import { Plus, X, Clock, Globe, Lock, Save, Star } from 'lucide-react';
import { useUser } from '../context/UserContext';

const skillCategories = [
  'Programming', 'Design', 'Language', 'Music', 'Creative', 'Business', 
  'Marketing', 'Writing', 'Photography', 'Cooking', 'Sports', 'Teaching'
];

const availabilityOptions = [
  'weekdays-morning', 'weekdays-afternoon', 'weekdays-evening',
  'weekends-morning', 'weekends-afternoon', 'weekends-evening',
  'flexible'
];

export function Profile() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    profilePhoto: user?.profilePhoto || '',
    isPublic: user?.isPublic || true,
    availability: user?.availability || [],
  });

  const [newSkillOffered, setNewSkillOffered] = useState({ name: '', description: '', category: '' });
  const [newSkillWanted, setNewSkillWanted] = useState({ name: '', description: '', category: '' });

  if (!user) return null;

  const handleSave = () => {
    updateUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.name.trim()) {
      const skill = {
        id: Date.now().toString(),
        ...newSkillOffered
      };
      updateUser({
        ...user,
        skillsOffered: [...user.skillsOffered, skill]
      });
      setNewSkillOffered({ name: '', description: '', category: '' });
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.name.trim()) {
      const skill = {
        id: Date.now().toString(),
        ...newSkillWanted
      };
      updateUser({
        ...user,
        skillsWanted: [...user.skillsWanted, skill]
      });
      setNewSkillWanted({ name: '', description: '', category: '' });
    }
  };

  const removeSkillOffered = (id: string) => {
    updateUser({
      ...user,
      skillsOffered: user.skillsOffered.filter(skill => skill.id !== id)
    });
  };

  const removeSkillWanted = (id: string) => {
    updateUser({
      ...user,
      skillsWanted: user.skillsWanted.filter(skill => skill.id !== id)
    });
  };

  const toggleAvailability = (option: string) => {
    const newAvailability = formData.availability.includes(option)
      ? formData.availability.filter(a => a !== option)
      : [...formData.availability, option];
    setFormData({ ...formData, availability: newAvailability });
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={user.profilePhoto || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${user.isPublic ? 'bg-green-500' : 'bg-gray-400'}`}>
                {user.isPublic ? <Globe className="w-3 h-3 text-white m-0.5" /> : <Lock className="w-3 h-3 text-white m-0.5" />}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.location}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{user.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{user.swapsCompleted} swaps completed</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo URL</label>
              <input
                type="url"
                value={formData.profilePhoto}
                onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Make profile public</span>
              </label>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-blue-600" />
          Availability
        </h2>
        {isEditing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availabilityOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleAvailability(option)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  formData.availability.includes(option)
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {user.availability.map((time) => (
              <span
                key={time}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {time.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Skills Offered */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills I Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {user.skillsOffered.map((skill) => (
            <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                <button
                  onClick={() => removeSkillOffered(skill.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-2">{skill.description}</p>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

        {/* Add New Skill Offered */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Add New Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkillOffered.name}
              onChange={(e) => setNewSkillOffered({ ...newSkillOffered, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newSkillOffered.category}
              onChange={(e) => setNewSkillOffered({ ...newSkillOffered, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {skillCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={addSkillOffered}
              className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          <textarea
            placeholder="Describe your skill and experience level"
            value={newSkillOffered.description}
            onChange={(e) => setNewSkillOffered({ ...newSkillOffered, description: e.target.value })}
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills I Want to Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {user.skillsWanted.map((skill) => (
            <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                <button
                  onClick={() => removeSkillWanted(skill.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-2">{skill.description}</p>
              <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                {skill.category}
              </span>
            </div>
          ))}
        </div>

        {/* Add New Skill Wanted */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Add Skill You Want to Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkillWanted.name}
              onChange={(e) => setNewSkillWanted({ ...newSkillWanted, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newSkillWanted.category}
              onChange={(e) => setNewSkillWanted({ ...newSkillWanted, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {skillCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={addSkillWanted}
              className="flex items-center justify-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          <textarea
            placeholder="What level are you looking for? What would you like to achieve?"
            value={newSkillWanted.description}
            onChange={(e) => setNewSkillWanted({ ...newSkillWanted, description: e.target.value })}
            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}