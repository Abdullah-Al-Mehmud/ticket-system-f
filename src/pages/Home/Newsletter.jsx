import React, { useState } from 'react';
import { Mail, Bell, Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Artwork */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-br from-orange-600/20 to-amber-600/20 rounded-full opacity-50 blur-3xl"></div>
        
        {/* Abstract patterns */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#d97706', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,150 Q300,50 600,100 T1200,80 L1200,0 L0,0 Z" fill="url(#grad2)" />
          <path d="M0,450 Q400,350 800,400 T1200,380 L1200,600 L0,600 Z" fill="url(#grad2)" />
        </svg>

        {/* Floating elements */}
        <div className="absolute top-32 right-20 animate-pulse">
          <div className="w-4 h-4 bg-amber-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-60 left-40 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="w-6 h-6 bg-amber-500 rounded-full opacity-50"></div>
        </div>
        <div className="absolute bottom-40 right-40 animate-pulse" style={{ animationDuration: '2s' }}>
          <div className="w-5 h-5 bg-orange-400 rounded-full opacity-60"></div>
        </div>

        {/* Notification and event icons */}
        <div className={`absolute top-24 left-1/4 text-amber-400 opacity-30 ${styles.animateFloat}`}>
          <Bell className="w-6 h-6" />
        </div>
        <div className={`absolute bottom-32 right-1/4 text-amber-400 opacity-30 ${styles.animateFloat}`} style={{ animationDelay: '1s' }}>
          <Mail className="w-5 h-5" />
        </div>
        <div className={`absolute top-1/2 left-20 text-amber-400 opacity-30 ${styles.animateFloat}`} style={{ animationDelay: '2s' }}>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Content Container with Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
            Never Miss an Event
          </h3>
          
          {/* Subtitle */}
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to get notified about the hottest events in your area. Be the first to know about exclusive shows, festivals, and experiences.
          </p>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Container */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-lg">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 relative">
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-12 pr-4 py-4 text-white placeholder-slate-400 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
                        required
                        aria-describedby="email-help"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 min-w-fit"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 border border-red-400/30 text-center">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                {/* Benefits */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-400" id="email-help">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>Weekly event digest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>Early bird discounts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span>VIP event access</span>
                  </div>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className={`bg-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30 ${styles.fadeIn}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Successfully Subscribed!</h4>
                <p className="text-green-200">Welcome to the community! Check your inbox for a confirmation email.</p>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>50K+ subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>No spam, unsubscribe anytime</span>
            </div>
            <div>Trusted by event lovers worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}