import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function RecipeDetail() {
  // State for star ratings in the review form
  const [activeRating, setActiveRating] = useState(2);
  const [reviewText, setReviewText] = useState('');
  const handelSubmitReview = async(e) => {
    e.preventDefault();
    const data = {
      Review: reviewText,
      Userid: logUser.id,
      RecipeId: id,
      Rate: activeRating
    }
    const rexponse = axios.post(`https://localhost:7043/api/Reviews`,
      data
    )
    if(rexponse){
      alert("Review Submitted sucessfully!")
      fetchReviews();
    }else{
      alert("Failed to Submit!")
    }

    
  }
  const { id } = useParams();
  const [reviewsData, setReviewsData] = useState([]);
  const [avgRating, setavgRating] = useState();
  const [recipeDetail, setRecipeData] = useState();
  const [user, setUser] = useState();
  const [recipeMeta, setRecipeMeta] = useState([]);
  const [logUser, setloguser] = useState();
  const [TotalLikes, setTotalLikes] = useState();
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setloguser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
  }, [id]);
  useEffect(() => {
    fetchLikes();
  },[id])
  const fetchLikes = () =>{
    
    axios.get(`
      https://localhost:7043/api/Recipe/RecipeLikes?recipeId=${id}`)
      .then(res =>{
        setTotalLikes(res.data);
      
      })
      .catch(err => console.error('Failed to unlike recipe', err));
      
  }
  const toggleLike = () => {
    if (!user?.id || !recipeDetail?.id) return;
    
    const likeData = {
      userId: user.id,
      recipeId: recipeDetail.id,
      logUserId: logUser.id
    };
    
    if (isLiked) {
      // Unlike
      axios.delete(`https://localhost:7043/api/RecipeLikes/Delete?userId=${logUser.id}&recipeId=${recipeDetail.id}`)
        .then(() => {
          fetchLikes();
          setIsLiked(false);
        })
        .catch(err => console.error('Failed to unlike recipe', err));
    } else {
      // Like
      axios.post('https://localhost:7043/api/RecipeLikes', likeData)
        .then(() => {
          fetchLikes();
          setIsLiked(true);
        })
        .catch(err => console.error('Failed to like recipe', err));
    }
  };
  const [checkedIngredients, setCheckedIngredients] = useState({});
  
  // Toggle ingredient checked state
  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  useEffect(() => {
    axios.get(`https://localhost:7043/api/Recipe/filterId?Id=${id}`)
      .then(res => {
        const data = res.data;
  
        // Parse ingredients and instructions if they're JSON strings
        const parsedIngredients = data.ingredients ? JSON.parse(data.ingredients) : [];
        const parsedInstructions = data.instructions ? JSON.parse(data.instructions) : [];
  
        const updatedRecipe = {
          ...data,
          ingredients: parsedIngredients,
          instructions: parsedInstructions
        };
  
        setRecipeData(updatedRecipe);
  
        // Set meta after data is ready
        setRecipeMeta([
          { label: "Prep Time", value: updatedRecipe.prepTime + " min" || "N/A" },
          { label: "Servings", value: updatedRecipe.servings || "N/A" },
          { label: "Difficulty", value: updatedRecipe.difficulty || "N/A" },
          { label: "Category", value: updatedRecipe.category || "N/A" }
        ]);
      })
      .catch(err => console.error('Failed to get Data', err));
  }, [id]);
  useEffect(() => {
    fetchReviews();
  }, [id]);
  const fetchReviews =() => {
    axios.get(`https://localhost:7043/api/Reviews/${id}`)
    .then(res => {
      const data = res.data.reviews;
      const rating = res.data.avgRating;
      setReviewsData(data);
      setavgRating(rating);

    })
    .catch(err => console.error('Failed to get Data', err));
  }
  
  useEffect(() => {
    if (!recipeDetail || !recipeDetail.userId) return;
  
    axios.get(`https://localhost:7043/api/Users/${recipeDetail.userId}`)
      .then(res => {
        
        const data = res.data;
        setUser(data);
        console.log(data);

        
      })
      .catch(err => console.error('Failed to get Data', err));
  }, [recipeDetail]);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (logUser?.id && recipeDetail?.id) {
      axios.get(`https://localhost:7043/api/RecipeLikes/Likes?userId=${logUser.id}&recipeId=${recipeDetail.id}`)
        .then(res => {
          setIsLiked(res);
        })
        .catch(err => console.error('Failed to check like status', err));
    }
  }, [logUser, recipeDetail]);
  
  const ingredients = recipeDetail?.ingredients || [];
