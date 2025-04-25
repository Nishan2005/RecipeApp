import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import React, { useState , useEffect} from 'react';

import Home from './pages/Home';
import Recipe from './pages/Recipes';
import Login from './pages/Login';
import Api from './pages/Api';
import Header from './pages/Header';
import Footer from './pages/Footer';
import ImageGallery from './pages/ImageGallery';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Profile from './pages/Profile';
import EditRecipe from './pages/EditRecipe';
import AdminPage from './pages/AdminPage';
import AddCategory from './pages/AddCategory';
import ProtectedRoute from './ProtectedRoute'; 


function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Hide Header/Footer on admin pages

  const handleLoginClick = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const hideLayout = location.pathname.startsWith('/Admin');


  return (
    
    <>
      {!hideLayout && <Header onLoginClick={handleLoginClick} />}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
  <Route
    path="/recipes"
    element={
      <ProtectedRoute>
        <Recipe />
      </ProtectedRoute>
    }
  />
  <Route path="/login" element={<Login />} />
  <Route
    path="/api"
    element={
      <ProtectedRoute>
        <Api />
      </ProtectedRoute>
    }
  />
  <Route
    path="/image/:id"
    element={
      <ProtectedRoute>
        <ImageGallery />
      </ProtectedRoute>
    }
  />
  <Route
    path="/add"
    element={
      <ProtectedRoute>
        <AddRecipe />
      </ProtectedRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/details/:id"
    element={
      <ProtectedRoute>
        <RecipeDetail />
      </ProtectedRoute>
    }
  />
  <Route
    path="/edit/:id"
    element={
      <ProtectedRoute>
        <EditRecipe />
      </ProtectedRoute>
    }
  />
  <Route path="/admin/*" element={<AdminPage />} />
  <Route path="/admin/Add" element={<AddCategory />} />
  
</Routes>

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/api" element={<Api />} />
        <Route path="/image/:id" element={<ImageGallery />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<RecipeDetail />} />
        <Route path="/edit/:id" element={<EditRecipe />} /> */}

        {/* Admin route */}
        

      {/* </Routes> */}

      {!hideLayout && <Footer />}

      {showLogin && !hideLayout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="relative mt-6">
            <button
              onClick={handleCloseLogin}
              className="absolute top-2 right-2 z-10 bg-white rounded-full px-3 py-1 text-sm font-bold hover:bg-red-500 hover:text-white transition mt-16"
            >
              ✕
            </button>
            <div className="overflow-hidden rounded-lg">
              <Login />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
