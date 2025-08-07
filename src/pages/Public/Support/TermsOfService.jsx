import React from "react";
import { FileText } from "lucide-react";

// Reusable Components (reuse or import if already defined)
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

// Terms of Service Component
const TermsOfService = () => {
  const sections = [
    "Acceptance of Terms",
    "Description of Service",
    "User Accounts and Registration",
    "User Conduct and Responsibilities",
    "Event Creation and Management",
    "Ticket Purchases and Refunds",
    "Privacy and Data Protection",
    "Intellectual Property Rights",
    "Limitation of Liability",
    "Termination of Service",
    "Governing Law",
    "Changes to Terms",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
            <FileText className="w-10 h-10 text-slate-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using TapKori services
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 2025
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-800 py-2 text-sm"
                >
                  <span className="font-medium">{index + 1}.</span>
                  <span>{section}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <Card>
          <CardContent className="prose max-w-none p-8">
            <div className="space-y-8">
              {sections.map((title, index) => (
                <section key={index} id={`section-${index + 1}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {index + 1}. {title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {/* Placeholder content; replace with real terms if needed */}
                    This section explains "{title}". Please read the actual
                    terms from the event platform for accurate information.
                  </p>
                </section>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 bg-slate-50 border-slate-200">
          <CardContent className="text-center p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms of Service, please
              contact our legal team.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
              Contact Legal Team
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
