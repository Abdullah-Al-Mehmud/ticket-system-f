import React from "react";
import { Shield, User, Database, Share2, Lock, Mail } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl  border border-amber-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-amber-100">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-amber-900">{children}</h3>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const PolicySection = ({ icon: Icon, title, children }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Icon className="w-5 h-5 text-amber-600" />
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="prose prose-amber max-w-none">{children}</div>
    </CardContent>
  </Card>
);

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: User,
      title: "Information We Collect",
      content: (
        <div>
          <p className="text-amber-700 leading-relaxed mb-3">
            We collect information you provide during registration, ticket
            purchases, and event creation, including:
          </p>
          <ul className="text-amber-600 space-y-1 ml-4">
            <li>• Personal details (name, email, phone number)</li>
            <li>• Payment information for secure transactions</li>
            <li>• Event preferences and activity history</li>
            <li>• Device and usage analytics to improve our service</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Database,
      title: "How We Use Information",
      content: (
        <div>
          <p className="text-amber-700 leading-relaxed mb-3">
            We use your data responsibly to enhance your TapKori experience:
          </p>
          <ul className="text-amber-600 space-y-1 ml-4">
            <li>• Process payments and deliver digital tickets</li>
            <li>• Improve platform features and user experience</li>
            <li>• Send relevant updates about your events and bookings</li>
            <li>• Provide customer support when needed</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Share2,
      title: "Data Sharing",
      content: (
        <div>
          <p className="text-amber-700 leading-relaxed mb-3">
            <strong className="text-amber-900">
              We never sell your personal data.
            </strong>{" "}
            We may share information only when necessary:
          </p>
          <ul className="text-amber-600 space-y-1 ml-4">
            <li>• With event organizers for ticket verification</li>
            <li>• With trusted payment processors for transactions</li>
            <li>• When legally required by authorities</li>
            <li>• With your explicit consent</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Lock,
      title: "Data Security",
      content: (
        <div>
          <p className="text-amber-700 leading-relaxed mb-3">
            Your privacy and security are our top priorities:
          </p>
          <ul className="text-amber-600 space-y-1 ml-4">
            <li>• Industry-standard encryption protects all data</li>
            <li>• Regular security audits and vulnerability assessments</li>
            <li>• Secure servers with restricted access protocols</li>
            <li>• Data retention policies to minimize exposure</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Mail,
      title: "Your Rights & Contact",
      content: (
        <div>
          <p className="text-amber-700 leading-relaxed mb-3">
            You have full control over your personal data and can:
          </p>
          <ul className="text-amber-600 space-y-1 ml-4 mb-4">
            <li>• Access, update, or delete your information</li>
            <li>• Opt out of marketing communications</li>
            <li>• Request data portability or account closure</li>
          </ul>
          <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-400">
            <p className="text-amber-700 mb-2">
              <strong>Have privacy concerns?</strong> We're here to help.
            </p>
            <div className="text-sm space-y-1">
              <p>
                Email:{" "}
                <span className="font-semibold text-slate-700">
                  privacy@tapkori.com
                </span>
              </p>
              <p>Response time: Within 48 hours</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <Shield className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-amber-600 max-w-2xl mx-auto leading-relaxed">
            Learn how TapKori collects, uses, and protects your personal data
            with complete transparency.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-amber-500 bg-amber-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Last updated: August 2025
          </div>
        </header>

        {/* Policy Sections */}
        <main className="space-y-0">
          {sections.map((section, index) => (
            <PolicySection
              key={index}
              icon={section.icon}
              title={section.title}
            >
              {section.content}
            </PolicySection>
          ))}
        </main>

        {/* Footer Note */}
        <footer className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Transparency Promise:</strong> We believe in clear, honest
              communication about your data. This policy is written in plain
              language - no legal jargon.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
