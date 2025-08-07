import React from "react";
import { Clock, RefreshCw, AlertCircle } from "lucide-react";

// Reusable Components (same as used in your main file)
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div
    className={`px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50 ${className}`}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Refund Policy Component
const RefundPolicy = () => {
  const refundTypes = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Event Cancellation",
      description: "Full refund if event is cancelled by organizer",
      timeline: "Within 24 hours of cancellation",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Customer Request",
      description: "Refund based on event's refund policy",
      timeline: "Up to 48 hours before event",
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Technical Issues",
      description: "Full refund for payment processing errors",
      timeline: "Within 7 business days",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <RefreshCw className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding our refund process and your rights as a customer
          </p>
        </div>

        {/* Refund Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {refundTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="text-center p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-amber-600">
                  {type.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-3">{type.description}</p>
                <p className="text-sm text-amber-600 font-medium">
                  {type.timeline}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Refund Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  1. General Refund Terms
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Refund eligibility depends on the event organizer's specific
                  refund policy and the timing of your cancellation request.
                  Each event may have different refund terms, which are clearly
                  displayed on the event page before purchase.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  2. Event Cancellation by Organizer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  If an event is cancelled by the organizer, all ticket holders
                  are entitled to a full refund, including any service fees.
                  Refunds will be processed automatically within 5-7 business
                  days to the original payment method.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  3. Customer-Initiated Refunds
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Customer-requested refunds are subject to the event
                  organizer's refund policy. Most events allow refunds up to
                  24-48 hours before the event start time. Service fees may be
                  non-refundable depending on the event terms.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  4. Processing Time
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Approved refunds are processed within 3-5 business days. The
                  time for funds to appear in your account depends on your
                  payment provider and may take an additional 5-10 business days
                  for bank transfers.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  5. How to Request a Refund
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To request a refund, contact our support team at
                  support@tapkori.com with your order details. Include your
                  ticket confirmation number and reason for refund to expedite
                  the process.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Refunds */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="text-center p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need Help with a Refund?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you with any
              refund-related questions or requests.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
              Contact Support
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;
