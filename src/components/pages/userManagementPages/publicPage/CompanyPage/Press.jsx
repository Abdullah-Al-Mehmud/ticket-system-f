import React from "react";
import { FileText, Calendar, Building2, ExternalLink } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 duration-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-100">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors duration-200">
    {children}
  </h3>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const PressCard = ({ article }) => (
  <Card className="cursor-pointer group">
    <CardHeader>
      <div className="flex items-start justify-between">
        <CardTitle>{article.title}</CardTitle>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors duration-200 flex-shrink-0 ml-2" />
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4 leading-relaxed">{article.summary}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Building2 className="w-4 h-4" />
          <span>{article.source}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{article.date}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Press = () => {
  const pressArticles = [
    {
      title: "TapKori Raises Series A Funding",
      source: "TechCrunch BD",
      date: "March 15, 2025",
      summary:
        "TapKori has secured $5M in Series A to expand its ticketing platform across South Asia.",
    },
    {
      title: "EventTech 2025: Spotlight on TapKori",
      source: "Event Insider",
      date: "June 10, 2025",
      summary:
        "TapKori is making waves in the event industry with their intuitive tools and fast growth.",
    },
    {
      title: "How TapKori Helped 1000+ Organizers in 2024",
      source: "Dhaka Tribune",
      date: "January 5, 2025",
      summary:
        "With over 1000 successful events, TapKori continues to be the go-to platform for organizers.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <FileText className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Press & Media
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Read what the media is saying about TapKori's impact on the event
            industry
          </p>
        </header>

        {/* Press Coverage Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Recent Coverage
            </h2>
          </div>
          <div className="space-y-6">
            {pressArticles.map((article, index) => (
              <PressCard key={`${article.source}-${index}`} article={article} />
            ))}
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-amber-50 to-purple-50 border-amber-200">
            <CardContent className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Media Inquiries
              </h3>
              <p className="text-gray-600 mb-4">
                For press inquiries, interviews, or additional information about
                TapKori
              </p>
              <div className="text-sm text-gray-700">
                <p>
                  Email:{" "}
                  <span className="font-medium text-amber-600">
                    press@tapkori.com
                  </span>
                </p>
                <p>
                  Phone:{" "}
                  <span className="font-medium text-amber-600">
                    +880 1XXX-XXXXXX
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Press;
