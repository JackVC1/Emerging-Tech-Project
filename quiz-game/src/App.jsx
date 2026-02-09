import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'rules'

  return (
    <div className="app-container">
      <Navbar onNavigate={setView} currentView={view} />
      <MainContent view={view} />
      <Footer />
    </div>
  );
}

export default App;
