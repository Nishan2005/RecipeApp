import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate();

    // Fetch categories
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
            })
            .catch((err) => {
                console.error("Error fetching categories:", err.message);
            });
    }, []);

    // Fetch recipes
    useEffect(() => {
        axios.get('https://localhost:7043/api/Recipe/all')
            .then(res => {
                console.log(res.data);
                setAllFoods(res.data);
                setFoods(res.data);
            })
            .catch(err => console.error('Failed to fetch recipes', err));
    }, []);

    // Handle recipe card click
    const handleCardClick = (id) => {
        navigate(`/Details/${id}`);
    };

    // Filter by category
    const filterType = (categoryId) => {
        setActiveCategory(categoryId);
        const filtered = allFoods.filter(item => item.categoryId === categoryId);
        setFoods(filtered);
        setSearchTerm(''); // Clear search when changing category
    };

    // Show all recipes
    const showAll = () => {
        setFoods(allFoods);
        setActiveCategory(null);
        setSearchTerm(''); // Clear search when showing all
    };

    // Handle search input change
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        // If no search term, restore either filtered category or all recipes
        if (!term.trim()) {
            if (activeCategory) {
                filterType(activeCategory);
            } else {
                setFoods(allFoods);
            }
            return;
        }

        // Filter recipes by search term
        let filtered = allFoods;
        
        // If a category is active, only search within that category
        if (activeCategory) {
            filtered = filtered.filter(item => item.categoryId === activeCategory);
        }
        
        // Then filter by search term
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        
        setFoods(filtered);
    };

    return (
        <div className='bg-[#DAE952] bg-opacity-60 max-w-full m-auto px-4 py-8'>
            {/* Search bar */}
            

            {/* Categories heading */}
            <h2 className="text-xl font-bold text-amber-800 text-center mt-6 mb-6">Select Category</h2>
            
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
                {/* All category option */}
                <div 
                    onClick={showAll}
                    className="flex flex-col items-center cursor-pointer group"
                >
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-1 mb-2 overflow-hidden flex items-center justify-center border-2 transition-all shadow-md cursor-pointer hover:scale-105 duration-300 ${activeCategory === null ? 'border-amber-700 bg-amber-100' : 'border-gray-200 bg-white hover:bg-gray-200'}`}>
                        <span className="text-2xl text-amber-700">All</span>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-800">All Recipes</span>
                </div>

                {/* Category items */}
                {categories.length > 0 ? (categories.map((category) => (
                    <div 
                        key={category.id}
                        onClick={() => filterType(category.id)}
                        className="flex flex-col items-center cursor-pointer group"
                    >
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full p-1 mb-2 overflow-hidden flex items-center justify-center border-2 transition-all shadow-md cursor-pointer hover:scale-105 duration-300 ${activeCategory === category.id ? 'border-amber-700 bg-amber-100' : 'border-gray-200 bg-white hover:bg-gray-200'}`}>
                            <img
                                src={`https://localhost:7043${category.imageUrl}` || 'https://static.vecteezy.com/system/resources/thumbnails/014/440/983/small_2x/image-icon-design-in-blue-circle-png.png'} 
                                alt={category.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-800">{category.name}</span>
                    </div>
                ))) : (
                    <p>No categories available.</p>
                )}
            </div>
            <div className="mb-6 max-w-md mx-auto">
                <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-500">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="pl-10 pr-4 py-2 w-full rounded-full border border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-700 transition"
                    />
                </div>
            </div>

            {/* Recipe cards */}
            <AnimatePresence>
                {foods.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-4'>
                        {foods.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                key={item.id}
                                onClick={() => handleCardClick(item.id)}
                                className="border shadow-lg rounded-lg hover:scale-105 duration-500 cursor-pointer rounded-br-2xl rounded-bl-2xl"
                            >
                                <img 
                                    className='w-full h-[150px] md:h-[200px] object-cover rounded-t-lg' 
                                    src={`https://localhost:7043${item.imagePath}`} 
                                    alt={item.title} 
                                />
                                <div className='bg-white bg-opacity-60 flex justify-between px-2 py-4 rounded-br-2xl rounded-bl-2xl'>
                                    <p>{item.title}</p>
                                    <p>
                                        <span className='bg-amber-700 text-white p-1 rounded-md'>{item.category}</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-lg text-gray-700">No recipes found. Try a different search term or category.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Recipes;