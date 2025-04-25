import { useState } from "react";
import axios from "axios"; // You'll need to install axios: npm install axios
import authImage from '../assets/Untitled.png';
import { form } from "framer-motion/client";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    Type: 1
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: ""
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input changes
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Email must contain '@' and '.'";
    return "";
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters long";
    return "";
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate on change
    if (name === "email") {
      setValidationErrors({
        ...validationErrors,
        email: validateEmail(value)
      });
    } else if (name === "password") {
      setValidationErrors({
        ...validationErrors,
        password: validatePassword(value)
      });
    }
  };

  // Validate the entire form
  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    setValidationErrors({
      email: emailError,
      password: passwordError
    });
    
    return !emailError && !passwordError;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post("https://localhost:7043/api/Users/Login", {
        email: formData.email,
        password: formData.password
      });
  
      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
  
      // Fetch and store user profile
      await fetchUserProfile(jwtToken);
  
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
  
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("https://localhost:7043/api/Users/UserProfile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log(response.data.name); // Log user name
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setError("Failed to fetch user profile.");
    }
  };
  
  // Handle signup submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("https://localhost:7043/api/Users/Register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        type: formData.Type
      });
      
      // Set success message
      setSuccessMessage("Account created successfully! Please login.");
      
      // Switch to login form after successful signup
      setTimeout(() => {
        setIsSignUp(false);
        setFormData({
          ...formData,
          fullName: ""
        });
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center overflow-hidden">
      <div className="relative bg-yellow-200 rounded-2xl max-w-3xl p-5 w-full md:w-4/5 lg:w-4/5 h-auto md:h-[500px] overflow-hidden">
        {/* Container for both the forms and image that will swap */}
        <div className={`flex flex-col md:flex-row w-full h-full transition-all duration-700 ${isSignUp ? "md:-translate-x-1/2" : ""}`}>
          {/* Left Side */}
          <div className="md:min-w-1/2 h-full flex flex-col justify-center">
            {/* Login Form */}
            <div className="p-8">
              <h2 className="font-bold text-3xl text-amber-900">Login</h2>
              <p className="text-sm mt-4 text-amber-900">
                If you are already a member, log in now.
              </p>
              
              {error && !isSignUp && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
                  {error}
                </div>
              )}
              
              {successMessage && !isSignUp && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                  {successMessage}
                </div>
              )}
              
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input 
                  className="p-2 mt-8 rounded-xl border" 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <div className="relative">
                  <input
                    className="p-2 rounded-xl border w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <button 
                  className="bg-amber-700 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-amber-600 font-medium flex justify-center" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && !isSignUp ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="mt-4 text-sm flex justify-between items-center">
                <p>Don't have an account?</p>
                <button
                  className="bg-amber-700 text-white py-2 px-5 rounded-xl hover:scale-110 hover:bg-amber-600 font-semibold duration-300"
                  onClick={() => {
                    setIsSignUp(true);
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  type="button"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Middle - Image Section */}
          <div className="min-w-[50%] h-full">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={authImage}
              //src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Auth"
            />
          </div>

          {/* Right Side - Sign Up Form (will slide into view) */}
          <div className="md:min-w-1/2 h-full flex flex-col justify-center">
            <div className="p-8">
              <h2 className="font-bold text-3xl text-amber-900">Sign Up</h2>
              <p className="text-sm mt-4 text-amber-900">
                Create an account to get started.
              </p>
              
              {error && isSignUp && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
                  {error}
                </div>
              )}
              
              {successMessage && isSignUp && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                  {successMessage}
                </div>
              )}
              
              <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                <input 
                  className="p-2 mt-8 rounded-xl border" 
                  type="text" 
                  name="fullName"
                  placeholder="Full Name" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                />
                <input 
                  className="p-2 rounded-xl border" 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <input 
                  className="p-2 rounded-xl border" 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
                <select 
  className="p-2 rounded-xl border" 
  name="Type"
  value={formData.Type}
  onChange={handleChange}
  required
>
  <option value={1}>FoodLover</option>
  <option value={2}>Chef</option>
</select>

                <button 
                  className="bg-amber-700 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-amber-600 font-medium flex justify-center" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && isSignUp ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <div className="mt-4 text-sm flex justify-between items-center">
                <p>Already have an account?</p>
                <button
                  className="bg-amber-700 text-white py-2 px-5 rounded-xl hover:scale-110 hover:bg-amber-600 font-semibold duration-300"
                  onClick={() => {
                    setIsSignUp(false);
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  type="button"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;