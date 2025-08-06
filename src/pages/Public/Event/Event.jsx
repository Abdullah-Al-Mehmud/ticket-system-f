import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import { useGetEventsQuery } from "../../../redux/features/event/EventApiSlice";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApiSlice";
import EventCard from "./EventCard";
import EventCardLoadingSkeleton from "../../../components/LoaderComponent/EventCardLoadingSkeleton";
import CategoryLoadingSkeleton from "../../../components/LoaderComponent/CategoryLoadingSkeleton";

const Event = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    search: "",
    category: "",
    orderbyStatus: true,
  });
  const { data, isFetching, isLoading, isError } =
    useGetEventsQuery(pageConfig);
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCategoriesQuery({ all: true });
  const events = data?.data ?? [];
  const categories = categoryData?.data ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/20">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Events
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find and book the perfect events for your interests
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search events title..."
                className="pl-12 pr-4 py-6 text-base border-gray-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() =>
                  setPageConfig((prev) => ({
                    ...prev,
                    search: searchTerm,
                  }))
                }
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white  transition-all duration-200 cursor-pointer px-3 py-[11px] text-lg  rounded-r-xl font-medium"
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {isLoadingCategory ? (
              <CategoryLoadingSkeleton count={5} />
            ) : (
              categories.map((category) => (
                <Button
                  key={category?.id}
                  variant={
                    selectedCategory === category?.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    if (selectedCategory === category?.id) {
                      setSelectedCategory("");
                      setPageConfig((prev) => ({
                        ...prev,
                        category: "",
                      }));
                    } else {
                      setSelectedCategory(category?.id);
                      setPageConfig((prev) => ({
                        ...prev,
                        category: category?.id,
                      }));
                    }
                  }}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-all duration-200 ${
                    selectedCategory === category?.id
                      ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:text-amber-600"
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                </Button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isError && (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-4">
              Failed to load events
            </div>
            <p className="text-gray-500">Please try again later</p>
          </div>
        )}

        {isFetching && <EventCardLoadingSkeleton count={6} />}

        {!isLoading && !isError && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === ""
                  ? "All Events"
                  : categories.find((cat) => cat.id === selectedCategory)
                      ?.name || selectedCategory}
              </h2>
            </div>

            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No events found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm
                    ? "Try adjusting your search terms or browse different categories."
                    : "No events match your current filters."}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPageConfig("");
                    setSearchTerm("");
                    setSelectedCategory("");
                  }}
                  className="rounded-full px-6 py-2 border-amber-300 text-amber-600 hover:bg-amber-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {data && data?.total > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          <Button
            disabled={data?.current_page === 1}
            onClick={() =>
              setPageConfig((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-amber-700">
            Page {data?.current_page} of {data?.last_page}
          </span>
          <Button
            disabled={data?.current_page === data?.last_page}
            onClick={() =>
              setPageConfig((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Event;
