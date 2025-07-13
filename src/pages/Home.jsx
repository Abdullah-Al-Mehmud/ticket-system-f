import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Menu,
  X,
  Clock,
  Shield,
  Award,
  Zap,
  Search,
} from "lucide-react";
import TrustedOrgsCarousel from "../components/SimpleAutoCarousel";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Summer Music Festival 2025",
      date: "Aug 15, 2025",
      time: "6:00 PM",
      location: "Central Park Arena",
      price: "$45",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
      category: "Music",
      attendees: 1200,
    },
    {
      id: 2,
      title: "Tech Innovation Conference",
      date: "Sep 22, 2025",
      time: "9:00 AM",
      location: "Convention Center",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      category: "Technology",
      attendees: 800,
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "Oct 8, 2025",
      time: "12:00 PM",
      location: "Downtown Plaza",
      price: "$35",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      category: "Food",
      attendees: 600,
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      date: "Nov 12, 2025",
      time: "7:00 PM",
      location: "Modern Art Museum",
      price: "$25",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      category: "Art",
      attendees: 300,
    },
  ];

  // Trusted organizations data
  const trustedOrgs = [
    {
      name: "Eventbrite",
      logo: "https://via.placeholder.com/120x60/6366f1/ffffff?text=Eventbrite",
    },
    {
      name: "Ticketmaster",
      logo: "https://via.placeholder.com/120x60/ef4444/ffffff?text=Ticketmaster",
    },
    {
      name: "StubHub",
      logo: "https://via.placeholder.com/120x60/10b981/ffffff?text=StubHub",
    },
    {
      name: "Vivid Seats",
      logo: "https://via.placeholder.com/120x60/f59e0b/ffffff?text=Vivid+Seats",
    },
    {
      name: "SeatGeek",
      logo: "https://via.placeholder.com/120x60/8b5cf6/ffffff?text=SeatGeek",
    },
    {
      name: "Bandsintown",
      logo: "https://via.placeholder.com/120x60/06b6d4/ffffff?text=Bandsintown",
    },
  ];

  // Features data
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Instant Booking",
      description:
        "Book tickets in seconds with our lightning-fast checkout process",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level security",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: "Premium Events",
      description: "Access to exclusive events and VIP experiences",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Community",
      description: "Connect with fellow event-goers and share experiences",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  Tap<span className="text-blue-600">Kori</span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                Events
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                Categories
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                Venues
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.293a1 1 0 001.415 1.414L9 14h6l1.293 2.293a1 1 0 001.415-1.414L17 13M9 21h6m-6 0a1 1 0 01-1-1v-1h8v1a1 1 0 01-1 1m-6 0h6"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>

              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700">
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-900 font-medium">
                Events
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                Categories
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                Venues
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                About
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-shopping-bag-icon lucide-shopping-bag">
                  <path d="M16 10a4 4 0 0 1-8 0" />
                  <path d="M3.103 6.034h17.794" />
                  <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                </svg>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

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

      {/* Features Section */}
      

      {/* All Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Trending Events
              </h3>
              <p className="text-xl text-gray-600">
                Don't miss out on these popular events
              </p>
            </div>
            <button className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
              View All Events
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {event.price}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="md:hidden bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Trusted Organizations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-xl text-gray-600">
              Join thousands of event organizers who trust our platform
            </p>
          </div>

          <div className=" items-center">
            {/* {trustedOrgs.map((org, index) => (
              <div key={index} className="text-center group">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="mx-auto h-12 w-auto grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                />
              </div>
            ))} */}

            <TrustedOrgsCarousel />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Tickets Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Never Miss an Event</h3>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to get notified about the hottest events in your area
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 text-white  rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Tapkori</h4>
              <p className="text-gray-400 mb-4">
                Your premier destination for discovering and booking amazing
                events.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Events</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Music
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Theatre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Food & Drink
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TapKori. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
