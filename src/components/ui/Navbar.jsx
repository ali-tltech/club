import React from 'react'
import logo from '../../assets/logo.png'
function Navbar() {
  return (
<nav className="fixed top-0 w-full z-50 backdrop-blur bg-black/70 px-8 py-4 flex justify-between items-center border-b border-white/10 shadow-lg">
        <img src={logo} className='h-10 w-auto' alt="" />
        <ul className="hidden md:flex space-x-8 text-sm uppercase font-medium">
          {['Home', 'About', 'Team', 'Matches', 'Gallery', 'News', 'Contact'].map((item, i) => (
            <li key={i} className="hover:text-gray-300 cursor-pointer transition">{item}</li>
          ))}
        </ul>
      </nav>  )
}

export default Navbar