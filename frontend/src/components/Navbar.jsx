import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          Accept: 'application/json'
        }
      }).then((res) => {
        const userData = {
          uid: res.data.id,
          email: res.data.email,
          name: res.data.name,
          picture: res.data.picture
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        saveUserToDatabase(userData);
        setIsMobileMenuOpen(false);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    },
    onError: (error) => {
      console.error('Login Error:', error);
    }
  });

  const saveUserToDatabase = async (userData) => {
    try {
      await axios.post('/api/users', {
        googleId: userData.uid,
        email: userData.email,
        name: userData.name,
        avatar: userData.picture
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 bg-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              className="h-8 w-auto md:h-10" 
              src="/logoipsum-343.svg" 
              alt="Logo" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <button 
                  onClick={logout}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="flex items-center text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-1.5 rounded-md transition-colors duration-200"
              >
                <FcGoogle className="text-lg mr-2" /> 
                <span>Sign in</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-4 pt-2 pb-4 space-y-3 border-t border-gray-200">
          {user ? (
            <div className="flex flex-col items-center space-y-4 py-2">
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-base font-medium text-gray-700">{user.name}</span>
              <button 
                onClick={logout}
                className="w-full max-w-xs text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => login()}
              className="w-full flex items-center justify-center text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-2.5 rounded-md transition-colors duration-200"
            >
              <FcGoogle className="text-xl mr-3" /> 
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
