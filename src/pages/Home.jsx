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
import TrendingEvent from "../components/TrendingEvent";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample events data

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

      <TrendingEvent />

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
    </div>
  );
};

export default Home;
