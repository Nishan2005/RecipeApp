import React, { useState, useEffect } from 'react'
import { Search, Edit2, Plus, LogIn, Trash2, Eye, Star } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from './updateProfile';

export default function Profile() {
    const [user, setUser] = useState({
        email: "Guest",
        fullName: "Guest",
        id: 0,
        token: ""
    });
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [isGuest, setIsGuest] = useState(true);
    const [totalRecipe, setUserActivity] = useState(0);
    const [overRating, setRating] = useState(0);
    const [totalLikes, setLikes] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('myRecipes'); // 'myRecipes' or 'favorites'
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [fetchedUser, setfetcheduser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userType, setUserType] = useState(0); // Track user type: 1=limited, 2=full access

    const openModal = (id) => {
      setSelectedUserId(id);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedUserId(null);
      fetchUser(user);
    };

    // Load user from localStorage on component mount
    useEffect(() => {
        setIsLoading(true);
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsGuest(parsedUser.id === 0 || !parsedUser.id);
                fetchUser(parsedUser);
                console.log(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                setIsGuest(true);
            }
        } else {
            setIsGuest(true);
        }
        setIsLoading(false);
    }, []);

    const fetchUser = (userObj) => {
      if (!userObj?.id) return;
      axios.get(`https://localhost:7043/api/Users/${userObj.id}`)
        .then(res => {
          console.log("Fetched user:", res.data);
          setfetcheduser(res.data);
          setUserType(res.data.type);
          
          if (res.data.type === 1) {
            handleTabChange('favorites');
          }
        })
        .catch(err => {
          console.error('Failed to fetch user:', err);
        });
    };
    
    // Navigation handlers
    const handleCardClick = (id) => {
        navigate(`/Details/${id}`);
    };
    
    const handleEditClick = (id, e) => {
        e.stopPropagation(); // Prevent triggering the card click
        navigate(`/edit/${id}`);
    };

    const handleCreateRecipe = () => {
        navigate('/add'); // Navigate to your create recipe page
    };

    const handleLogin = () => {
        navigate('/login'); // Navigate to your login page
    };

    // Fetch recipes when user is available and not a guest
    useEffect(() => {
        if (user && user.id && !isGuest) {
            if (userType === 2) {
                getuserRecipe(); // Only fetch user recipes for type=2
            } else if (userType === 1 && activeTab === 'favorites') {
                // For type=1, load favorites if that's the active tab
                handleTabChange('favorites');
            }
        }
    }, [user, isGuest, userType]);

    const getuserRecipe = () => {
      if (user && user.id && !isGuest && userType === 2) {
        setIsLoading(true);
        axios.get(`https://localhost:7043/api/Recipe/filterUserId?Id=${user.id}`)
            .then(res => {
                console.log(res.data);
                setFoods(res.data);
                setFilteredFoods(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch recipes:', err);
                setIsLoading(false);
            });
      }
    }

    // Fetch user activity data - only for type=2 users
    useEffect(() => {
        if (user && user.id && !isGuest && userType === 2) {
            setIsLoading(true);
            axios.get(`https://localhost:7043/api/Recipe/Likes?userId=${user.id}`)
                .then(res => {
                    console.log(res.data);
                    setUserActivity(res.data.totalRecipe || 0);
                    setLikes(res.data.totalLikes || 0);
                    setRating(res.data.avgRating || 0);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch user activity:', err);
                    setIsLoading(false);
                });
        }
    }, [user, isGuest, userType]);

    // Handle search input change
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (!term.trim()) {
            setFilteredFoods(foods);
            return;
        }
        
        const filtered = foods.filter(item => 
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        
        setFilteredFoods(filtered);
    };

    // Handle tab change
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setSearchTerm('');
      setIsLoading(true); // Show loading state while fetching
      
      if (tab === 'favorites') {
          // Fetch favorites data from API
          axios.get(`https://localhost:7043/api/Recipe/likedRecipe?userId=${user.id}`)
              .then(res => {
                  console.log('Fetched favorites:', res.data);
                  setFilteredFoods(res.data);
                  setIsLoading(false);
              })
              .catch(err => {
                  console.error('Failed to fetch favorite recipes:', err);
                  setFilteredFoods([]);
                  setIsLoading(false);
              });
      } else {
          // Show all user recipes
          setFilteredFoods(foods);
          setIsLoading(false);
      }
    };

    // Handle delete recipe
    const handleDeleteRecipe = (id, e) => {
        e.stopPropagation(); // Prevent card click
        
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            axios.delete(`https://localhost:7043/api/Recipe/deleteRecipe/${id}`)
            .then(res => {
              if (res){
                alert("Deleted Successfully");
                getuserRecipe();
              } else {
                alert("Unsuccessful")
              }
            })
            .catch(err => console.error('Failed to delete recipe', err));
        }
    };

    return (
        <div className="min-h-screen bg-[#DAE952] bg-opacity-60 p-2 md:p-4">
            {/* Profile and Activity Cards */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
                {/* User Profile Card */}
                <div className="bg-white bg-opacity-50 rounded-lg p-4 md:p-6 w-full md:w-1/3 flex flex-col items-center shadow-sm">
                    <div className="bg-white rounded-full p-2 mb-4 w-24 h-24 flex items-center justify-center shadow-md overflow-hidden">
                        {fetchedUser?.imagePath ? (
                          <img
                            src={`https://localhost:7043${fetchedUser.imagePath}`}
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
                    
                    {fetchedUser ? (
                      <>
                        <div className="font-bold text-lg mb-1">{fetchedUser.name}</div>
                        <div className="text-gray-600 mb-4">{fetchedUser.email}</div>
                        {/* Display user type - helpful during development */}
                        <div className="text-xs text-gray-500 mb-2">
                          {userType === 1 ? "Basic User" : userType === 2 ? "Recipe Creator" : "Unknown User Type"}
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500 text-sm mb-4">Loading user info...</div>
                    )}
                    
                    {isGuest ? (
                        <button 
                            onClick={handleLogin}
                            className="bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-colors duration-300 shadow-md">
                            <LogIn size={16} />
                            Log In
                        </button>
                    ) : (
                        <button className="bg-yellow-200 hover:bg-yellow-300 px-4 py-1 rounded-full text-sm flex items-center gap-1 transition-colors duration-300 shadow-md"
                        onClick={() => openModal(user.id)}>
                            <Edit2 size={16} />
                            Edit Profile
                        </button>
                    )}
                    
                    <UpdateProfile
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      userId={selectedUserId}
                    />
                </div>

                {/* User Activity Card - Different content based on user type */}
                <div className="bg-white bg-opacity-50 rounded-lg p-4 md:p-6 flex-1 shadow-sm mt-4 md:mt-0">
                    <h2 className="text-xl font-bold text-amber-800 mb-4 md:mb-6 text-center">
                        {isGuest ? "Welcome to Recipe App" : 
                         userType === 1 ? "Welcome Back!" : "User Activity"}
                    </h2>
                    
                    {isGuest ? (
                        <div className="text-center p-4">
                            <p className="mb-4">Log in to create and save your favorite recipes!</p>
                            <button 
                                onClick={handleLogin}
                                className="bg-amber-400 hover:bg-amber-500 px-6 py-2 rounded-full font-medium transition-colors duration-300 shadow-md">
                                Log In Now
                            </button>
                        </div>
                    ) : userType === 1 ? (
                        <div className="text-center p-4">
                            <p className="mb-4">Browse through your favorite recipes!</p>
                            <button 
                                onClick={() => handleTabChange('favorites')}
                                className="bg-amber-400 hover:bg-amber-500 px-6 py-2 rounded-full font-medium transition-colors duration-300 shadow-md">
                                View Favorites
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-3 justify-around">
                            {/* Activity metrics for type=2 users */}
                            <div className="bg-[#DAE952] bg-opacity-80 rounded-lg p-3 flex flex-col items-center w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-amber-800">{totalRecipe}</div>
                                <div className="text-sm text-center text-amber-800">Recipes Created</div>
                            </div>
                            
                            <div className="bg-[#DAE952] bg-opacity-80 rounded-lg p-3 flex flex-col items-center w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-amber-800 flex items-center gap-1">
                                    {overRating}
                                    <Star size={18} className="text-amber-600 fill-amber-600" />
                                </div>
                                <div className="text-sm text-amber-800">Overall Rating</div>
                            </div>
                            
                            <div className="bg-[#DAE952] bg-opacity-80 rounded-lg p-3 flex flex-col items-center w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-2xl md:text-3xl font-bold text-amber-800">{totalLikes}</div>
                                <div className="text-sm text-amber-800">Total Likes</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recipes Section */}
            {!isGuest && (
                <div className="mt-6 md:mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-amber-800">
                            {isGuest ? "Popular Recipes" : 
                             userType === 1 ? "Favorite Recipes" : "Your Recipes"}
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            {/* Search Bar */}
                            <div className="relative w-full sm:w-auto">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder={userType === 1 ? "Search Favorites" : "Search Your Recipes"}
                                    className="pl-10 pr-3 py-2 rounded-full border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full shadow-sm transition-all"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-800">
                                    <Search size={16} />
                                </div>
                            </div>
                            
                            {/* Tab buttons - Show "My Recipes" tab only for type=2 users */}
                            <div className="flex gap-2 w-full sm:w-auto">
                                {userType === 2 && (
                                    <button 
                                        onClick={() => handleTabChange('myRecipes')}
                                        className={`px-4 py-2 rounded-full text-sm w-full sm:w-auto text-center shadow-sm transition-colors ${
                                            activeTab === 'myRecipes' 
                                                ? 'bg-amber-400 text-white' 
                                                : 'bg-yellow-200 hover:bg-yellow-300'
                                        }`}>
                                        My Recipes
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => handleTabChange('favorites')}
                                    className={`px-4 py-2 rounded-full text-sm w-full sm:w-auto text-center shadow-sm transition-colors ${
                                        activeTab === 'favorites' 
                                            ? 'bg-amber-400 text-white' 
                                            : 'bg-yellow-200 hover:bg-yellow-300'
                                    }`}>
                                    Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-4'>
                        {filteredFoods.length > 0 ? (
                            filteredFoods.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    key={item.id}
                                    onClick={() => handleCardClick(item.id)}
                                    className="border shadow-lg rounded-lg hover:shadow-xl hover:scale-105 duration-300 cursor-pointer bg-white bg-opacity-80"
                                >
                                    <div className="relative">
                                        <img 
                                            className='w-full h-[150px] md:h-[200px] object-cover rounded-t-lg' 
                                            src={`https://localhost:7043${item.imagePath}`} 
                                            alt={item.title}
                                        />
                                        {/* Only show edit/delete buttons for type=2 users */}
                                        {userType === 2 && activeTab === 'myRecipes' && (
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                <button
                                                    onClick={(e) => handleEditClick(item.id, e)}
                                                    className="bg-amber-500 hover:bg-amber-600 text-white p-1.5 rounded-full shadow-md transition-colors"
                                                    title="Edit Recipe"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDeleteRecipe(item.id, e)}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-colors"
                                                    title="Delete Recipe"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex justify-between items-center px-3 py-3'>
                                        <p className="font-medium">{item.title}</p>
                                        <div className="flex items-center gap-1 text-amber-600">
                                            <Eye size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                {isGuest ? (
                                    <p>Log in to view and create recipes</p>
                                ) : searchTerm ? (
                                    <p>No recipes found matching "{searchTerm}"</p>
                                ) : activeTab === 'favorites' ? (
                                    <p>You haven't saved any favorite recipes yet</p>
                                ) : (
                                    <p>No recipes created yet. Create your first recipe!</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </AnimatePresence>

            {/* Add Button - Only show for type=2 users */}
            {!isGuest && userType === 2 && (
                <div className="fixed bottom-6 right-6">
                    <button 
                        onClick={handleCreateRecipe}
                        className="bg-amber-400 hover:bg-amber-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-300"
                        title="Create New Recipe"
                    >
                        <Plus size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}