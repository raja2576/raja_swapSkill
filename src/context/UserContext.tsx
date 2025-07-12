import React, { createContext, useContext, useState, useEffect } from 'react';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  profilePhoto: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: string[];
  isPublic: boolean;
  role: 'user' | 'admin';
  rating: number;
  swapsCompleted: number;
  joinedDate: string;
}

interface UserContextType {
  user: User | null;
  users: User[];
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('skillswap_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load users from localStorage
    const storedUsers = localStorage.getItem('skillswap_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('skillswap_user', JSON.stringify(userData));
    
    // Add user to users list if not exists
    setUsers(prevUsers => {
      const exists = prevUsers.find(u => u.id === userData.id);
      if (!exists) {
        const newUsers = [...prevUsers, userData];
        localStorage.setItem('skillswap_users', JSON.stringify(newUsers));
        return newUsers;
      }
      return prevUsers;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillswap_user');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('skillswap_user', JSON.stringify(userData));
    
    // Update user in users list
    setUsers(prevUsers => {
      const newUsers = prevUsers.map(u => u.id === userData.id ? userData : u);
      localStorage.setItem('skillswap_users', JSON.stringify(newUsers));
      return newUsers;
    });
  };

  return (
    <UserContext.Provider value={{ user, users, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}