
// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useGoogleLogin } from '@react-oauth/google';


// // const Navbar = () => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true); 



// //   useEffect(() => {
// //     const checkUser = async () => {
// //       const uid = localStorage.getItem('uid');
// //       if (uid) {
// //         try {
// //           await fetchUserData(uid);
// //         } catch (error) {
// //           console.error('Error fetching user:', error);
// //           localStorage.removeItem('uid');
// //         }
// //       }
// //       setLoading(false);
// //     };
    
// //     checkUser();
// //   }, []);

// //   const fetchUserData = async (uid) => {
// //     try {
// //       const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
// //       setUser(response.data.user);
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //       throw error;
// //     }
// //   };

// //   const login = useGoogleLogin({
// //     onSuccess: async (tokenResponse) => {
// //       try {
// //         const userInfo = await axios.get(
// //           'https://www.googleapis.com/oauth2/v3/userinfo',
// //           {
// //             headers: {
// //               Authorization: `Bearer ${tokenResponse.access_token}`,
// //             },
// //           }
// //         );

// //         setUser(userInfo.data);
// //         await saveUserToDatabase(userInfo.data);
// //         localStorage.setItem('uid', userInfo.data.sub);
// //       } catch (error) {
// //         console.error('Error fetching user profile:', error);
// //       }
// //     },
// //     onError: (error) => {
// //       console.error('Google Login Error:', error);
// //     },
// //   });

// //   const saveUserToDatabase = async (userData) => {
// //     try {
// //       await axios.post('https://image-backed.onrender.com/api/save-user', {
// //         uid: userData.sub,
// //         email: userData.email,
// //         name: userData.name,
// //         picture: userData.picture,
// //       });
// //     } catch (error) {
// //       console.error('Error saving user to database:', error);
// //     }
// //   };

// //   const handleLogout = () => {
// //     setUser(null);
// //     localStorage.removeItem('uid');
// //     try {
// //       const navigate = useNavigate?.();
// //       if (navigate) {
// //         navigate('/');
// //       } else {
// //         window.location.href = '/';
// //       }
// //     } catch (e) {
// //       window.location.href = '/';
// //     }
// //   };
// //   <a href="https://image-backed.onrender.com/" onClick={handleLogout}>Logout</a>

// //   if (loading) {
// //     return <div>Loading...</div>; 
// //   }

// //   return (
// //     <div className='p-1'>
// //       <div className='flex justify-between text-orange-500 ml-6 items-center'>
// //         <span className="text-4xl font-bold">oKm</span>
// //         <div>
// //           {!user ? (
// //             <div className="flex justify-center mr-6">
// //               <button
// //                 onClick={login}
// //                 className="px-6 py-2 mt-1 bg-black text-white rounded-lg hover:bg-gray-700 transition-all duration-100"
// //               >
// //                 Login
                
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="text-center flex gap-4">
// //               <button
// //                 onClick={handleLogout}
// //                 className="px-4 mt-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
// //               >
// //                 Logout
// //               </button>
// //               <img
// //                 src={user.picture}
// //                 alt={user.name}
// //                 className="w-10 h-10 rounded-full mx-auto"
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom'; // Ensure this import is present

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const checkUser = async () => {
//       const uid = localStorage.getItem('uid');
//       if (uid) {
//         try {
//           await fetchUserData(uid);
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           localStorage.removeItem('uid');
//         }
//       }
//       setLoading(false);
//     };
    
//     checkUser();
//   }, []);

//   const fetchUserData = async (uid) => {
//     try {
//       const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       throw error;
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const userInfo = await axios.get(
//           'https://www.googleapis.com/oauth2/v3/userinfo',
//           {
//             headers: {
//               Authorization: `Bearer ${tokenResponse.access_token}`,
//             },
//           }
//         );

//         setUser(userInfo.data);
//         await saveUserToDatabase(userInfo.data);
//         localStorage.setItem('uid', userInfo.data.sub);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     },
//     onError: (error) => {
//       console.error('Google Login Error:', error);
//     },
//   });

//   const saveUserToDatabase = async (userData) => {
//     try {
//       await axios.post('https://image-backed.onrender.com/api/save-user', {
//         uid: userData.sub,
//         email: userData.email,
//         name: userData.name,
//         picture: userData.picture,
//       });
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('uid');
//     try {
//       const navigate = useNavigate?.();
//       if (navigate) {
//         navigate('/');
//       } else {
//         window.location.href = '/';
//       }
//     } catch (e) {
//       window.location.href = '/';
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <div className='p-4'>
//       <div className='flex justify-between items-center text-orange-500 ml-6'>
//         <span className="text-3xl md:text-4xl font-bold">oKm</span>
//         <div className="flex items-center space-x-4">
//           {!user ? (
//             <div className="flex justify-center">
//               <button
//                 onClick={login}
//                 className="px-6 py-2 mt-1 bg-black text-white rounded-lg hover:bg-gray-700 transition-all duration-100"
//               >
//                 Login
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={handleLogout}
//                 className="px-4 mt-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
//               >
//                 Logout
//               </button>
//               <img
//                 src={user.picture}
//                 alt={user.name}
//                 className="w-10 h-10 rounded-full"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        setUser(userInfo.data);
        await saveUserToDatabase(userInfo.data);
        localStorage.setItem('uid', userInfo.data.sub);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
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
    setProfileDropdownOpen(false);
    localStorage.removeItem('uid');
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-orange-500">oKm</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <button
                onClick={login}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 shadow-sm"
              >
                <FiLogIn className="mr-2" />
                Login with Google
              </button>
            ) : (
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.picture}
                      alt={user.name}
                    />
                  </button>
                </div>

                {profileDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              <button
                onClick={login}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 shadow-sm"
              >
                <FiLogIn className="mr-2" />
                Login with Google
              </button>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.picture}
                      alt={user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded-md"
                  >
                    <FiLogOut className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
