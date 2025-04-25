import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Header({ onLoginClick }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Reset user state
    setUser(null);
    
    // Optional: Redirect to home page
    window.location.href = "/home";
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-12 bg-white/50 backdrop-blur-sm shadow-md z-50">
        <div className="font-bold text-lg flex justify-between items-center px-4 py-2">
  <h1 className="text-left">Recipe Nest</h1>

  <button 
    className="md:hidden text-gray-700 focus:outline-none"
    onClick={toggleMenu}
    aria-label="Toggle menu"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {isMenuOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </button>
</div>

        
        <nav className="hidden md:flex space-x-6">
          <a href="/home" className="hover:text-green-600 transition-colors">Home</a>
          <a href="/recipes" className="hover:text-green-600 transition-colors">Recipe</a>
          <a href="/profile" className="hover:text-green-600 transition-colors">Profile</a>
        </nav>
        
        <div className="hidden md:block" >
          {user ? (
            <div className="flex items-center gap-4">
              <button
                className="bg-red-400 hover:bg-red-600 text-white px-4 py-0.5 rounded-full transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-0.5 rounded-full transition-colors"
              onClick={onLoginClick}
            >
              Login
            </button>
          )}
        </div>
        
        {/* Mobile Menu Button - aligned to the right */}
        
      
      {/* Mobile Navigation Menu (Slide Down) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col">
            <a href="/home" className="px-4 py-3 hover:bg-gray-100 border-b border-gray-100">Home</a>
            <a href="/recipes" className="px-4 py-3 hover:bg-gray-100 border-b border-gray-100">Recipe</a>
            <a href="/profile" className="px-4 py-3 hover:bg-gray-100 border-b border-gray-100">Profile</a>
            
            {/* Mobile Authentication Controls */}
            {user ? (
              <div className="px-4 py-3 flex flex-col gap-2">
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full transition-colors w-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-3">
                <button
                  className="bg-green-600 hover:bg-green-200 text-white px-4 py-2 rounded-full transition-colors w-full"
                  onClick={onLoginClick}
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  onLoginClick: PropTypes.func.isRequired
};

export default Header;