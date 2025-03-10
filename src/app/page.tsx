"use client";

import React, { useState, useEffect } from 'react';

// Types
interface EventType {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: string;
}

interface CategoryType {
  name: string;
  icon: string;
}

const App: React.FC = () => {
  // State for events, could be fetched from an API
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Summer Music Festival 2025",
      date: "Mar 15",
      time: "7:00 PM",
      location: "Central Park, New York",
      price: 49.99,
      image: "/api/placeholder/400/320",
      category: "Music"
    },
    {
      id: 2,
      title: "TechConf 2025",
      date: "Mar 18",
      time: "9:00 AM",
      location: "Convention Center, San Francisco",
      price: 299.99,
      image: "/api/placeholder/400/320",
      category: "Tech"
    },
    {
      id: 3,
      title: "Modern Art Exhibition",
      date: "Mar 20",
      time: "10:00 AM",
      location: "Metropolitan Museum, New York",
      price: 24.99,
      image: "/api/placeholder/400/320",
      category: "Arts"
    },
    {
      id: 4,
      title: "International Food Festival",
      date: "Mar 22",
      time: "12:00 PM",
      location: "Pier 39, San Francisco",
      price: 39.99,
      image: "/api/placeholder/400/320",
      category: "Food"
    },
    {
      id: 5,
      title: "Web Development Workshop",
      date: "Mar 23",
      time: "2:00 PM",
      location: "Tech Hub, Seattle",
      price: 79.99,
      image: "/api/placeholder/400/320",
      category: "Tech"
    },
    {
      id: 6,
      title: "The Weekenders Live",
      date: "Mar 28",
      time: "8:00 PM",
      location: "Madison Square Garden, New York",
      price: 129.99,
      image: "/api/placeholder/400/320",
      category: "Music"
    }
  ]);

  const categories: CategoryType[] = [
    { name: "Music", icon: "🎵" },
    { name: "Arts", icon: "🎭" },
    { name: "Sports", icon: "🏆" },
    { name: "Business", icon: "💼" },
    { name: "Tech", icon: "💻" },
    { name: "Food", icon: "🍴" },
    { name: "Travel", icon: "✈️" },
    { name: "Gaming", icon: "🎮" },
    { name: "Education", icon: "📚" }
  ];

  const [navbarShadow, setNavbarShadow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Handle scroll event for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simulate loading more events
  const loadMoreEvents = () => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      if (page < 3) {
        // Clone existing events with modified properties
        const newEvents = events.map(event => ({
          ...event,
          id: event.id + events.length,
          title: `New ${event.title}`,
          date: `Mar ${parseInt(event.date.split(' ')[1]) + 7}`
        }));
        
        setEvents([...events, ...newEvents]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${navbarShadow ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="text-2xl font-bold">
                Event<span className="text-purple-600">Hub</span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition">Home</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition">Explore</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition">Categories</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition">Create Event</a>
              </div>
            </div>
            
            {/* Search and Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <button className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50 transition">Login</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition">Sign Up</button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">Explore</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">Categories</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">Create Event</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50">Login</button>
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-pink-500 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Discover Incredible Events Near You</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">Find and book tickets for concerts, workshops, conferences, and more. Join thousands of people discovering events that match their passions.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="px-6 py-3 text-lg font-medium bg-white text-purple-700 rounded-full hover:bg-gray-100 transition">Explore Events</a>
            <a href="#" className="px-6 py-3 text-lg font-medium bg-white bg-opacity-15 border border-white rounded-full hover:bg-opacity-25 transition">Create Your Event</a>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Browse By Category</h2>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-6">
            {categories.map((category, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col items-center cursor-pointer group">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-100 text-3xl rounded-full mb-3 group-hover:-translate-y-1 transition-transform duration-300">
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Upcoming Events</h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Today", "This Weekend", "This Month"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                    activeFilter === filter 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="events-container">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 transition-transform">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-pink-600 font-semibold text-sm mb-2">
                    {event.date} • {event.time}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-purple-600 font-bold">${event.price.toFixed(2)}</div>
                    <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button 
              onClick={loadMoreEvents}
              disabled={loading || !hasMore}
              className={`px-6 py-3 border border-purple-600 rounded-full text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition ${
                !hasMore ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Loading...' : !hasMore ? 'No More Events' : 'Load More'}
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1 */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">EventHub</h3>
              <p className="text-gray-400 mb-6 max-w-md">Discover and book amazing events happening around you. Create and manage your own events with ease.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition">f</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition">t</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition">in</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition">ig</a>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Events</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Concerts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Conferences</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Workshops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Sports</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Exhibitions</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">Get updates on new events and exclusive offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-4 py-2 bg-gray-800 rounded-l-lg border-0 focus:ring-2 focus:ring-purple-600"
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 EventHub. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;