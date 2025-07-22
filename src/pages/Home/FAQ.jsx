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
  },
  {
    id: 5,
    question: "Do you charge any booking fees?",
    answer: "We charge a small service fee of 2-5% on ticket prices to cover payment processing and platform maintenance. This fee is clearly displayed before you complete your purchase. Event organizers set their own ticket prices separately."
  },
  {
    id: 6,
    question: "Can I transfer my ticket to someone else?",
    answer: "Yes! Most events allow ticket transfers. Go to your account dashboard, select the event, and use the 'Transfer Ticket' option. Enter the recipient's email address, and they'll receive the transferred ticket. Some premium events may have restrictions."
  },
  {
    id: 7,
    question: "What happens if an event is cancelled?",
    answer: "If an event is cancelled by the organizer, you'll receive a full automatic refund within 5-7 business days. We'll notify you immediately via email and SMS. For postponed events, your ticket remains valid for the new date, or you can request a refund."
  },
  {
    id: 8,
    question: "How can I contact customer support?",
    answer: "Our support team is available 24/7 through multiple channels: live chat on our website, email at support@eventplatform.com, or phone at +880-1234-567890. We typically respond to emails within 2 hours and live chats instantly."
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq) => {
            const isOpen = openItems.has(faq.id);
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-8">
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
                  <div className="px-8 pb-6">
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
    </section>
  );
}