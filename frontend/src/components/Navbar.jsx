// import React, { useEffect, useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { FcGoogle } from "react-icons/fc";
// import { FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     if (savedUser) {
//       setUser(savedUser);
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
//         headers: {
//           Authorization: `Bearer ${tokenResponse.access_token}`,
//           Accept: 'application/json'
//         }
//       }).then((res) => {
//         const userData = {
//           uid: res.data.id,
//           email: res.data.email,
//           name: res.data.name,
//           picture: res.data.picture
//         };
//         localStorage.setItem('user', JSON.stringify(userData));
//         setUser(userData);
//         saveUserToDatabase(userData);
//         setIsMobileMenuOpen(false);
//       }).catch(error => {
//         console.error('Error fetching user profile:', error);
//       });
//     },
//     onError: (error) => {
//       console.error('Login Error:', error);
//     }
//   });

//   const saveUserToDatabase = async (userData) => {
//     try {
//       await axios.post('/api/users', {
//         googleId: userData.uid,
//         email: userData.email,
//         name: userData.name,
//         avatar: userData.picture
//       });
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className={`fixed w-full z-50 bg-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <img 
//               className="h-8 w-auto md:h-10" 
//               src="/logoipsum-343.svg" 
//               alt="Logo" 
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <img 
//                   src={user.picture} 
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="text-sm font-medium text-gray-700">{user.name}</span>
//                 <button 
//                   onClick={logout}
//                   className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md transition-colors duration-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => login()}
//                 className="flex items-center text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-1.5 rounded-md transition-colors duration-200"
//               >
//                 <FcGoogle className="text-lg mr-2" /> 
//                 <span>Sign in</span>
//               </button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
//               aria-expanded="false"
//             >
//               {isMobileMenuOpen ? (
//                 <FiX className="h-6 w-6" />
//               ) : (
//                 <FiMenu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
//         <div className="px-4 pt-2 pb-4 space-y-3 border-t border-gray-200">
//           {user ? (
//             <div className="flex flex-col items-center space-y-4 py-2">
//               <img 
//                 src={user.picture} 
//                 alt={user.name}
//                 className="w-12 h-12 rounded-full"
//               />
//               <span className="text-base font-medium text-gray-700">{user.name}</span>
//               <button 
//                 onClick={logout}
//                 className="w-full max-w-xs text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => login()}
//               className="w-full flex items-center justify-center text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-2.5 rounded-md transition-colors duration-200"
//             >
//               <FcGoogle className="text-xl mr-3" /> 
//               <span>Sign in with Google</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const uid = localStorage.getItem('uid');
      if (uid) {
        try {
          await fetchUserData(uid);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('uid');
        }
      }
      setLoading(false);
    };
    
    checkUser();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        setUser(userInfo.data);
        await saveUserToDatabase(userInfo.data);
        localStorage.setItem('uid', userInfo.data.sub);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    onError: (error) => console.error('Google Login Error:', error),
  });

  const saveUserToDatabase = async (userData) => {
    try {
      await axios.post('https://image-backed.onrender.com/api/save-user', {
        uid: userData.sub,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
      });
    } catch (error) {
      console.error('Error saving user to database:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('uid');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-16 bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      {/* Banner with trip photo */}
      <div className="relative h-48 bg-blue-50 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Travel banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-md py-2' : 'bg-white py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <span className="text-3xl font-bold text-blue-600">oKm</span>
              <span className="ml-2 text-sm text-blue-400 hidden sm:inline">Travel Adventures</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-blue-100"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-sm"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={login}
                  className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium flex items-center hover:bg-blue-50 transition-all border border-blue-200 shadow-sm"
                >
                  <FcGoogle className="text-xl mr-2" />
                  Sign in
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none"
              >
                {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white overflow-hidden shadow-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center px-4 py-3">
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={login}
                    className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
                  >
                    <FcGoogle className="text-xl mr-2" />
                    Sign in with Google
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
