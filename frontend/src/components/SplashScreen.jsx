
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowRight, FiCompass, FiMap, FiCalendar, FiDollarSign } from 'react-icons/fi';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Travel-themed quotes
  const quotes = [
    "Adventure is the best way to learn",
    "Collect moments, not things",
    "The journey is the destination",
    "Wander often, wonder always"
  ];

  const features = [
    { icon: <FiCompass className="text-2xl" />, title: "Smart Routes", description: "Optimized paths" },
    { icon: <FiMap className="text-2xl" />, title: "Hidden Gems", description: "Local favorites" },
    { icon: <FiCalendar className="text-2xl" />, title: "Perfect Timing", description: "Best seasons" },
    { icon: <FiDollarSign className="text-2xl" />, title: "Budget Magic", description: "Save money" }
  ];

  // Google login functionality
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        await saveUserToDatabase(userInfo.data);
        localStorage.setItem('uid', userInfo.data.sub);
        navigate('/home');
      } catch (error) {
        console.error('Error:', error);
      }
    },
    onError: (error) => console.error('Login Error:', error),
  });

  const SplashScreen = () => {
    const [user, setUser] = useState(null);

    useState(() => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }, []);

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
          );

          const userData = {
            name: userInfo.data.name,
            picture: userInfo.data.picture
          };

          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Login Error:', error);
        }
      },
      onError: (error) => console.error('Login Error:', error)
    });
  }


  const saveUserToDatabase = async (userData) => {
    try {
      await axios.post('https://image-backed.onrender.com/api/save-user', {
        uid: userData.sub,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  useEffect(() => {
    // Check for existing user
    const checkUser = async () => {
      const uid = localStorage.getItem('uid');
      if (uid) {
        try {
          const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('uid');
        }
      }
    };
    checkUser();

    // Animation sequence
    const timer = setTimeout(() => setShowContent(true), 800);
    const quoteInterval = setInterval(() =>
      setCurrentQuote(prev => (prev + 1) % quotes.length),
      4000
    );

    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
    };
  }, []);

  const handleButtonClick = () => {
    if (user) {
      navigate('/home');
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gray-900">
      {/* Cartoon-style travel background with blur and dark overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Cartoonish travel background"
          className="w-full h-full object-cover filter blur-sm brightness-50"
        />

        {/* Cartoon elements overlay */}
        <div className="absolute inset-0">
          {/* Hot air balloons */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-500 rounded-full filter blur-[1px]"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-yellow-400 rounded-full filter blur-[1px]"></div>

          {/* Mountains */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="absolute bottom-0 left-10 w-60 h-40 bg-blue-800 clip-path-polygon-[50%_0%,_0%_100%,_100%_100%]"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-60 bg-blue-900 clip-path-polygon-[50%_0%,_0%_100%,_100%_100%]"></div>
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center mb-6"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3212/3212608.png"
              alt="Travel logo"
              className="h-20 w-20 drop-shadow-lg"
            />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">TripCanvas</h1>
          <p className="text-xl text-blue-300">Paint your perfect journey</p>
        </motion.div>

        {/* Animated quote */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 min-h-[80px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black bg-opacity-50 px-6 py-4 rounded-xl backdrop-blur-sm inline-block max-w-md border border-blue-800"
              >
                <p className="text-lg font-medium text-blue-100">"{quotes[currentQuote]}"</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Features */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-black bg-opacity-40 p-4 rounded-lg border border-blue-900 hover:border-blue-500 backdrop-blur-sm transition-all"
              >
                <div className="text-blue-400 mb-2 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-blue-200 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}


        

        {user ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center mx-auto"
            onClick={() => window.location.href = '/home'}
          >
            Let's Go!
            <FiArrowRight className="ml-2" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={login}
            className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium flex items-center mx-auto"
          >
            <FcGoogle className="mr-2 text-xl" />
            Sign in with Google
          </motion.button>
        )}

        {/* Footer */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-blue-300 text-opacity-70 text-sm"
          >
            <p>© {new Date().getFullYear()} TripCanvas. Made with ❤️ for travelers.</p>
          </motion.div>
        )}
      </div>

      {/* CSS for custom shapes */}
      <style jsx global>{`
        .clip-path-polygon-\[50\%_0\%\,\_0\%_100\%\,\_100\%_100\%\] {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
