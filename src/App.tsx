import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Browse } from './components/Browse';
import { Swaps } from './components/Swaps';
import { Admin } from './components/Admin';
import { Auth } from './components/Auth';
import { UserProvider } from './context/UserContext';
import { SwapProvider } from './context/SwapContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <UserProvider>
      <SwapProvider>
        <div className="min-h-screen bg-slate-50">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main>
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'auth' && <Auth setCurrentPage={setCurrentPage} />}
            {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'browse' && <Browse />}
            {currentPage === 'swaps' && <Swaps />}
            {currentPage === 'admin' && <Admin />}
          </main>
        </div>
      </SwapProvider>
    </UserProvider>
  );
}

export default App;