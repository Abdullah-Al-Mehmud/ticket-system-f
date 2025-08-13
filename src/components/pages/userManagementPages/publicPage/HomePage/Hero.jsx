import {
  Search,
  MapPin,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Star,
  Filter,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useGetEventsQuery } from "../../../../../store/features/event/EventApiSlice";
import HeroSkeleton from "../../../../../components/common/loaderComponent/HeroSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading, isError } = useGetEventsQuery({
    page: 1,
    count: 10,
    featured: 1,
  });

  const [searchTerms, setSearchTerm] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    navigate("/event", {
      state: {
        searchTerms,
        date,
      },
    });
  };
  const featuredEvents = data?.data?.filter(
    (event) => event.is_featured === 1 || event.is_featured === "1"
  ) ?? [];

  useEffect(() => {
    if (featuredEvents.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-gray-50 to-gray-50 overflow-hidden">
      {/* Simplified Background Artwork - Mobile Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-20 right-5 sm:top-40 sm:right-32 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl sm:blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 sm:bottom-20 sm:left-1/3 w-28 h-28 sm:w-56 sm:h-56 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {isLoading && (
          <HeroSkeleton />
        )}

        {isError && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium mb-2">Failed to load events</div>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        )}
        {/* Featured Events Carousel */}
        {featuredEvents.length > 0 && (
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="relative group">
              <div className="relative bg-white/90 backdrop-blur-lg rounded sm:rounded-2xl  overflow-hidden border border-white/50">
                <div className="relative h-64 sm:h-80 lg:h-96">
                  {featuredEvents.map((event, index) => (
                    <Link
                      to={`/event-details/${event.id}`}
                      key={event.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : index ===
                          (currentSlide - 1 + featuredEvents.length) %
                          featuredEvents.length
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                        }`}
                    >
                      {/* Mobile Layout */}
                      <div className="block lg:hidden h-full">
                        <div className="relative h-2/3">
                          {event.image_url ? (
                            <>
                              <img
                                src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                                alt={event.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.parentNode.querySelector(".fallback-img").style.display = "flex";
                                }}
                              />
                              <div className="fallback-img hidden absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center">
                                <span className="text-2xl sm:text-3xl font-bold text-white">TapKori</span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <span className="text-2xl sm:text-3xl font-bold text-white">TapKori</span>
                            </div>
                          )}

                          {/* Mobile Featured Badge */}
                          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </div>
                        </div>

                        <div className="h-1/3 p-4 bg-white">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-amber-600" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-amber-600" />
                              <span className="truncate max-w-24">{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:flex h-full">
                        <div className="w-2/3 relative overflow-hidden">
                          {event.image_url ? (
                            <>
                              <img
                                src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.parentNode.querySelector(".fallback-img").style.display = "flex";
                                }}
                              />
                              <div className="fallback-img hidden absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center">
                                <span className="text-6xl font-bold text-white">TapKori</span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <span className="text-6xl font-bold text-white">TapKori</span>
                            </div>
                          )}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${event.gradient ?? "from-purple-600/20 to-pink-600/20"
                              }`}
                          ></div>
                        </div>

                        <div className="w-1/3 p-8 lg:p-12 flex flex-col justify-center bg-white">
                          <div className="flex items-center gap-2 mb-4">
                            <Star className="w-5 h-5 text-amber-500 fill-current" />
                            <span className="text-slate-600 font-medium">
                              Featured Event
                            </span>
                          </div>

                          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                            {event.title}
                          </h3>
                          <p className="text-lg text-slate-600 mb-6">
                            {event.subtitle}
                          </p>

                          <div className="space-y-3 mb-6 text-slate-700">
                            {/* Date & Time */}
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-amber-600" />
                              <span className="font-medium">
                                {event.start_date
                                  ? dayjs(event.start_date).format("MMM D, YYYY")
                                  : "Date N/A"}
                              </span>
                              <Clock size={16} className="text-amber-600 ml-4" />
                              <span className="font-medium">
                                {event.start_date
                                  ? dayjs(event.start_date).format("h:mm A")
                                  : "Time N/A"}
                              </span>
                              {event.start_date && (
                                <span className="ml-2 text-sm text-slate-500">
                                  ({dayjs(event.start_date).fromNow()})
                                </span>
                              )}
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-amber-600" />
                              <span className="font-medium">{event.location ?? "Location N/A"}</span>
                            </div>

                            {/* Creator */}
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-amber-600" />
                              <span className="font-medium">{event?.creator?.name ?? "N/A"}</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Navigation Arrows - Hidden on mobile */}
                {featuredEvents.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 w-10 h-10 items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 w-10 h-10 items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Slide Indicators */}
                {featuredEvents.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {featuredEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentSlide
                          ? "bg-amber-600 scale-125"
                          : "bg-white/60 hover:bg-white/80"
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="bg-white/95 backdrop-blur-lg rounded p-4 sm:p-6 border border-white/50">

            {/* Mobile Search */}
            <div className="block sm:hidden space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 text-slate-900 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={searchTerms}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">

                <div className="flex-1 relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 text-slate-900 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded font-semibold transition-all duration-200"
              >
                Search Events
              </button>
            </div>

            {/* Desktop Search */}
            <div className="hidden sm:block">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search events, artists, venues..."
                    className="w-full pl-12 pr-4 py-4 text-slate-900 text-lg bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    value={searchTerms}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex-1 relative">
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-4 text-slate-900 text-lg bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Search Events
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Popular Categories - Horizontal scroll on mobile */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center sm:hidden">
            Popular Categories
          </h3>
          <div className="flex sm:flex-wrap sm:justify-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {[
              { emoji: "🎵", text: "Music", color: "from-purple-500 to-pink-500" },
              { emoji: "🎭", text: "Theater", color: "from-red-500 to-orange-500" },
              { emoji: "🏈", text: "Sports", color: "from-green-500 to-blue-500" },
              { emoji: "🎨", text: "Art", color: "from-indigo-500 to-purple-500" },
              { emoji: "💼", text: "Business", color: "from-gray-600 to-gray-700" },
              { emoji: "🍷", text: "Food & Drink", color: "from-amber-500 to-orange-500" },
            ].map((category, index) => (
              <button
                key={index}
                className="flex-shrink-0 bg-white/80 hover:bg-white backdrop-blur-sm border border-slate-200 hover:border-slate-300 px-4 py-2 sm:py-3 rounded-full transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
              >
                <span className="text-base sm:text-lg mr-2">{category.emoji}</span>
                <span className="text-slate-700 font-medium text-sm sm:text-base whitespace-nowrap">
                  {category.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        {/* <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="whitespace-nowrap">Live events updating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="whitespace-nowrap">4.9★ average rating</span>
            </div>
            <div className="whitespace-nowrap">500+ cities worldwide</div>
          </div>
        </div> */}
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}