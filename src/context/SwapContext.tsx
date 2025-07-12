import React, { createContext, useContext, useState, useEffect } from 'react';

interface SwapRequest {
  id: string;
  requesterId: string;
  targetId: string;
  requestedSkillId: string;
  offeredSkillId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  rating?: number;
  feedback?: string;
  ratedBy?: string;
}

interface SwapContextType {
  swapRequests: SwapRequest[];
  createSwapRequest: (request: Omit<SwapRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => void;
  deleteSwapRequest: (id: string) => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export function SwapProvider({ children }: { children: React.ReactNode }) {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('skillswap_requests');
    if (stored) {
      setSwapRequests(JSON.parse(stored));
    } else {
      // Initialize with some sample data
      const sampleRequests: SwapRequest[] = [
        {
          id: '1',
          requesterId: 'demo-1',
          targetId: '2',
          requestedSkillId: 'React.js',
          offeredSkillId: 'Photography',
          message: 'Hi! I would love to learn React development from you. I can teach you photography basics in return.',
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      setSwapRequests(sampleRequests);
      localStorage.setItem('skillswap_requests', JSON.stringify(sampleRequests));
    }
  }, []);

  const createSwapRequest = (request: Omit<SwapRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSwapRequests(prev => {
      const updated = [...prev, newRequest];
      localStorage.setItem('skillswap_requests', JSON.stringify(updated));
      return updated;
    });
  };

  const updateSwapRequest = (id: string, updates: Partial<SwapRequest>) => {
    setSwapRequests(prev => {
      const updated = prev.map(req => 
        req.id === id 
          ? { ...req, ...updates, updatedAt: new Date().toISOString() }
          : req
      );
      localStorage.setItem('skillswap_requests', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSwapRequest = (id: string) => {
    setSwapRequests(prev => {
      const updated = prev.filter(req => req.id !== id);
      localStorage.setItem('skillswap_requests', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SwapContext.Provider value={{ 
      swapRequests, 
      createSwapRequest, 
      updateSwapRequest, 
      deleteSwapRequest 
    }}>
      {children}
    </SwapContext.Provider>
  );
}

export function useSwap() {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
}