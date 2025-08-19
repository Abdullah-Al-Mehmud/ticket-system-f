import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I create an event on your platform?",
    answer: "Creating an event is simple! Just sign up for an organizer account, click 'Create Event', fill in your event details including date, venue, ticket prices, and description. Once submitted, our team will review and approve your event within 24 hours.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit/debit cards (Visa, MasterCard, American Express), digital wallets (bKash, Nagad, Rocket), bank transfers, and mobile banking. All transactions are secured with 256-bit SSL encryption.",
  },
  {
    id: 3,
    question: "Can I get a refund if I can't attend an event?",
    answer: "Refund policies vary by event organizer. Most events offer full refunds up to 48 hours before the event, partial refunds up to 24 hours before, and no refunds after that. Check the specific refund policy on each event page before purchasing.",
  },
  {
    id: 4,
    question: "How do I receive my tickets after purchase?",
    answer: "After successful payment, you'll receive an email confirmation with your digital tickets attached as PDF. You can also access your tickets anytime through your account dashboard. Show the QR code on your phone or print the ticket for entry.",
  },
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
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-80 h-80 md:w-96 md:h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 md:w-96 md:h-96 bg-orange-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Support Center
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl sm:max-w-2xl mx-auto">
            Find quick answers to common questions about our event platform
          </p>
        </div>

        {/* Content: Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-8 md:gap-10 lg:gap-12">
          {/* Left Side - FAQ Icon (Stays sticky only on desktop) */}
          <div className="flex-shrink-0 w-full lg:w-80 xl:w-96 mx-auto lg:mx-0">
            <div className="relative flex justify-center lg:block">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center relative">
                {/* Back Bubble */}
                <div className="absolute top-14 sm:top-16 md:top-20 left-6 sm:left-8 md:left-10 w-28 sm:w-32 md:w-40 h-32 sm:h-36 md:h-48 bg-slate-700 rounded-3xl  transform rotate-12 flex flex-col items-center justify-center">
                  <div className="text-amber-300 font-bold text-xl sm:text-2xl leading-tight tracking-wider">
                    <div>F</div>
                    <div>A</div>
                    <div>Q</div>
                  </div>
                  <div className="absolute -bottom-2 sm:-bottom-3 -left-3 w-0 h-0 border-l-8 sm:border-l-10 border-r-8 sm:border-r-10 border-t-8 sm:border-t-10 border-l-transparent border-r-transparent border-t-slate-700 transform rotate-45"></div>
                </div>

                {/* Front Bubble */}
                <div className="relative z-10 w-28 sm:w-32 md:w-44 h-28 sm:h-32 md:h-44 bg-amber-600 rounded-3xl  flex items-center justify-center transform -rotate-6">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white">?</span>
                  <div className="absolute -bottom-3 sm:-bottom-4 left-6 sm:left-8 w-0 h-0 border-l-6 sm:border-l-8 border-r-6 sm:border-r-8 border-t-8 sm:border-t-10 border-l-transparent border-r-transparent border-t-amber-600"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 sm:top-12 md:top-12 right-12 sm:right-14 md:right-16 w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
                <div
                  className="absolute bottom-12 sm:bottom-14 md:bottom-16 left-12 sm:left-14 md:left-20 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 bg-amber-500 rounded-full opacity-40 animate-bounce"
                  style={{ animationDuration: "3s" }}
                ></div>
                <div className="absolute top-20 sm:top-24 md:top-32 right-8 sm:right-10 md:right-12 w-3 sm:w-4 md:w-4 h-3 sm:h-4 md:h-4 bg-amber-300 rounded-full opacity-50"></div>

                {/* Connecting lines */}
                <div className="absolute top-24 sm:top-28 md:top-40 left-20 sm:left-24 md:left-32 w-8 sm:w-10 md:w-16 h-0.5 bg-amber-300 rounded-full opacity-30 transform rotate-45"></div>
                <div className="absolute top-26 sm:top-30 md:top-44 left-24 sm:left-28 md:left-36 w-6 sm:w-8 md:w-12 h-0.5 bg-amber-300 rounded-full opacity-20 transform rotate-45"></div>
                <div className="absolute top-28 sm:top-32 md:top-48 left-28 sm:left-32 md:left-40 w-3 sm:w-4 md:w-6 h-0.5 bg-amber-300 rounded-full opacity-10 transform rotate-45"></div>
              </div>
              <div className="absolute -z-10 top-4 sm:top-6 md:top-6 left-4 sm:left-6 md:left-6 w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 bg-gray-200/30 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Right Side - FAQ Items */}
          <div className="flex-1 max-w-xl sm:max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq) => {
                const isOpen = openItems.has(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-lg  border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 pr-4 flex-1 text-left">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-2">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-amber-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6">
                        <div className="h-px w-full bg-gradient-to-r from-amber-200 to-orange-200 mb-3 sm:mb-4"></div>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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