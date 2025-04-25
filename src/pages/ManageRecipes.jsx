import { Search, Edit, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function ManageRecipes() {
  const [recipes, setRecipes] = useState([]);
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
          setRecipes(data);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err.message);
          setError(err.message);
        });
    }, []);

  const handleDelete = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Recipes</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-3 pr-10 py-2 border rounded-md"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
      </div>
      
      {/* Recipes List */}
      <div className="space-y-3">
        {recipes.map((recipe, index) => (
          <div 
            key={recipe.id} 
            className="flex items-center justify-between bg-gray-300 p-4 rounded-md"
          >
            <div className="flex items-center gap-4">
              <span className="font-bold">{index + 1}.</span>
              <div>
                <p className="font-medium">{recipe.name}</p>
                {/* <p className="text-sm text-gray-600">Category: {recipe.category} | Difficulty: {recipe.difficulty}</p> */}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-1">
                <Edit size={20} />
              </button>
              <button 
                className="p-1 text-red-600"
                onClick={() => handleDelete(recipe.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-gray-400 p-2 rounded-full shadow-md hover:bg-gray-500">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}