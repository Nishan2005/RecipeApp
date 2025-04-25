import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import bgImage from '../assets/bg.png';
import salad from '../assets/salad.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Home() {
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://localhost:7043/api/Categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Categories:", data);
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    axios.get(`https://localhost:7043/api/Recipe/home`)
    .then(res => {      
      setRecipe(res.data);
    })
    .catch(err => console.error('Failed to fetch recipes:', err));
  })

  if (loading) return <h3 className="text-center mt-8">Loading Categories...</h3>;
  if (error) return <h3 className="text-center mt-8 text-red-600">Error: {error}</h3>;
  return (
<>
<section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
  {/* Background Image Container */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ 
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: "cover", 
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat"
    }}
  ></div>

  {/* Content Container */}
  <div className="container relative z-10 mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Text Content */}
      <div className="text-center md:text-left px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Learn. Cook. Share.</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Cooking Made Easy.</h2>
        <p className="text-gray-700 mb-6">Eggs. Salad. Fruits. Pasta</p>
        <button className="bg-[#DAE952] bg-opacity-100 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition">
          Find More
        </button>
      </div>

      {/* Image Container */}
      <div className="relative flex justify-center">
        {/* Outer Circular Border */}
        <div className="w-[80%] max-w-lg sm:max-w-md aspect-square border-4 rounded-full flex justify-center items-center" style={{ borderColor: '#DAE952' }}>
          {/* Image */}
          <img
            src={salad}
            alt="Fresh Salad"
            className="w-[60%] max-w-xs sm:max-w-sm object-cover rounded-full drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </div>
  
</section>
{/* <section className="bg-yellow-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Our Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 flex justify-between items-center shadow-md cursor-pointer hover:bg-gray-200 hover:scale-105 duration-300"
                >
                  <h2 className="font-bold sm:text-xl">{category.name}</h2>
                  <img
                    className="w-16 h-16 object-cover"
                    src={category.imageUrl || 'https://static.vecteezy.com/system/resources/thumbnails/014/440/983/small_2x/image-icon-design-in-blue-circle-png.png'}
                    alt={category.name}
                  />
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>
      </section> */}
      

      {/* Recipe Section */}
      <section className="bg-[#DAE952] bg-opacity-60 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Our Delicious and Special Recipes</h2>
          <p className="text-center text-gray-600 text-sm mb-8">These are our top recipes.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ml-4">
          {Array.isArray(recipe) && recipe.map((recipe, index) => (
  <div key={index} className="flex justify-center mb-8 relative">
    {/* Ranking Badge */}
    <div className={`absolute -left-4 -top-4 z-10 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${
      index === 0 ? 'bg-yellow-400 text-yellow-900' : // Gold for 1st
      index === 1 ? 'bg-gray-300 text-gray-800' : // Silver for 2nd
      index === 2 ? 'bg-amber-700 text-amber-100' : // Bronze for 3rd
      'bg-white text-gray-800' // Others
    }`}>
      {index === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🏆</span>
        </div>
      )}
      {index === 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🥈</span>
        </div>
      )}
      {index === 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🥉</span>
        </div>
      )}
      {index > 2 && `#${index+1}`}
    </div>

    {/* Card */}
    <div className="bg-white rounded-tr-3xl rounded-bl-3xl overflow-hidden w-[60%] shadow-lg border-l-4 border-r-4 hover:shadow-xl transition-shadow duration-300 relative">
      {/* Ribbon for top 3 */}
      {index < 3 && (
        <div className={`absolute top-0 right-0 w-32 text-center py-1 text-white font-semibold transform rotate-45 translate-x-8 translate-y-6 ${
          index === 0 ? 'bg-yellow-500' : 
          index === 1 ? 'bg-gray-400' : 
          'bg-amber-700'
        }`}>
          {index === 0 ? 'Top Rated' : index === 1 ? 'Runner Up' : 'Popular'}
        </div>
      )}
      
      <div className="p-4 flex justify-center">
        <div className="relative">
          <img
            src={`https://localhost:7043${recipe.recipe.imagePath}`}
            alt={recipe.recipe.title}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>
      
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg mb-2">{recipe.recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.recipe.description}</p>
        
        {/* Recipe stats */}
        <div className="flex justify-center space-x-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.recipe.prepTime || '30'} min
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {recipe.recipe.servings || '4'} servings
          </div>
        </div>
        
        <button 
          className="bg-[#DAE952] text-black px-6 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-[#C5D446] transition-all duration-300 shadow-md flex items-center mx-auto"
          onClick={() => navigate(`/Details/${recipe.recipe.id}`)}
        >
          Get Recipe
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        
      </div>
    </div>
  </div>
))}
</div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-sm mb-2">Food Hub</h3>
              <p className="text-gray-600 text-xs">Bringing you the best of new recipes of the day.</p>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-2">Navigation</h3>
              <ul className="text-gray-600 text-xs space-y-1">
                <li><a href="#">Home</a></li>
                <li><a href="#">Recipes</a></li>
                <li><a href="#">Profile</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-2">Genres</h3>
              <ul className="text-gray-600 text-xs space-y-1">
                <li><a href="#">Salad</a></li>
                <li><a href="#">Baking</a></li>
                <li><a href="#">Protein Rich</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-2">Our Contacts</h3>
              <ul className="text-gray-600 text-xs space-y-1">
                <li><a href="#">maharjanishan@gmail.com</a></li>
                <li><a href="#">+90909090909</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
</>

  );
}

export default Home;