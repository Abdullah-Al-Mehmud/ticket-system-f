import { Search, MapPin, Calendar, Sparkles, ChevronLeft, ChevronRight, Clock, Users, Star } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured events data
  const featuredEvents = [
    {
      id: 1,
      title: "Summer Music Festival 2025",
      subtitle: "3-Day Epic Experience",
      date: "Aug 15-17, 2025",
      location: "Central Park, NYC",
      price: "From ৳89",
      attendees: "50K+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop&crop=center",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      subtitle: "Future of Technology",
      date: "Sep 5-6, 2025",
      location: "Convention Center, SF",
      price: "From ৳249",
      attendees: "10K+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 3,
      title: "Broadway Musical Gala",
      subtitle: "An Evening of Excellence",
      date: "Aug 20-25, 2025",
      location: "Theater District, NYC",
      price: "From ৳125",
      attendees: "5K+",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=400&fit=crop&crop=center",
      gradient: "from-red-600 to-orange-600"
    }
  ];

  // Auto-slide functionality - smooth continuous forward movement
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 4000); // Slightly faster for better flow
    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div>
      {/* Hero Section - Light Theme with Artwork */}
      <section className="relative bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 overflow-hidden">
        {/* Background Artwork */}
        <div className="absolute inset-0">
          {/* Geometric shapes */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>
          
          {/* Abstract patterns */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,100 600,150 T1200,120 L1200,0 L0,0 Z" fill="url(#grad1)" />
            <path d="M0,600 Q400,500 800,550 T1200,520 L1200,800 L0,800 Z" fill="url(#grad1)" />
          </svg>

          {/* Floating elements */}
          <div className="absolute top-32 right-20 animate-pulse">
            <div className="w-4 h-4 bg-amber-400 rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-60 left-40 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-6 h-6 bg-purple-400 rounded-full opacity-40"></div>
          </div>
          <div className="absolute bottom-40 right-40 animate-pulse" style={{ animationDuration: '2s' }}>
            <div className="w-5 h-5 bg-pink-400 rounded-full opacity-50"></div>
          </div>

          {/* Music notes and event icons */}
          <div className="absolute top-24 left-1/4 text-amber-300 opacity-30 animate-float">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div className="absolute bottom-32 right-1/4 text-purple-300 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V8h14v12z"/>
            </svg>
          </div>
          <div className="absolute top-1/2 left-20 text-pink-300 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center">
          
            {/* Featured Event Slider */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="relative group">
                {/* Slider Container */}
                <div className="relative bg-white/90 backdrop-blur-lg rounded-lg shadow overflow-hidden border border-white/50">
                  <div className="relative h-80 lg:h-96">
                    {featuredEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                          index === currentSlide ? 'opacity-100 translate-x-0' : 
                          index === (currentSlide - 1 + featuredEvents.length) % featuredEvents.length ? 'opacity-0 -translate-x-full' :
                          'opacity-0 translate-x-full'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row h-full">
                          {/* Event Image */}
                          <div className="lg:w-2/3 relative overflow-hidden">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-20`}></div>
                          </div>
                          
                          {/* Event Details */}
                          <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                              <Star className="w-5 h-5 text-amber-500 fill-current" />
                              <span className="text-slate-600 font-medium">{event.rating} • Featured Event</span>
                            </div>
                            
                            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                              {event.title}
                            </h3>
                            <p className="text-lg text-slate-600 mb-6">{event.subtitle}</p>
                            
                            <div className="space-y-3 mb-6">
                              <div className="flex items-center gap-3 text-slate-700">
                                <Calendar className="w-5 h-5 text-amber-600" />
                                <span className="font-medium">{event.date}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700">
                                <MapPin className="w-5 h-5 text-amber-600" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700">
                                <Users className="w-5 h-5 text-amber-600" />
                                <span>{event.attendees} attendees expected</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows - Only for manual control */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-slate-700 p-2 rounded-full shadow-md transition-all duration-300 backdrop-blur-sm border border-white/50 opacity-0 hover:opacity-100 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-slate-700 p-2 rounded-full shadow-md transition-all duration-300 backdrop-blur-sm border border-white/50 opacity-0 hover:opacity-100 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {featuredEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentSlide
                            ? 'bg-amber-600 scale-125'
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-white/50">
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search events, artists, venues..."
                      className="w-full pl-12 pr-4 py-4 text-slate-900 text-lg bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Location or venue"
                      className="w-full pl-12 pr-4 py-4 text-slate-900 text-lg bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 text-slate-900 text-lg bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Search Events
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { emoji: "🎵", text: "Music", color: "from-purple-500 to-pink-500" },
                { emoji: "🎭", text: "Theater", color: "from-red-500 to-orange-500" },
                { emoji: "🏈", text: "Sports", color: "from-green-500 to-blue-500" },
                { emoji: "🎨", text: "Art", color: "from-indigo-500 to-purple-500" },
                { emoji: "💼", text: "Business", color: "from-gray-600 to-gray-700" },
                { emoji: "🍷", text: "Food & Drink", color: "from-amber-500 to-orange-500" }
              ].map((category, index) => (
                <button
                  key={index}
                  className="group bg-white/70 hover:bg-white backdrop-blur-sm border border-slate-200 hover:border-slate-300 px-4 py-3 rounded-full transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <span className="text-lg mr-2">{category.emoji}</span>
                  <span className="text-slate-700 font-medium group-hover:text-slate-900">
                    {category.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live events updating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>4.9★ average rating</span>
              </div>
              <div>500+ cities worldwide</div>
            </div>
          </div>
        </div>

        {/* Custom animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </section>
    </div>
  )
}