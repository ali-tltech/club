import React from 'react'

function Gallery() {
  return (
<section className="py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-black text-white">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wider">
    Club Gallery
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {[
      "https://images.unsplash.com/photo-1609766856579-c8f1c237c245",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
      "https://images.unsplash.com/photo-1599669454699-9e5df847a5e5",
      "https://images.unsplash.com/photo-1611003228941-40e7c441bba3",
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a",
      "https://images.unsplash.com/photo-1608889175124-44c7e3a6c81c",
    ].map((url, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-xl group shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        <img
          src={url}
          alt={`Gallery ${i + 1}`}
          className="w-full h-64 object-cover transform duration-500 ease-in-out group-hover:scale-110 group-hover:blur-sm"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
          <p className="text-lg font-semibold tracking-wide">View Moment</p>
        </div>
      </div>
    ))}
  </div>
</section>  )
}

export default Gallery