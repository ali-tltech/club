import React from 'react'

function News() {
  return (
   <section className="px-6 py-20 bg-gradient-to-t from-black via-gray-900 to-black">
        <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-wide">Latest Buzz</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
              <h4 className="text-xl font-bold mb-2">Title of News #{i + 1}</h4>
              <p className="text-sm text-gray-400 mb-2">May 30, 2025</p>
              <p className="text-sm text-gray-300">Black & White FC secures another win, making it 5 in a row in the championship battle.</p>
            </div>
          ))}
        </div>
      </section>  )
}

export default News