// src/pages/Login.jsx
function Login() {
    return (
      <div className="min-h-screen bg-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side with illustration */}
          <div className="w-full md:w-1/2 bg-sky-50 p-8 flex items-center justify-center">
            <div className="relative">
              {/* Decorative dots */}
              <div className="absolute -top-12 -left-12 w-6 h-6 rounded-full border-2 border-dotted border-teal-400"></div>
              <div className="absolute top-10 -right-16 w-6 h-6 rounded-full border-2 border-dotted border-teal-400"></div>
              <div className="absolute -bottom-8 left-20 w-6 h-6 rounded-full border-2 border-dotted border-teal-400"></div>
              
              {/* Main illustration */}
              <div className="relative">
                <div className="bg-blue-300 h-32 w-64 rounded-tr-3xl rounded-tl-md"></div>
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="flex items-end">
                    {/* Person with yellow shirt */}
                    <div className="relative mb-2">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>
                      <div className="w-10 h-16 bg-yellow-400 absolute -bottom-16 left-1"></div>
                      <div className="w-3 h-12 bg-indigo-900 absolute -bottom-28 left-1"></div>
                      <div className="w-3 h-12 bg-indigo-900 absolute -bottom-28 left-8"></div>
                      <div className="w-6 h-4 bg-red-400 absolute -bottom-16 -right-3"></div>
                    </div>
                    
                    {/* Desk */}
                    <div className="relative z-10 w-60 h-1 bg-blue-500"></div>
                    
                    {/* Person with purple hair */}
                    <div className="relative mb-2 ml-10">
                      <div className="w-10 h-10 bg-indigo-700 rounded-full"></div>
                      <div className="w-10 h-14 bg-pink-200 absolute -bottom-14 left-0"></div>
                    </div>
                  </div>
                </div>
                
                {/* Plant */}
                <div className="absolute bottom-0 right-2">
                  <div className="w-8 h-16 bg-blue-400 rounded-tl-full rounded-tr-full"></div>
                  <div className="w-4 h-8 bg-yellow-600 rounded-md mx-auto -mt-1"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side with login form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="mb-8">
              <img src="/api/placeholder/150/30" alt="Ghostlamp Logo" className="h-8" />
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-gray-800">Welcome Back :)</h1>
              <p className="text-sm text-gray-600 mt-2">
                To keep connected with us please login with your personal information by email address and password
                <span className="inline-block ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center border rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <span className="text-gray-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="flex-1 outline-none text-sm"
                    placeholder="Email Address"
                    value="Justin@ghostlamp.io"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="text-green-500 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center border rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <span className="text-gray-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    className="flex-1 outline-none text-sm"
                    placeholder="Password"
                    value="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              {/* <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border rounded-sm ${rememberMe ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                      {rememberMe && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-gray-600 hover:underline">Forgot Password?</a>
              </div> */}
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                  Login Now
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200">
                  Create Account
                </button>
              </div>
              
              <div className="relative flex items-center justify-center mt-6">
                <div className="absolute border-t border-gray-300 w-full"></div>
                <span className="relative bg-white px-3 text-sm text-gray-500">Or you can join with</span>
              </div>
              
              {/* <div className="flex justify-center space-x-4 mt-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200">
                  <Google size={20} className="text-gray-600" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition duration-200">
                  <Facebook size={20} className="text-white" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 transition duration-200">
                  <Twitter size={20} className="text-white" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Login;