import React from 'react'

function Matches() {
  return (
  <section className="px-6 py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-wide">Upcoming Matches</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { team: 'City United', date: 'June 12, 2025', location: 'Black & White Arena' },
            { team: 'Shadow Eagles', date: 'June 18, 2025', location: 'Away - Eagle Nest' },
          ].map((match, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur hover:bg-white/10 transition">
              <div>
                <h4 className="text-xl font-semibold">vs {match.team}</h4>
                <p className="text-sm text-gray-400">{match.date} · {match.location}</p>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition">Tickets</button>
            </div>
          ))}
        </div>
      </section>  )
}

export default Matches