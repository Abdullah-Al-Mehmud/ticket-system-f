import React from "react";
import { User, MapPin, Clock, Briefcase } from "lucide-react";

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
  <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const JobCard = ({ job }) => (
  <Card>
    <CardHeader>
      <CardTitle>{job.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Careers = () => {
  const jobOpenings = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-Time",
      description:
        "We're looking for a React developer to help us build delightful UIs for our users.",
    },
    {
      title: "Customer Support Specialist",
      location: "Dhaka, Bangladesh",
      type: "Part-Time",
      description:
        "Help users get the most out of TapKori by responding to questions and resolving issues.",
    },
    {
      title: "Marketing Executive",
      location: "Remote or Dhaka",
      type: "Contract",
      description:
        "Plan and execute digital marketing campaigns to grow event reach.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
            <User className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Careers at TapKori
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our mission to reshape the event experience. We're always on
            the lookout for passionate talent.
          </p>
        </header>

        {/* Job Openings Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Open Positions
            </h2>
          </div>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <JobCard key={`${job.title}-${index}`} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
