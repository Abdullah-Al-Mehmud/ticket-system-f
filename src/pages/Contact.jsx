import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      details: 'support@eventplatform.com',
      subDetails: 'We reply within 24 hours',
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      details: '+880 1234-567890',
      subDetails: 'Mon-Fri, 9AM-6PM',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      details: '123 Event Street, Dhaka',
      subDetails: 'Bangladesh 1000',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      details: 'Monday - Friday',
      subDetails: '9:00 AM - 6:00 PM',
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Contact 
              <span className="text-amber-600"> Us</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            {/* Contact Info Cards */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className={`${info.color} p-2 rounded`}>
                    <info.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{info.details}</p>
                    <p className="text-xs text-gray-500">{info.subDetails}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Send Message</h2>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-sm text-green-700">Message sent successfully!</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Input
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
