import React from 'react';

const recipesData = [
  {
    id: 1,
    title: "Garlic Bred",
    description: "tasty garlic bread!!",
    price: "$4.99",
    originalPrice: "$6.99",
    imageUrl: "http://media.istockphoto.com/id/547046390/photo/garlic-bread.jpg?s=612x612&w=0&k=20&c=oArNgkbjjPKlToDnBhL7xNwU4_eJLPTaLbAlIuunHDY=",
    rating: 4,
    reviews: 42,
    badge: "New",
  },
  {
    id: 2,
    title: "Smoky BBQ Wings",
    description: "Juicy Tender Meat.",
    price: "$9.99",
    originalPrice: "$14.99",
    imageUrl: "https://t3.ftcdn.net/jpg/02/46/79/66/360_F_246796673_CAyc5vf2YBtB2NDIHr1Up0T0ODHn92kB.jpg",
    rating: 5,
    reviews: 55,
    badge: "New",
  },
  {
    id: 3,
    title: "Meatlovers Madness Pizza",
    description: "Freshly baked with organic ingredients",
    price: "$12.99",
    originalPrice: "$18.99",
    imageUrl: "https://media.istockphoto.com/id/1248287329/photo/savory-homemade-meat-lovers-pizza.jpg?s=612x612&w=0&k=20&c=ozXnuE1wYhYHJ75jwR9dLIodSbM2CFupeA9sxhAqtjY=",
    rating: 3,
    reviews: 20,
    badge: "Best Seller",
  },
  {
    id: 4,
    title: "Loaded Burger",
    description: "Freshly Made with organic ingredients",
    price: "$12.99",
    originalPrice: "$18.99",
    imageUrl: "https://img.freepik.com/free-photo/juicy-cheeseburger-rustic-wooden-board_9975-24623.jpg",
    rating: 3,
    reviews: 20,
    badge: "Best Seller",
  },
  {
    id: 5,
    title: "Chocolate Nutty Brownie",
    description: "Freshly baked with organic ingredients",
    price: "$12.99",
    originalPrice: "$18.99",
    imageUrl: "https://media.istockphoto.com/id/500841274/photo/homemade-chocolate-and-nut-brownie-cake.jpg?s=612x612&w=0&k=20&c=srV-ZssdfsBWX4zhnnimZYGTepdTRGc4vAcjyv2ZFqQ=",
    rating: 3,
    reviews: 20,
    badge: "Best Seller",
  },
];

function Recipes() {
  return (
    <>
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 p-10">
  <h1 className="text-3xl font-bold text-gray-900 mb-6">Recipes Cards</h1>

  <div className="flex flex-wrap justify-center gap-6">
    {recipesData.map((recipe) => (
      <div
        key={recipe.id}
        className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
      >
        <div className="relative">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-52 object-cover"
            aria-label={`Image of ${recipe.title}`}
          />
          {recipe.badge && (
            <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {recipe.badge}
            </span>
          )}
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
            <p className="text-gray-500 mt-1">{recipe.description}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{recipe.price}</p>
              <p className="text-sm text-gray-500 line-through">{recipe.originalPrice}</p>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className={index < recipe.rating ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </div>
              ))}
              <span className="text-sm text-gray-600 ml-1">({recipe.reviews})</span>
            </div>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
            onClick={() => handleAddToCart(recipe.id)} // Replace with your actual add-to-cart logic
          >
            Cook
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
    
  );
}

export default Recipes;
