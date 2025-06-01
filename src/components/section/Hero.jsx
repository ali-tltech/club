import React, { useState } from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import FormReg from '../ui/FormReg' // Adjust path based on your file structure

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1662909784/image_1662909784.jpg?io=getty-c-w1536')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 space-y-6">
        <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
          Black & White FC
        </h2>
        <p className="text-lg md:text-xl text-gray-200">Legacy. Passion. Victory.</p>

        <div className="flex space-x-6 text-gray-200 text-2xl">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-t from-black via-gray-900 to-black text-white px-6 py-3 rounded-full text-lg font-semibold transition"
        >
          Become a Member
        </button>
      </div>

      {isModalOpen && <FormReg onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}

export default Hero
