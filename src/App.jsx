import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Recipe from './pages/Recipes';
import './App.css';
import Login from './pages/Login'; // Import your login page component

function App() {
  return (
    <Router>
      {/* Navigation bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-6 py-4">
        <div className="font-bold text-xl text-blue-600">FoodLovers</div>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700">Home</Link>
          <Link to="/recipes" className="text-gray-700">Recipe</Link>
          <Link to="/login" className="bg-blue-600 text-white py-1 px-4 rounded-md">Login</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2025 RecipeNest. All rights reserved.</p>
    </footer>
  );
}

export default App;
