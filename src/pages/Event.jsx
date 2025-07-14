import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGetEventsQuery } from '../redux/features/event/EventApiSlice';

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  Heart,
  Share2,
  Star,
  Wine,
  Music,
  Palette,
  BookOpen,
  Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Event = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data ?? [];

  const categories = [
    { id: 'all', label: 'All Events', icon: Calendar },
    { id: 'Food & Drink', label: 'Food & Drink', icon: Wine },
    { id: 'Music', label: 'Music', icon: Music },
    { id: 'Art', label: 'Art', icon: Palette },
    { id: 'Photography', label: 'Photography', icon: Camera },
    { id: 'Literature', label: 'Literature', icon: BookOpen }
  ];

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Calendar;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const EventCard = ({ event }) => {
    const IconComponent = getCategoryIcon(event.category);
    return (
       <Link
                    to={`/eventdetails/${event.id}`}
                    className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                    key={event.id}>
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {event.title}
                        
                      </h4>
      
                      <div className="grid grid-cols-2 space-y-2 text-sm text-gray-600 mb-2">
                        <div className=" col-span-1 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                           
                            {new Date(event.start_date).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className=" col-span-1 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(event.start_date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className=" col-span-1 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                       
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">
                          ৳ {event.ticket_price}
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Book Now
                        </button>
                      </div>
      
                    </div>
                  </div>
                    </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Amazing Events</h1>
            <p className="text-gray-600 text-lg">Find and book the perfect events for your interests</p>
          </div>

          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search events, locations, or categories..."
                className="pl-12 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading && (
          <div className="text-center text-gray-500">Loading events...</div>
        )}
        {isError && (
          <div className="text-center text-red-500">Failed to load events.</div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory === 'all' ? 'All Events' : selectedCategory}
                <span className="text-gray-500 ml-2">({filteredEvents.length})</span>
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            {filteredEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <Button
                        key={index + 1}
                        size="sm"
                        variant={currentPage === index + 1 ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? 'Try adjusting your search terms or filters.' : 'No events match your current filters.'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Event;
