import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  CreditCard,
  Globe,
  HeartHandshake,
  Smartphone,
  Star,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const features = [
    {
      icon: <Ticket className="w-6 h-6" />,
      title: "Easy Event Creation",
      description:
        "Create and set up tickets for any event in just a few clicks",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Secure Payments",
      description:
        "Fast and secure ticket purchasing experience for all attendees",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track sales and attendance with live data and insights",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Friendly Interface",
      description: "Intuitive design for both event organizers and attendees",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Responsive",
      description: "Perfect experience across all devices and screen sizes",
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Customer Support",
      description: "Fast and friendly support whenever you need assistance",
    },
  ];

  const benefits = [
    "No technical expertise required",
    "Instant event setup and publishing",
    "Automated ticket delivery",
    "Real-time notifications",
    "Secure payment processing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber to-slate-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <Calendar className="w-10 h-10 text-black-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-black-600">TapKori</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A modern event ticketing platform that makes it super easy to
            create, manage, and attend events — all in just a few taps.
          </p>
          {!isLoggedIn === "true" && (
            <div className="mt-8 flex justify-center">
              <button className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Link to="/login">Get Started Today</Link>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* What is TapKori */}
        <div className="bg-amber rounded-2xl  p-8 mb-12 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
              <Zap className="w-6 h-6 text-black-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              What is TapKori?
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            TapKori is a user-friendly ticketing solution where anyone can
            easily create events and sell tickets online. Whether it's a
            concert, workshop, seminar, or meetup — TapKori is built to handle
            it all with ease.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">
                Perfect for:
              </h3>
              <div className="space-y-2">
                {[
                  "Concerts & Music Events",
                  "Workshops & Training",
                  "Conferences & Seminars",
                  "Meetups & Networking",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg">
                Why Choose Us:
              </h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            ✨ Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-amber rounded-xl  hover: transition-all duration-300 p-6 border border-gray-100 hover:border-amber-200 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <div className="text-black-600">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-r border-gray-100 rounded-2xl  p-8 text-black mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-amber bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Our Vision</h2>
          </div>
          <p className="text-lg leading-relaxed text-black-100 mb-6">
            We believe in making event management simple and accessible for
            everyone in Bangladesh. TapKori is here to digitalize and
            democratize event hosting — no tech expertise required. Just tap,
            create, and connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-amber bg-opacity-10 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold mb-1">10,000+</div>
              <div className="text-black-100 text-sm">Events Created</div>
            </div>
            <div className="bg-amber bg-opacity-10 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold mb-1">50,000+</div>
              <div className="text-black-100 text-sm">Tickets Sold</div>
            </div>
            <div className="bg-amber bg-opacity-10 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold mb-1">1,000+</div>
              <div className="text-black-100 text-sm">Happy Organizers</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-amber rounded-2xl  p-8 mb-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Create Event
              </h3>
              <p className="text-gray-600 text-sm">
                Set up your event details and ticket types in minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Share & Sell
              </h3>
              <p className="text-gray-600 text-sm">
                Share your event link and start selling tickets instantly
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Manage & Track
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor sales and manage attendees with real-time data
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-amber rounded-2xl  p-8 text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Host Your Next Event?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of event organizers who trust TapKori to make their
            events successful. Start creating memorable experiences today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isLoggedIn === "true" && (
              <button className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Link to="/login">Get Started</Link>
              </button>
            )}

            <button className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Link to="/event">View Demo</Link>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-2">
            <span>Built with</span>
            <HeartHandshake className="w-5 h-5 text-red-500" />
            <span>
              for event creators and attendees in Fawjul,Omega Bangladesh
            </span>
            <span className="text-lg">🇧🇩</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 TapKori. Making events accessible for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
