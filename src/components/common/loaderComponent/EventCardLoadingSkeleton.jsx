// components/EventLoadingSkeleton.jsx
import React from "react";

const EventCardLoadingSkeleton = ({ count }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-md shadow-sm h-72 flex flex-col justify-between"
        >
          <div className="bg-gray-200 h-40 w-full rounded-md" />
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
        </div>
      ))}
    </div>
  );
};

export default EventCardLoadingSkeleton;
