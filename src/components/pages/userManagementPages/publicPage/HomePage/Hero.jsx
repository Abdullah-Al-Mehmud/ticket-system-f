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
import { useGetCategoriesQuery } from "../../../../../store/features/categories/categoriesApiSlice";
import HeroSkeleton from "../../../../../components/common/loaderComponent/HeroSkeleton";
import CategoryLoadingSkeleton from "../../../../../components/common/loaderComponent/CategoryLoadingSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerms, setSearchTerm] = useState("");
  const [date, setDate] = useState("");

  const { data, isLoading, isError } = useGetEventsQuery({
    page: 1,
    count: 10,
    featured: 1,
  });
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategoriesQuery({ count: 3 });
  const categories = categoryData?.data || [];

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (searchTerms) query.set("search", searchTerms);
    if (date) query.set("date", date);

    navigate(`/event?${query.toString()}`);
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
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* Simplified Background Artwork - Mobile Optimized */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-3xl"></div>

        {/* Abstract patterns */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1200 800"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#ea580c", stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,200 Q300,100 600,150 T1200,120 L1200,0 L0,0 Z" fill="url(#grad1)" />
          <path d="M0,600 Q400,500 800,550 T1200,520 L1200,800 L0,800 Z" fill="url(#grad1)" />
        </svg>

        {/* Floating elements */}
        <div className="absolute top-32 right-20 animate-pulse opacity-40">
          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
        </div>
        <div
          className="absolute top-60 left-40 animate-bounce opacity-30"
          style={{ animationDuration: "4s" }}
        >
          <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
        </div>
        <div
          className="absolute bottom-40 right-40 animate-pulse opacity-30"
          style={{ animationDuration: "2.5s" }}
        >
          <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
        </div>

        {/* Music notes and event icons */}
        <div className="absolute top-24 left-1/4 text-amber-300 opacity-30 animate-float">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div
          className="absolute bottom-32 right-1/4 text-purple-300 opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V8h14v12z" />
          </svg>
        </div>
        <div
          className="absolute top-1/2 left-20 text-pink-300 opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-14">

        {isError && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium mb-2">Failed to load events</div>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        )}
        {/* Featured Events Carousel */}
        {
          isLoading ? (
            <HeroSkeleton />
          ) : (<div className="mb-8 sm:mb-12 lg:mb-16">
            <div className="relative group">
              <div className="relative bg-white/90 backdrop-blur-lg rounded overflow-hidden border border-white/50">
                <div className="relative h-48 sm:h-80 lg:h-96"> {/* Reduced mobile height */}
                  {(featuredEvents.length > 0 ? featuredEvents : [
                    {
                      id: "demo",
                      title: "Demo Event",
                      subtitle: "This is a demo featured event",
                      image_url: null,
                      start_date: new Date(),
                      location: "Virtual",
                      creator: { name: "Demo Organizer" },
                      gradient: "from-purple-600/20 to-pink-600/20",
                    }
                  ]).map((event, index) => (
                    <Link
                      to={featuredEvents.length > 0 ? `/event-details/${event.id}` : "#"}
                      key={event.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : index === (currentSlide - 1 + (featuredEvents.length || 1)) % (featuredEvents.length || 1)
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                        }`}
                    >
                      {/* Mobile Layout */}
                      <div className="block lg:hidden h-full">
                        <div className="relative h-2/3">
                          {event.image_url ? (
                            <img
                              src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <span className="text-xl font-bold text-white">TapKori</span>
                            </div>
                          )}
                        </div>

                        <div className="h-1/3 p-3 bg-white">
                          <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-xs text-slate-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-600" />
                            {dayjs(event.start_date).format("MMM D")}
                            <span className="mx-1">•</span>
                            <MapPin className="w-3 h-3 text-amber-600" />
                            <span className="truncate max-w-20">{event.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:flex h-full">
                        <div className="w-2/3 relative overflow-hidden">
                          {event.image_url ? (
                            <img
                              src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <span className="text-6xl font-bold text-white">TapKori</span>
                            </div>
                          )}
                          <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient}`}></div>
                        </div>

                        <div className="w-1/3 p-8 lg:p-12 flex flex-col justify-center bg-white">
                          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{event.title}</h3>
                          <p className="text-lg text-slate-600 mb-6">{event.subtitle}</p>
                          <div className="space-y-3 mb-6 text-slate-700">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-amber-600" />
                              <span className="font-medium">{dayjs(event.start_date).format("MMM D, YYYY")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-amber-600" />
                              <span className="font-medium">{dayjs(event.start_date).format("h:mm A")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-amber-600" />
                              <span className="font-medium">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-amber-600" />
                              <span className="font-medium">{event.creator?.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Navigation & indicators only if more than 1 slide */}
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
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {featuredEvents.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentSlide ? "bg-amber-600 scale-125" : "bg-white/60 hover:bg-white/80"
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto mt-8 mb-8 sm:mb-12">
              <div className="bg-white/95 backdrop-blur-lg rounded p-4 sm:p-6 border border-white/50">

                {/* Mobile Search */}
                <div className="block sm:hidden space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full pl-10 pr-4 py-3 text-slate-900 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={searchTerms}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 text-slate-900 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded font-semibold text-sm transition-all duration-200 active:scale-95"
                  >
                    Search Events
                  </button>
                </div>

                {/* Desktop Search */}
                <div className="hidden sm:block">
                  <div className="flex flex-col lg:flex-row gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full pl-10 pr-3 py-3 text-slate-900 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                        value={searchTerms}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex-1 relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-3 py-3 text-slate-900 bg-slate-50 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95 hover:-translate-y-0"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        }



        {/* Popular Categories */}
        {isLoadingCategory ? (
          <CategoryLoadingSkeleton />
        ) : (
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center sm:hidden">
              Popular Categories
            </h3>

            <div className="flex sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 px-1 sm:px-0 scrollbar-hide">
              {categories.map((category) => (
                <Link
                  to={`/event?category=${category.id}`}
                  state={{ id: category.id }}
                  key={category.id}
                  className="flex-shrink-0 
                   bg-white sm:bg-white/80 
                   backdrop-blur-sm 
                   border border-t border-slate-200 
                   hover:border-slate-300 
                   px-4 py-2.5 sm:py-3 
                   rounded-full 
                   transition-transform duration-200 
                   active:scale-95 
                   hover:-translate-y-0.5 
                   min-w-max 
                   shadow-sm sm:shadow-none 
                   will-change-transform border"
                >
                  <span className="text-slate-700 font-medium text-sm sm:text-base">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>


        )}
      </div>

      {/* Global Styles */}
      <style jsx>{`
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
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}