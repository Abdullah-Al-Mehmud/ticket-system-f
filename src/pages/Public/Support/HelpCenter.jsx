import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  User,
  CreditCard,
  Calendar,
  RefreshCw,
} from "lucide-react";

// Reusable Components (you can move these into a shared file if needed)
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl border border-amber-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`px-6 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-amber-50/50 ${className}`}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-amber-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Help Center Component
const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create an event on TapKori?",
      answer:
        "Click on 'Create Event' from your dashboard, fill in your event details, set up ticket categories, and publish.",
    },
    {
      id: 2,
      question: "How do I purchase tickets for an event?",
      answer:
        "Browse events, select one, choose ticket category and quantity, then pay using available methods.",
    },
    {
      id: 3,
      question: "Can I get a refund for my ticket?",
      answer:
        "Refunds depend on the organizer's policy. Check the event page or contact the organizer.",
    },
    {
      id: 4,
      question: "How do I receive my tickets after purchase?",
      answer:
        "You'll receive an email with a QR code. You can also download tickets from your dashboard.",
    },
    {
      id: 5,
      question: "What payment methods are accepted?",
      answer:
        "We accept bKash, Nagad, Rocket, cards, and bank transfers depending on location and organizer.",
    },
  ];

  const categories = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Account & Profile",
      count: 8,
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Payments & Billing",
      count: 12,
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Events & Tickets",
      count: 15,
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Refunds & Returns",
      count: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Help Center</h1>
          <p className="text-xl text-amber-600 max-w-2xl mx-auto">
            Find answers to your questions and get the support you need
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card
              key={index}
              className=" transition-shadow cursor-pointer"
            >
              <CardContent className="text-center p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-amber-600">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-amber-600">
                  {category.count} articles
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs
                .filter((faq) =>
                  faq.question.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-amber-200 rounded-lg"
                  >
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-amber-50 transition-colors"
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                    >
                      <span className="font-medium text-amber-900">
                        {faq.question}
                      </span>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-amber-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-amber-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 text-amber-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
