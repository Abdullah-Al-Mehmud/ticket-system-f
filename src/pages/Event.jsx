import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';


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
  Coffee,
  BookOpen,
  Camera
} from 'lucide-react';

const Event = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Wine Expo',
      category: 'Food & Drink',
      date: 'Oct 8, 2025',
      time: '12:00 PM',
      place: 'Downtown Plaza',
      attending: 600,
      price: 35,
      image: '/api/placeholder/400/250',
      description: 'Discover the finest wines from around the world at this exclusive expo.',
      featured: true,
      rating: 4.8,
      organizer: 'Wine Society'
    },
    {
      id: 2,
      title: 'Jazz Night Live',
      category: 'Music',
      date: 'Oct 10, 2025',
      time: '8:00 PM',
      place: 'Blue Note Club',
      attending: 120,
      price: 25,
      image: '/api/placeholder/400/250',
      description: 'An evening of smooth jazz with local and international artists.',
      featured: false,
      rating: 4.6,
      organizer: 'Jazz Club'
    },
    {
      id: 3,
      title: 'Art Gallery Opening',
      category: 'Art',
      date: 'Oct 12, 2025',
      time: '6:00 PM',
      place: 'Modern Art Museum',
      attending: 200,
      price: 15,
      image: '/api/placeholder/400/250',
      description: 'Experience contemporary art from emerging local artists.',
      featured: true,
      rating: 4.7,
      organizer: 'Art Foundation'
    },
    {
      id: 4,
      title: 'Coffee Tasting Workshop',
      category: 'Food & Drink',
      date: 'Oct 15, 2025',
      time: '10:00 AM',
      place: 'Brew House',
      attending: 45,
      price: 20,
      image: '/api/placeholder/400/250',
      description: 'Learn about different coffee beans and brewing techniques.',
      featured: false,
      rating: 4.5,
      organizer: 'Coffee Masters'
    },
    {
      id: 5,
      title: 'Photography Workshop',
      category: 'Photography',
      date: 'Oct 18, 2025',
      time: '2:00 PM',
      place: 'Creative Studio',
      attending: 30,
      price: 45,
      image: '/api/placeholder/400/250',
      description: 'Master the art of portrait photography with professional tips.',
      featured: false,
      rating: 4.9,
      organizer: 'Photo Pro'
    },
    {
      id: 6,
      title: 'Book Reading Session',
      category: 'Literature',
      date: 'Oct 20, 2025',
      time: '4:00 PM',
      place: 'City Library',
      attending: 80,
      price: 10,
      image: '/api/placeholder/400/250',
      description: 'Join us for an intimate reading session with bestselling authors.',
      featured: false,
      rating: 4.4,
      organizer: 'Literary Circle'
    }
  ];

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
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const EventCard = ({ event }) => {
    const IconComponent = getCategoryIcon(event.category);
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="relative">
          <div className="w-full h-44 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
            <IconComponent className="w-12 h-12 text-white opacity-80" />
          </div>
          {event.featured && (
            <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
              Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button variant="secondary" size="sm" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="sm" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <Badge variant="outline" className="mb-1 text-xs">
                {event.category}
              </Badge>
              <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                {event.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{event.description}</p>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 ml-2">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{event.rating}</span>
            </div>
          </div>
          
          <div className="space-y-1 mb-3">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Calendar className="w-3 h-3 text-blue-500" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Clock className="w-3 h-3 text-green-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <MapPin className="w-3 h-3 text-red-500" />
              <span className="truncate">{event.place}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <Users className="w-3 h-3 text-purple-500" />
              <span>{event.attending} attending</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">
              ${event.price}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm">
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Amazing Events</h1>
            <p className="text-gray-600 text-lg">Find and book the perfect events for your interests</p>
          </div>
          
          {/* Search Bar */}
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
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
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

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
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
      </div>
    </div>
  );
};

export default Event;