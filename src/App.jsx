import React from 'react';
import './App.css';
import Navbar from './components/ui/Navbar';
import Hero from './components/section/Hero';
import About from './components/section/About';
import Team from './components/section/Team';
import Matches from './components/section/Matches';
import News from './components/section/News';
import Footer from './components/ui/Footer';
import KeralaFoodMenu from './components/pages/KeralaFoodMenu';

function App() {
  return (
    <div className="bg-black text-white font-sans">
     <KeralaFoodMenu/>
    </div>
  );
}

export default App;