const instructions = recipeDetail?.instructions || [];


  // // Meta data for recipe
  // const recipeMeta = [
  //   { label: "Prep Time", value:"" },
  //   { label: "Servings", value: recipeDetail.servings },
  //   { label: "Difficulty", value: recipeDetail.difficulty },
  //   { label: "Categoriy", value: recipeDetail.category },
  // ] get this after recipeDetail;
  if (!recipeDetail) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  
  
  return (
    <div className="bg-[#DAE952] bg-opacity-60 text-[#333] min-h-full">
      <div className="max-w-6xl mx-auto p-5">

        {/* Recipe Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {/* Recipe Image */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src= {`https://localhost:7043${recipeDetail.imagePath}`}
              alt="Image"
              className="w-full h-full block"
            />
          </div>

          {/* Recipe Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4 text-[#8b5a2b]">{recipeDetail.title}</h1>

            <div className="flex items-center mb-3">
  <button 
    onClick={toggleLike}
    className={`flex items-center justify-center w-10 h-10 rounded-full mr-2 transition-all duration-300 ${
      isLiked 
        ? 'bg-red-500 text-white' 
        : 'bg-white text-gray-400 border border-gray-300 hover:bg-gray-100'
    } ${!logUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}` }                disabled={!logUser}

  >
    {isLiked ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    )}
  </button>
  {TotalLikes}
  <span className="text-gray-600">{isLiked ? 'Liked' : 'Like'}</span>
</div>

            {/* Rating */}
            <div className="flex items-center mb-5">
              <div className="flex text-yellow-400 tracking-wider mr-2">
    {[1, 2, 3, 4, 5].map((star) => {
      if (avgRating >= star) {
        return <span key={star}>★</span>; // full star
      } else if (avgRating >= star - 0.5) {
        return <span key={star}>☆</span>; // half star substitute (can use icon)
      } else {
        return <span key={star} className="text-gray-300">★</span>; // empty star
      }
    })}
  </div>
              <div>{avgRating} rated</div>
            </div>

            {/* Recipe Meta */}
            <div className="flex flex-wrap justify-between bg-white bg-opacity-60 rounded-lg p-4 mb-6 shadow">
              {recipeMeta.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center py-2 px-4 ${
                    index < recipeMeta.length - 1 ? 'md:border-r border-gray-200' : ''
                  }`}
                >
                  <div className="text-xs uppercase text-gray-500">{item.label}</div>
                  <div className="text-lg font-bold text-[#8b5a2b]">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Ingredients */}
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">Ingredients</h2>
            <ul className="mb-8">
              {ingredients.map((ingredient, index) => (
                <li 
                  key={index} 
                  className="flex items-center py-2 border-b border-dashed border-gray-300"
                >
                  <div 
                    className={`w-5 h-5 border-2 border-[#d2691e] rounded mr-4 cursor-pointer relative ${
                      checkedIngredients[index] ? 'bg-[#d2691e]' : ''
                    }`}
                    onClick={() => toggleIngredient(index)}
                  >
                    {checkedIngredients[index] && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-sm">✓</span>
                    )}
                  </div>
                  <span 
                    className={`flex-grow ${
                      checkedIngredients[index] ? 'line-through opacity-60' : ''
                    }`}
                  >
                    {ingredient.name}
                  </span>
                  <span className="font-bold text-[#8b5a2b]">{ingredient.amount} {ingredient.unit}</span>
                </li>
              ))}
            </ul>

            {/* Instructions */}
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">Instructions</h2>
            <div className="mb-8">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex bg-white bg-opacity-60 rounded-lg p-4 mb-4 shadow">
                  <div className="text-2xl font-bold text-[#d2691e] mr-4 min-w-8">{index + 1}</div>
                  <div>{instruction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-4">
          {/* <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">Reviews</h2> */}
          <div className="bg-white bg-opacity-60 rounded-lg p-5 mt-5 shadow border-b-2 border-[#f5deb3] flex gap-4">

                    <div className="bg-yellow-50  rounded-lg p-6 w-[50%] ">
                    <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">Creator :</h2>
                  <div className='flex flex-row items-center gap-4'>

                  
                    <div className="bg-white bg-opacity-60 rounded-full p-2 mb-4 w-16 h-16 flex items-center justify-center">
                    {user?.imagePath ? (
      <img
        src={`https://localhost:7043${user.imagePath}`}
        alt="User"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <div className="text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      </div>
      
    )}
    </div>

    {user ? (<>
          <div className="font-bold text-lg mb-1">{user.name}</div>
    </>):(  <div className="text-gray-500 text-sm mb-4">Loading user info...</div>
    )}
    </div>

          
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 flex-1 shadow-sm w-20">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">Description :</h2>
        {recipeDetail.description}
        </div>
</div>

<div className="mt-10 pt-8 border-t-2 border-[#f5deb3]">
  <div className="bg-white bg-opacity-60 rounded-lg p-6 w-full flex gap-6">
    
    {/* Write a Review */}
    <div className="bg-white bg-opacity-60 rounded-lg p-5 shadow border-b-2 border-[#f5deb3] flex-1 flex flex-col gap-4">
      <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">Write a Review</h3>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl cursor-pointer ${
              star <= activeRating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setActiveRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg font-inherit resize-none"
        placeholder="Share Your Experience"
        rows="4"
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      <button
        className={`bg-[#8b5a2b] text-white border-none py-3 px-6 rounded-lg font-bold cursor-pointer transition-colors ${
                    !logUser ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d2691e]'
                  }`}
        onClick={(e) => handelSubmitReview(e)}
        disabled={!logUser}
      >
                          {logUser ? "Submit Review" : "Log in to Review"}
      </button>
    </div>

    <div className="bg-white bg-opacity-60 bg-opacity-60 rounded-lg p-6 shadow-sm flex-1 max-h-[22rem]">
  <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-[#f5deb3] text-[#8b5a2b]">
    Rewievs :
  </h2>

  {/* Scrollable content only */}
  <div className="max-h-[16rem] overflow-y-auto mb-8 pr-2">
  {reviewsData.length === 0 ? (
    <div className="text-gray-500 text-center font-medium">No reviews yet</div>
  ) : (
    reviewsData.map((review, index) => (
      <div key={index} className="flex bg-white rounded-lg p-4 mb-4 shadow">
        <div className="text-2xl font-bold text-[#d2691e] mr-4 min-w-8">{index + 1}</div>
        <div>
          <div className="font-semibold">{review.userName}</div>
          <div>{review.description}</div>
        </div>
      </div>
    ))
  )}
  </div>
</div>


  </div>
</div>

        
        </div>
          
        </div>
        </div>

  );
}