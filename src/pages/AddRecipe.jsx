import { useState, useEffect} from 'react';
import axios from 'axios';


function AddRecipe() {
  const [ingredients, setIngredients] = useState([
    { name: '', amount: '', unit: 'cups' },
    { name: '', amount: '', unit: 'cups' }
  ]);
  const [instructions, setInstructions] = useState(['', '']);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'cups' }]);
  };
  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
      setPhotoUploaded(true);
    }
  };
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
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          console.log(JSON.parse(storedUser));
          JSON.parse(user)
          
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const formData = new FormData();
    formData.append("Title", document.getElementById("recipe-title").value);
    formData.append("Description", document.getElementById("recipe-description").value);
    formData.append("PrepTime", document.getElementById("prep-time").value);
    formData.append("Servings", document.getElementById("servings").value);
    formData.append("Difficulty", document.getElementById("difficulty").value);
    formData.append("Notes", document.getElementById("recipe-notes").value);
    formData.append("Category", document.getElementById("category").value);
    formData.append("Ingredients", JSON.stringify(ingredients)); 
    formData.append("CreatedBy", user.id);
    instructions.forEach(i => formData.append("Instructions", i));
    const photoInput = document.getElementById("photo-input");
    if (photoInput.files.length > 0) {
      formData.append("Photo", photoInput.files[0]);
    }    
    try {
      const response = await axios.post('https://localhost:7043/api/Recipe/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response) {
        alert("Recipe submitted successfully!");
        window.location.href = "/recipes";
      } else {
        alert("Failed to submit recipe.");
      }
    } catch (err) {
      console.error("Error submitting recipe:", err);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-[#DAE952] bg-opacity-60 text-gray-800 font-sans">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-amber-800 font-bold text-center mb-6 mt-6">Submit Your Recipe</h1>

        <div className="bg-white bg-opacity-60 rounded-xl shadow-lg p-8 mb-8">
          <form id="recipe-form" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-xl text-amber-800 font-semibold mb-4 pb-2 border-b border-amber-200">Basic Information</h2>

              <div className="mb-6">
                <label htmlFor="recipe-title" className="block font-medium mb-2">Recipe Title</label>
                <input
                  type="text"
                  id="recipe-title"
                  placeholder="e.g. Chocolate Cake"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="recipe-description" className="block font-medium mb-2">Brief Description</label>
                <textarea
                  id="recipe-description"
                  placeholder="Write a short description of your recipe..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[120px]"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-2">Recipe Photo</label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer transition-colors ${photoUploaded ? 'border-green-500' : 'border-gray-300 hover:border-amber-600'}`}
                  onClick={() => document.getElementById('photo-input').click()}
                >
                  <div className="text-4xl mb-2 text-gray-400">📷</div>
                  {photoUploaded ? (
                    <>
                      <p>Photo uploaded successfully!</p>
                    </>
                  ) : (
                    <>
                      <p>Click to upload a photo of your dish</p>
                      <p className="text-sm">(or drag and drop)</p>
                    </>
                  )}
                  <input
                    type="file"
                    id="photo-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prep-time" className="block font-medium mb-2">Prep Time (minutes)</label>
                  <input
                    type="number"
                    id="prep-time"
                    min="0"
                    placeholder="e.g. 30"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
  <label htmlFor="Category" className="block font-medium mb-2">Categories</label>
  <select
    id="category"
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
  >
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
</div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="servings" className="block font-medium mb-2">Servings</label>
                  <input
                    type="number"
                    id="servings"
                    min="1"
                    placeholder="e.g. 8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="difficulty" className="block font-medium mb-2">Difficulty</label>
                  <select
                    id="difficulty"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-8">
              <h2 className="text-xl text-amber-800 font-semibold mb-4 pb-2 border-b border-amber-200">Ingredients</h2>
              <p className="mb-4">List all ingredients needed for your recipe</p>

              <div className="mb-6" id="ingredients-container">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 items-center">
                    <input
                      type="text"
                      placeholder="Ingredient name (e.g. Flour)"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Amount (e.g. 2)"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <select
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="cups">Cups</option>
                      <option value="tbsp">Tbsp</option>
                      <option value="tsp">Tsp</option>
                      <option value="oz">oz</option>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="ml">ml</option>
                      <option value="l">l</option>
                      <option value="items">Items</option>
                    </select>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={addIngredient}
              >
                + Add Ingredient
              </button>
            </div>

            {/* Instructions Section */}
            <div className="mb-8">
              <h2 className="text-xl text-amber-800 font-semibold mb-4 pb-2 border-b border-amber-200">Instructions</h2>
              <p className="mb-4">Provide step-by-step instructions for preparing your recipe</p>

              <div id="instructions-container" className="mb-6">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex flex-col md:flex-row mb-4 items-start">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                      <div className="bg-amber-700 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                    </div>
                    <textarea
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[100px]"
                      placeholder="Describe this step..."
                    ></textarea>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                onClick={addInstruction}
              >
                + Add Step
              </button>
            </div>

            {/* Additional Information Section */}
            <div className="mb-8">
              <h2 className="text-xl text-amber-800 font-semibold mb-4 pb-2 border-b border-amber-200">Additional Information</h2>

              {/* <div className="mb-6">
                <label className="block font-medium mb-2">Recipe Categories</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {Object.entries(categories).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleCategoryChange(key)}
                        className="mr-2 w-4 h-4"
                      />
                      {key.split(/(?=[A-Z])/).join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                    </label>
                  ))}
                </div>
              </div> */}

              <div className="mb-6">
                <label htmlFor="recipe-notes" className="block font-medium mb-2">Additional Notes (Optional)</label>
                <textarea
                  id="recipe-notes"
                  placeholder="Share any tips, variations, or substitutions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[120px]"
                ></textarea>
              </div>
            </div>

            {/* Form Footer */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-amber-800 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;