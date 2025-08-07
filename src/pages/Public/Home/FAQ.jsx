import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I create an event on your platform?",
    answer: "Creating an event is simple! Just sign up for an organizer account, click 'Create Event', fill in your event details including date, venue, ticket prices, and description. Once submitted, our team will review and approve your event within 24 hours."
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit/debit cards (Visa, MasterCard, American Express), digital wallets (bKash, Nagad, Rocket), bank transfers, and mobile banking. All transactions are secured with 256-bit SSL encryption."
  },
  {
    id: 3,
    question: "Can I get a refund if I can't attend an event?",
    answer: "Refund policies vary by event organizer. Most events offer full refunds up to 48 hours before the event, partial refunds up to 24 hours before, and no refunds after that. Check the specific refund policy on each event page before purchasing."
  },
  {
    id: 4,
    question: "How do I receive my tickets after purchase?",
    answer: "After successful payment, you'll receive an email confirmation with your digital tickets attached as PDF. You can also access your tickets anytime through your account dashboard. Show the QR code on your phone or print the ticket for entry."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Support Center
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"> Questions</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our event platform
          </p>
        </div>

        {/* Main Content */}
        <div className="flex justify-center items-start gap-12">
          {/* Left Side - Image/Icon */}
          <div className="flex-shrink-0 sticky top-8">
            <div className="relative">
              {/* Custom FAQ Chat Bubbles Icon */}
              <div className="w-96 h-96 flex items-center justify-center relative">
                {/* Back Bubble - Dark Gray with FAQ text */}
                <div className="absolute top-20 left-10 w-40 h-48 bg-slate-700 rounded-3xl shadow-lg transform rotate-12 flex flex-col items-center justify-center">
                  <div className="text-amber-300 font-bold text-2xl leading-tight tracking-wider">
                    <div>F</div>
                    <div>A</div>
                    <div>Q</div>
                  </div>
                  {/* Small tail for chat bubble */}
                  <div className="absolute -bottom-3 -left-4 w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-slate-700 transform rotate-45"></div>
                </div>

                {/* Front Bubble - Amber with Question Mark */}
                <div className="relative z-10 w-44 h-44 bg-amber-600 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-6">
                  <span className="text-7xl font-black text-white">?</span>
                  {/* Chat bubble tail */}
                  <div className="absolute -bottom-4 left-8 w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-amber-600"></div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute top-12 right-16 w-8 h-8 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-16 left-20 w-6 h-6 bg-amber-500 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute top-32 right-12 w-4 h-4 bg-amber-300 rounded-full opacity-50"></div>
                
                {/* Subtle connecting line suggesting conversation */}
                <div className="absolute top-40 left-32 w-16 h-0.5 bg-amber-300 rounded-full opacity-30 transform rotate-45"></div>
                <div className="absolute top-44 left-36 w-12 h-0.5 bg-amber-300 rounded-full opacity-20 transform rotate-45"></div>
                <div className="absolute top-48 left-40 w-6 h-0.5 bg-amber-300 rounded-full opacity-10 transform rotate-45"></div>
              </div>
              
              {/* Subtle background shadow */}
              <div className="absolute -z-10 top-6 left-6 w-72 h-72 bg-gray-200/30 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Right Side - FAQ Items */}
          <div className="flex-1 max-w-2xl">
            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openItems.has(faq.id);
                return (
                  <div 
                    key={faq.id} 
                    className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-slate-900 pr-6">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-amber-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-5">
                        <div className="h-px bg-gradient-to-r from-amber-200 to-orange-200 mb-4"></div>
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}