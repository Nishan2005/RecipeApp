import React from 'react';

function Home() {
  return (
    <div className="relative bg-white w-full min-h-screen font-sans">
      {/* Hero Section */}
      <div className="flex max-w-6xl mx-auto px-6 py-20 items-center ">
        <div className="w-1/2 pr-12">
          <h1 className="text-4xl font-bold mb-6">Learn. Cook. Share.<br />Cooking Made Easy.</h1>
          <p className="text-gray-600 mb-8">
            Say good bye to long and frustrating food blogs and recipe videos. Access our recipe cards to prepare any dish in minutes.
          </p>
          <a href="#recipes">
  <button className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium">
    Browse Dish
  </button>
</a>        </div>
        <div className="w-1/2 flex justify-center">
          <div className="relative w-96 h-96">
            <img 
              src="https://cookiesandcups.com/wp-content/uploads/2015/02/fettuccine-alfredo-7.jpg" 
              alt="Fresh Salad" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Additional Sections (not shown in the image but included in your code) */}
      {/* <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Chefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">Chef Card Placeholder</div>
            <div className="bg-gray-100 p-4 rounded-lg">Chef Card Placeholder</div>
            <div className="bg-gray-100 p-4 rounded-lg">Chef Card Placeholder</div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Top-Rated Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">Recipe Card Placeholder</div>
            <div className="bg-gray-100 p-4 rounded-lg">Recipe Card Placeholder</div>
            <div className="bg-gray-100 p-4 rounded-lg">Recipe Card Placeholder</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;