import React from 'react';
import './App.css';
import Navbar from './components/ui/Navbar';
import Hero from './components/section/Hero';
import About from './components/section/About';
import Team from './components/section/Team';
import Matches from './components/section/Matches';
import News from './components/section/News';
import Footer from './components/ui/Footer';

function App() {
  return (
    <div className="bg-black text-white font-sans">
      {/* Navbar */}
      <Navbar/>

      {/* Hero */}
    <Hero/>

      {/* About */}
     <About/>

      {/* Team */}
  
{/* <Team/> */}

      {/* Matches */}
    {/* <Matches/> */}

      {/* Gallery */}
      {/* <section className="px-6 py-20 bg-black">
        <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-wide">Moments Captured</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img
                src={`https://source.unsplash.com/random/600x600?football&sig=${i}`}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
                alt="gallery"
              />
            </div>
          ))}
        </div>
      </section> */}

      {/* News */}
   {/* <News/> */}

      {/* Footer / Contact */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
