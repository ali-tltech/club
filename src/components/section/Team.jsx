import React from 'react'

function Team() {
  return (
    <section className="px-6 py-20 bg-black">
        <h2 className="text-4xl font-bold text-center mb-12 uppercase tracking-wide">Our Warriors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 backdrop-blur border border-white/10 hover:scale-105 transition duration-300 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/10 mb-4"></div>
              <h3 className="font-bold text-lg">Player {i + 1}</h3>
              <p className="text-sm text-gray-400">Midfielder</p>
            </div>
          ))}
        </div>
      </section>  )
}

export default Team