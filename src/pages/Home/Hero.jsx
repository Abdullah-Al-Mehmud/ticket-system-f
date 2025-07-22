import { Search } from 'lucide-react'
import React from 'react'

export default function Hero() {
  return (
    <div>
         {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                Events Near You
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              From concerts to conferences, find and book tickets for the best
              events in your city
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-lg p-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events, artists, venues..."
                    className="w-full pl-10 pr-4 py-2 text-gray-900 rounded-lg focus:outline-none"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🎵 Music
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🎭 Theatre
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🏃 Sports
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🎨 Art</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🍕 Food
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
