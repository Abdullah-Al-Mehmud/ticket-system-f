
import React from "react";

export default function HeroSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Carousel Skeleton */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-2xl overflow-hidden"></div>

      {/* Search Skeleton */}
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Mobile Search Skeleton */}
        <div className="block sm:hidden space-y-3">
          <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
          <div className="flex gap-2">
            <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
            <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
        </div>

        {/* Desktop Search Skeleton */}
        <div className="hidden sm:flex gap-3">
          <div className="h-14 bg-gray-200 rounded-xl flex-1"></div>
          <div className="h-14 bg-gray-200 rounded-xl flex-1"></div>
          <div className="h-14 bg-gray-200 rounded-xl flex-1"></div>
          <div className="h-14 bg-gray-300 rounded-xl w-32"></div>
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="h-12 w-28 bg-gray-200 rounded-full flex-shrink-0"
          ></div>
        ))}
      </div>

      {/* Quick Stats Skeleton */}
      <div className="flex flex-wrap justify-center gap-4 text-slate-500">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="h-4 w-24 bg-gray-200 rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
}
