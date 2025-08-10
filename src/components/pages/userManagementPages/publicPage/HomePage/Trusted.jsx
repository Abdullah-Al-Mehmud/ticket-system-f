import React from "react";

// Categories data
const categories = [
  {
    name: "Fashion Shows",
    icon: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
  },
  {
    name: "Conferences",
    icon: "https://plus.unsplash.com/premium_photo-1679547203090-6313a91d4478?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Seminars",
    icon: "https://plus.unsplash.com/premium_photo-1679547202440-356042e564a3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Reunions",
    icon: "https://images.unsplash.com/photo-1745487383545-f937fc876836?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Exhibitions",
    icon: "https://plus.unsplash.com/premium_photo-1706445408078-7d629e7a3edf?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Launching",
    icon: "https://images.unsplash.com/photo-1710371281650-6164e4133ae7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Stand-up",
    icon: "https://plus.unsplash.com/premium_photo-1705883063972-4b90b784a086?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Drama",
    icon: "https://images.unsplash.com/photo-1630050525402-06c617847d27?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Party",
    icon: "https://plus.unsplash.com/premium_photo-1683121126477-17ef068309bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pop Culture",
    icon: "https://images.unsplash.com/photo-1577640905050-83665af216b9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function TrustedOrgsCarousel() {
  return (
    <div className="w-full relative">
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="overflow-hidden py-6">
        <div
          className="flex animate-scroll hover:pause"
          style={{
            animation: "scroll 25s linear infinite",
            width: "calc(200px * 20)", // Accommodates duplicated items
          }}
        >
          {categories.concat(categories).map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex-shrink-0 w-48 mx-4 group cursor-pointer"
            >
              <div className="flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-amber-200">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-16 w-16 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-sm font-semibold text-gray-800 text-center group-hover:text-amber-600 transition-colors duration-300">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 10));
    }
  }
  
  .hover\\:pause:hover {
    animation-play-state: paused;
  }
`}</style>
    </div>
  );
}

export default function Trusted() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
            Trusted Partners
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by Industry
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              {" "}
              Leaders
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of event organizers who trust our platform to deliver
            exceptional experiences
          </p>
        </div>

        <div className="relative">
          <TrustedOrgsCarousel />
        </div>
      </div>

      <style>{`
  .bg-grid-pattern {
    background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
    background-size: 20px 20px;
  }
`}</style>
    </section>
  );
}
