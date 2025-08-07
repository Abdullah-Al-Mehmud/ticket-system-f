import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Loader2 } from 'lucide-react';

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-600 rounded-lg mb-6">
            <Mail className="w-6 h-6 text-white" />
          </div>

          {/* Heading */}
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified about the latest events and exclusive offers.
          </p>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Container */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Benefits */}
                <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
                  <span>✓ Weekly updates</span>
                  <span>✓ Early access</span>
                  <span>✓ No spam</span>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Successfully Subscribed!</h4>
                <p className="text-green-600">Welcome! Check your inbox for confirmation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}