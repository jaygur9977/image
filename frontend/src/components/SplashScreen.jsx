// // // import React, { useEffect, useState } from 'react';
// // // import { motion, useAnimation, AnimatePresence } from 'framer-motion';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useGoogleLogin } from '@react-oauth/google';
// // // import axios from 'axios';
// // // import './SplashScreen.css';

// // // const OKMAnimation = () => {
// // //   const [showButton, setShowButton] = useState(false);
// // //   const [user, setUser] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [windowSize, setWindowSize] = useState({
// // //     width: window.innerWidth,
// // //     height: window.innerHeight,
// // //   });
// // //   const [showPhotoSequence, setShowPhotoSequence] = useState(true);

// // //   const controls = useAnimation();
// // //   const bookControls = useAnimation();
// // //   const particleControls = useAnimation();
// // //   const contentControls = useAnimation();
// // //   const photoSequenceControls = useAnimation();
// // //   const navigate = useNavigate();

// // //   const particleEmojis = [
// // //     '📚', '✏️', '📖', '📝', '📓', '📌', '📎', '✂️',
// // //     '🔬', '🧪', '🔭', '⚗️', '🧫', '🧬', '🔍', '🔎',
// // //     '💡', '🧠', '🎓', '🏆', '🌟', '✨', '🔮', '📊',
// // //     '🌍', '🌎', '🌏', '🗺️', '🧭', '🏛️', '🎭', '🏫'
// // //   ];

// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       setWindowSize({
// // //         width: window.innerWidth,
// // //         height: window.innerHeight,
// // //       });
// // //     };

// // //     window.addEventListener('resize', handleResize);
// // //     return () => window.removeEventListener('resize', handleResize);
// // //   }, []);

// // //   useEffect(() => {
// // //     const checkUser = async () => {
// // //       const uid = localStorage.getItem('uid');
// // //       if (uid) {
// // //         try {
// // //           setIsLoading(true);
// // //           const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
// // //           setUser(response.data.user);
// // //         } catch (error) {
// // //           console.error('Error fetching user:', error);
// // //           localStorage.removeItem('uid');
// // //         } finally {
// // //           setIsLoading(false);
// // //         }
// // //       }
// // //       await runFullAnimationSequence();
// // //     };
    
// // //     checkUser();
// // //   }, []);

// // //   const runFullAnimationSequence = async () => {
// // //     // First run the photo sequence
// // //     await runPhotoSequence();
    
// // //     // Then show the OKM animation
// // //     await startAnimations();
// // //   };

// // //   const runPhotoSequence = async () => {
// // //     // 1. Show boy with camera
// // //     await photoSequenceControls.start("showBoy");
    
// // //     // 2. Camera focus effect
// // //     await photoSequenceControls.start("focusCamera");
    
// // //     // 3. Take photo (flash)
// // //     await photoSequenceControls.start("takePhoto");
    
// // //     // 4. Show photo transfer to AI
// // //     await photoSequenceControls.start("transferToAI");
    
// // //     // 5. AI processing animation
// // //     await photoSequenceControls.start("aiProcessing");
    
// // //     // 6. Show enhanced result
// // //     await photoSequenceControls.start("showEnhanced");
    
// // //     // 7. Transition to OKM content
// // //     await new Promise(resolve => setTimeout(resolve, 2000));
// // //     setShowPhotoSequence(false);
// // //   };

// // //   const startAnimations = async () => {
// // //     // Book opening animation
// // //     await bookControls.start({
// // //       rotateY: [90, -10],
// // //       x: ["-50%", "-50%"],
// // //       y: ["-50%", "-50%"],
// // //       opacity: [0, 1],
// // //       transition: { duration: 0.8, ease: "easeOut" }
// // //     });

// // //     // Logo animation with bounce effect
// // //     await controls.start({
// // //       scale: [0, 1.2, 1],
// // //       rotate: [0, 15, -10, 5, 0],
// // //       opacity: [0, 1],
// // //       transition: { 
// // //         duration: 1.2,
// // //         rotate: { duration: 1.5, ease: "anticipate" }
// // //       }
// // //     });

// // //     // Particles floating animation
// // //     await particleControls.start(i => ({
// // //       opacity: [0, 0.8, 0],
// // //       y: [20, -20],
// // //       x: [0, (i % 2 === 0 ? 1 : -1) * 20],
// // //       transition: { 
// // //         duration: 3 + Math.random() * 2,
// // //         repeat: Infinity,
// // //         repeatType: "reverse",
// // //         delay: i * 0.1
// // //       }
// // //     }));

// // //     // Content fade in
// // //     await contentControls.start({
// // //       opacity: [0, 1],
// // //       y: [20, 0],
// // //       transition: { duration: 0.8 }
// // //     });

// // //     setShowButton(true);
// // //   };

// // //   // ... (keep all your existing methods like fetchUserData, login, etc.)

// // //   const particleCount = windowSize.width < 768 ? 12 : 24;
// // //   const particleSize = windowSize.width < 768 ? '0.8rem' : '1rem';
// // //   const logoFontSize = windowSize.width < 768 ? '3rem' : '4.5rem';

// // //   return (
// // //     <div className="okm-animation-container">
// // //       <AnimatePresence>
// // //         {isLoading && (
// // //           <motion.div 
// // //             className="loading-overlay"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //           >
// // //             <motion.div
// // //               className="loading-spinner"
// // //               animate={{ rotate: 360 }}
// // //               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// // //             />
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <AnimatePresence>
// // //         {showPhotoSequence && (
// // //           <motion.div 
// // //             className="photo-sequence-container"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //           >
// // //             {/* Boy with camera */}
// // //             <motion.div 
// // //               className="boy-with-camera"
// // //               variants={{
// // //                 showBoy: { opacity: 1, scale: 1 },
// // //                 focusCamera: { scale: 1.02 }
// // //               }}
// // //               animate={photoSequenceControls}
// // //             >
// // //               <div className="boy"></div>
// // //               <div className="camera"></div>
// // //             </motion.div>

// // //             {/* Camera UI elements */}
// // //             <motion.div 
// // //               className="camera-ui"
// // //               variants={{
// // //                 showBoy: { opacity: 0 },
// // //                 focusCamera: { opacity: 1 }
// // //               }}
// // //               animate={photoSequenceControls}
// // //             >
// // //               <div className="focus-ring"></div>
// // //               <div className="shutter-button"></div>
// // //             </motion.div>

// // //             {/* Flash effect */}
// // //             <motion.div 
// // //               className="camera-flash"
// // //               variants={{
// // //                 takePhoto: { opacity: [0, 1, 0] }
// // //               }}
// // //               animate={photoSequenceControls}
// // //               transition={{ duration: 0.5 }}
// // //             />

// // //             {/* Photo transfer animation */}
// // //             <motion.div 
// // //               className="photo-transfer"
// // //               variants={{
// // //                 transferToAI: { opacity: 1, y: 0 }
// // //               }}
// // //               animate={photoSequenceControls}
// // //               initial={{ opacity: 0, y: 100 }}
// // //             >
// // //               <div className="photo-preview"></div>
// // //               <div className="transfer-line"></div>
// // //             </motion.div>

// // //             {/* AI processing */}
// // //             <motion.div 
// // //               className="ai-processing"
// // //               variants={{
// // //                 aiProcessing: { opacity: 1, scale: 1 }
// // //               }}
// // //               animate={photoSequenceControls}
// // //               initial={{ opacity: 0, scale: 0.8 }}
// // //             >
// // //               <div className="ai-chip"></div>
// // //               <div className="processing-bars">
// // //                 <div className="bar"></div>
// // //                 <div className="bar"></div>
// // //                 <div className="bar"></div>
// // //               </div>
// // //               <div className="processing-text">AI Enhancing Portrait...</div>
// // //             </motion.div>

// // //             {/* Enhanced result */}
// // //             <motion.div 
// // //               className="enhanced-result"
// // //               variants={{
// // //                 showEnhanced: { opacity: 1, scale: 1 }
// // //               }}
// // //               animate={photoSequenceControls}
// // //               initial={{ opacity: 0, scale: 0.5 }}
// // //             >
// // //               <div className="before-after">
// // //                 <div className="before">Original</div>
// // //                 <div className="after">Enhanced</div>
// // //               </div>
// // //               <div className="result-image"></div>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       {!showPhotoSequence && (
// // //         <>
// // //           {user && (
// // //             <motion.div
// // //               className="user-profile-top"
// // //               initial={{ opacity: 0, y: -20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: 1.5 }}
// // //               whileHover={{ scale: 1.05 }}
// // //             >
// // //               <img 
// // //                 src={user.picture} 
// // //                 alt={user.name} 
// // //                 className="user-avatar-top"
// // //               />
// // //               <span className="user-name-top">{user.name}</span>
// // //             </motion.div>
// // //           )}

// // //           <div className="animation-stage">
// // //             <motion.div 
// // //               className="okm-logo"
// // //               initial={{ scale: 0, opacity: 0 }}
// // //               animate={controls}
// // //               style={{ fontSize: logoFontSize }}
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //             >
// // //               OKM
// // //             </motion.div>

// // //             <motion.div 
// // //               className="book"
// // //               initial={{ rotateY: 90, opacity: 0 }}
// // //               animate={bookControls}
// // //               whileHover={{ scale: 1.05 }}
// // //             >
// // //               <div className="book-cover"></div>
// // //               <div className="book-pages"></div>
// // //               <div className="book-spine"></div>
// // //             </motion.div>

// // //             <div className="particles-container">
// // //               {[...Array(particleCount)].map((_, i) => (
// // //                 <motion.div
// // //                   key={i}
// // //                   className="particle"
// // //                   custom={i}
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={particleControls}
// // //                   style={{
// // //                     left: `${Math.random() * 80 + 10}%`,
// // //                     top: `${Math.random() * 60 + 20}%`,
// // //                     fontSize: particleSize
// // //                   }}
// // //                 >
// // //                   {particleEmojis[i % particleEmojis.length]}
// // //                 </motion.div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           <motion.div 
// // //             className="content"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={contentControls}
// // //           >
// // //             <h1>Welcome to OKM Education</h1>
// // //             <p>Unlocking knowledge, empowering minds</p>

// // //             {showButton && (
// // //               <motion.button
// // //                 className="go-button"
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.5, duration: 0.5 }}
// // //                 onClick={handleButtonClick}
// // //                 whileHover={{ 
// // //                   scale: 1.05,
// // //                   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
// // //                 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 disabled={isLoading}
// // //               >
// // //                 {isLoading ? (
// // //                   <span className="button-loading">
// // //                     <span className="button-spinner" />
// // //                     {user ? "Entering..." : "Logging in..."}
// // //                   </span>
// // //                 ) : (
// // //                   user ? "Enter Dashboard" : "Login with Google"
// // //                 )}
// // //               </motion.button>
// // //             )}
// // //           </motion.div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default OKMAnimation;



// // import React, { useEffect, useState } from 'react';
// // import { motion, useAnimation, AnimatePresence } from 'framer-motion';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import './SplashScreen.css';

// // const OKMAnimation = () => {
// //   const [showButton, setShowButton] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [windowSize, setWindowSize] = useState({
// //     width: window.innerWidth,
// //     height: window.innerHeight,
// //   });
// //   const [showPhotoSequence, setShowPhotoSequence] = useState(true);

// //   const controls = useAnimation();
// //   const bookControls = useAnimation();
// //   const particleControls = useAnimation();
// //   const contentControls = useAnimation();
// //   const photoSequenceControls = useAnimation();
// //   const navigate = useNavigate();

// //   const particleEmojis = [
// //     '📚', '✏️', '📖', '📝', '📓', '📌', '📎', '✂️',
// //     '🔬', '🧪', '🔭', '⚗️', '🧫', '🧬', '🔍', '🔎',
// //     '💡', '🧠', '🎓', '🏆', '🌟', '✨', '🔮', '📊',
// //     '🌍', '🌎', '🌏', '🗺️', '🧭', '🏛️', '🎭', '🏫'
// //   ];

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setWindowSize({
// //         width: window.innerWidth,
// //         height: window.innerHeight,
// //       });
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   useEffect(() => {
// //     const checkUser = async () => {
// //       const uid = localStorage.getItem('uid');
// //       if (uid) {
// //         try {
// //           setIsLoading(true);
// //           const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
// //           setUser(response.data.user);
// //         } catch (error) {
// //           console.error('Error fetching user:', error);
// //           localStorage.removeItem('uid');
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       }
// //       await runFullAnimationSequence();
// //     };

// //     checkUser();
// //   }, []);

// //   const runFullAnimationSequence = async () => {
// //     // First run the photo sequence
// //     await runPhotoSequence();

// //     // Then show the OKM animation
// //     await startAnimations();
// //   };

// //   const runPhotoSequence = async () => {
// //     // 1. Show boy with camera
// //     await photoSequenceControls.start("showBoy");

// //     // 2. Camera focus effect
// //     await photoSequenceControls.start("focusCamera");

// //     // 3. Take photo (flash)
// //     await photoSequenceControls.start("takePhoto");

// //     // 4. Show photo transfer to AI
// //     await photoSequenceControls.start("transferToAI");

// //     // 5. AI processing animation
// //     await photoSequenceControls.start("aiProcessing");

// //     // 6. Show enhanced result
// //     await photoSequenceControls.start("showEnhanced");

// //     // 7. Transition to OKM content
// //     await new Promise(resolve => setTimeout(resolve, 2000));
// //     setShowPhotoSequence(false);
// //   };

// //   const startAnimations = async () => {
// //     // Book opening animation
// //     await bookControls.start({
// //       rotateY: [90, -10],
// //       x: ["-50%", "-50%"],
// //       y: ["-50%", "-50%"],
// //       opacity: [0, 1],
// //       transition: { duration: 0.8, ease: "easeOut" }
// //     });

// //     // Logo animation with bounce effect
// //     await controls.start({
// //       scale: [0, 1.2, 1],
// //       rotate: [0, 15, -10, 5, 0],
// //       opacity: [0, 1],
// //       transition: { 
// //         duration: 1.2,
// //         rotate: { duration: 1.5, ease: "anticipate" }
// //       }
// //     });

// //     // Particles floating animation
// //     await particleControls.start(i => ({
// //       opacity: [0, 0.8, 0],
// //       y: [20, -20],
// //       x: [0, (i % 2 === 0 ? 1 : -1) * 20],
// //       transition: { 
// //         duration: 3 + Math.random() * 2,
// //         repeat: Infinity,
// //         repeatType: "reverse",
// //         delay: i * 0.1
// //       }
// //     }));

// //     // Content fade in
// //     await contentControls.start({
// //       opacity: [0, 1],
// //       y: [20, 0],
// //       transition: { duration: 0.8 }
// //     });

// //     setShowButton(true);
// //   };

// //   const handleButtonClick = () => {
// //     navigate('/dashboard');
// //   };

// //   const particleCount = windowSize.width < 768 ? 12 : 24;
// //   const particleSize = windowSize.width < 768 ? '0.8rem' : '1rem';
// //   const logoFontSize = windowSize.width < 768 ? '3rem' : '4.5rem';

// //   return (
// //     <div className="okm-animation-container">
// //       <AnimatePresence>
// //         {isLoading && (
// //           <motion.div 
// //             className="loading-overlay"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <motion.div
// //               className="loading-spinner"
// //               animate={{ rotate: 360 }}
// //               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// //             />
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <AnimatePresence>
// //         {showPhotoSequence && (
// //           <motion.div 
// //             className="photo-sequence-container"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             {/* Boy with camera */}
// //             <motion.div 
// //               className="boy-with-camera"
// //               variants={{
// //                 showBoy: { opacity: 1, scale: 1 },
// //                 focusCamera: { scale: 1.02 }
// //               }}
// //               animate={photoSequenceControls}
// //             >
// //               <div className="boy"></div>
// //               <div className="camera"></div>
// //             </motion.div>

// //             {/* Camera UI elements */}
// //             <motion.div 
// //               className="camera-ui"
// //               variants={{
// //                 showBoy: { opacity: 0 },
// //                 focusCamera: { opacity: 1 }
// //               }}
// //               animate={photoSequenceControls}
// //             >
// //               <div className="focus-ring"></div>
// //               <div className="shutter-button"></div>
// //             </motion.div>

// //             {/* Flash effect */}
// //             <motion.div 
// //               className="camera-flash"
// //               variants={{
// //                 takePhoto: { opacity: [0, 1, 0] }
// //               }}
// //               animate={photoSequenceControls}
// //               transition={{ duration: 0.5 }}
// //             />

// //             {/* Photo transfer animation */}
// //             <motion.div 
// //               className="photo-transfer"
// //               variants={{
// //                 transferToAI: { opacity: 1, y: 0 }
// //               }}
// //               animate={photoSequenceControls}
// //               initial={{ opacity: 0, y: 100 }}
// //             >
// //               <div className="photo-preview"></div>
// //               <div className="transfer-line"></div>
// //             </motion.div>

// //             {/* AI processing */}
// //             <motion.div 
// //               className="ai-processing"
// //               variants={{
// //                 aiProcessing: { opacity: 1, scale: 1 }
// //               }}
// //               animate={photoSequenceControls}
// //               initial={{ opacity: 0, scale: 0.8 }}
// //             >
// //               <div className="ai-chip"></div>
// //               <div className="processing-bars">
// //                 <div className="bar"></div>
// //                 <div className="bar"></div>
// //                 <div className="bar"></div>
// //               </div>
// //               <div className="processing-text">AI Enhancing Portrait...</div>
// //             </motion.div>

// //             {/* Enhanced result */}
// //             <motion.div 
// //               className="enhanced-result"
// //               variants={{
// //                 showEnhanced: { opacity: 1, scale: 1 }
// //               }}
// //               animate={photoSequenceControls}
// //               initial={{ opacity: 0, scale: 0.5 }}
// //             >
// //               <div className="before-after">
// //                 <div className="before">Original</div>
// //                 <div className="after">Enhanced</div>
// //               </div>
// //               <div className="result-image"></div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {!showPhotoSequence && (
// //         <>
// //           {user && (
// //             <motion.div
// //               className="user-profile-top"
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 1.5 }}
// //               whileHover={{ scale: 1.05 }}
// //             >
// //               <img 
// //                 src={user.picture} 
// //                 alt={user.name} 
// //                 className="user-avatar-top"
// //               />
// //               <span className="user-name-top">{user.name}</span>
// //             </motion.div>
// //           )}

// //           <div className="animation-stage">
// //             <motion.div 
// //               className="okm-logo"
// //               initial={{ scale: 0, opacity: 0 }}
// //               animate={controls}
// //               style={{ fontSize: logoFontSize }}
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               OKM
// //             </motion.div>

// //             <motion.div 
// //               className="book"
// //               initial={{ rotateY: 90, opacity: 0 }}
// //               animate={bookControls}
// //               whileHover={{ scale: 1.05 }}
// //             >
// //               <div className="book-cover"></div>
// //               <div className="book-pages"></div>
// //               <div className="book-spine"></div>
// //             </motion.div>

// //             <div className="particles-container">
// //               {[...Array(particleCount)].map((_, i) => (
// //                 <motion.div
// //                   key={i}
// //                   className="particle"
// //                   custom={i}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={particleControls}
// //                   style={{
// //                     left: `${Math.random() * 80 + 10}%`,
// //                     top: `${Math.random() * 60 + 20}%`,
// //                     fontSize: particleSize
// //                   }}
// //                 >
// //                   {particleEmojis[i % particleEmojis.length]}
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>

// //           <motion.div 
// //             className="content"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={contentControls}
// //           >
// //             <h1>Welcome to OKM Education</h1>
// //             <p>Unlocking knowledge, empowering minds</p>

// //             {showButton && (
// //               <motion.button
// //                 className="go-button"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.5, duration: 0.5 }}
// //                 onClick={handleButtonClick}
// //                 whileHover={{ 
// //                   scale: 1.05,
// //                   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
// //                 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 disabled={isLoading}
// //               >
// //                 {isLoading ? (
// //                   <span className="button-loading">
// //                     <span className="button-spinner" />
// //                     {user ? "Entering..." : "Logging in..."}
// //                   </span>
// //                 ) : (
// //                   user ? "Enter Dashboard" : "Login with Google"
// //                 )}
// //               </motion.button>
// //             )}
// //           </motion.div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default OKMAnimation;




// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import './SplashScreen.css';

// const OKMAnimation = () => {
//   const [showButton, setShowButton] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });
//   const [showPhotoSequence, setShowPhotoSequence] = useState(true);

//   const controls = useAnimation();
//   const bookControls = useAnimation();
//   const particleControls = useAnimation();
//   const contentControls = useAnimation();
//   const photoSequenceControls = useAnimation();
//   const navigate = useNavigate();

//   const particleEmojis = [
//     '📚', '✏️', '📖', '📝', '📓', '📌', '📎', '✂️',
//     '🔬', '🧪', '🔭', '⚗️', '🧫', '🧬', '🔍', '🔎',
//     '💡', '🧠', '🎓', '🏆', '🌟', '✨', '🔮', '📊',
//     '🌍', '🌎', '🌏', '🗺️', '🧭', '🏛️', '🎭', '🏫'
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const checkUser = async () => {
//       const uid = localStorage.getItem('uid');
//       if (uid) {
//         try {
//           setIsLoading(true);
//           const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
//           setUser(response.data.user);
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           localStorage.removeItem('uid');
//         } finally {
//           setIsLoading(false);
//         }
//       }
//       await runFullAnimationSequence();
//     };
    
//     checkUser();
//   }, []);

//   const runFullAnimationSequence = async () => {
//     await runPhotoSequence();
//     await startAnimations();
//   };

//   const runPhotoSequence = async () => {
//     // Initial setup
//     await photoSequenceControls.start("initial");
    
//     // Boy appears with camera
//     await photoSequenceControls.start("showBoy");
    
//     // Camera focuses on subject (sunshine portrait)
//     await photoSequenceControls.start("focusCamera");
    
//     // Photo is taken (flash)
//     await photoSequenceControls.start("takePhoto");
    
//     // Photo appears and transfers to computer
//     await photoSequenceControls.start("transferToComputer");
    
//     // Computer screen stretches to full screen
//     await photoSequenceControls.start("expandComputer");
    
//     // AI processing animation
//     await photoSequenceControls.start("aiProcessing");
    
//     // Show enhanced result
//     await photoSequenceControls.start("showEnhanced");
    
//     // Transition to OKM content
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setShowPhotoSequence(false);
//   };

//   const startAnimations = async () => {
//     // Book opening animation
//     await bookControls.start({
//       rotateY: [90, -10],
//       x: ["-50%", "-50%"],
//       y: ["-50%", "-50%"],
//       opacity: [0, 1],
//       transition: { duration: 0.8, ease: "easeOut" }
//     });

//     // Logo animation with bounce effect
//     await controls.start({
//       scale: [0, 1.2, 1],
//       rotate: [0, 15, -10, 5, 0],
//       opacity: [0, 1],
//       transition: { 
//         duration: 1.2,
//         rotate: { duration: 1.5, ease: "anticipate" }
//       }
//     });

//     // Particles floating animation
//     await particleControls.start(i => ({
//       opacity: [0, 0.8, 0],
//       y: [20, -20],
//       x: [0, (i % 2 === 0 ? 1 : -1) * 20],
//       transition: { 
//         duration: 3 + Math.random() * 2,
//         repeat: Infinity,
//         repeatType: "reverse",
//         delay: i * 0.1
//       }
//     }));

//     // Content fade in
//     await contentControls.start({
//       opacity: [0, 1],
//       y: [20, 0],
//       transition: { duration: 0.8 }
//     });

//     setShowButton(true);
//   };

//   const handleButtonClick = () => {
//     if (user) {
//       navigate('/dashboard');
//     } else {
//       login();
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         setIsLoading(true);
//         const userInfo = await axios.get(
//           'https://www.googleapis.com/oauth2/v3/userinfo',
//           { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
//         );
        
//         const response = await axios.post('https://image-backed.onrender.com/api/auth/google', {
//           token: tokenResponse.access_token,
//           user: userInfo.data
//         });
        
//         localStorage.setItem('uid', response.data.user._id);
//         setUser(response.data.user);
//         navigate('/dashboard');
//       } catch (error) {
//         console.error('Login error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     onError: (error) => {
//       console.log('Login Failed:', error);
//       setIsLoading(false);
//     }
//   });

//   const fetchUserData = async (uid) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`https://image-backed.onrender.com/api/get-user/${uid}`);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       localStorage.removeItem('uid');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const particleCount = windowSize.width < 768 ? 12 : 24;
//   const particleSize = windowSize.width < 768 ? '0.8rem' : '1rem';
//   const logoFontSize = windowSize.width < 768 ? '3rem' : '4.5rem';

//   return (
//     <div className="okm-animation-container">
//       <AnimatePresence>
//         {isLoading && (
//           <motion.div 
//             className="loading-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="loading-spinner"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showPhotoSequence && (
//           <motion.div 
//             className="photo-sequence-container"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             {/* Sunshine portrait */}
//             <motion.div 
//               className="sunshine-portrait"
//               variants={{
//                 initial: { opacity: 0, scale: 0.8 },
//                 showBoy: { opacity: 1, scale: 1 },
//                 focusCamera: { scale: 1.05 }
//               }}
//               animate={photoSequenceControls}
//             >
//               <div className="sun-face"></div>
//               <div className="sun-rays"></div>
//             </motion.div>

//             {/* Boy with camera */}
//             <motion.div 
//               className="boy-with-camera"
//               variants={{
//                 initial: { opacity: 0, x: -100 },
//                 showBoy: { opacity: 1, x: 0 }
//               }}
//               animate={photoSequenceControls}
//             >
//               <div className="boy-head"></div>
//               <div className="boy-body"></div>
//               <div className="camera"></div>
//             </motion.div>

//             {/* Camera UI elements */}
//             <motion.div 
//               className="camera-ui"
//               variants={{
//                 initial: { opacity: 0 },
//                 focusCamera: { opacity: 1 }
//               }}
//               animate={photoSequenceControls}
//             >
//               <div className="focus-ring"></div>
//               <div className="shutter-button"></div>
//             </motion.div>

//             {/* Flash effect */}
//             <motion.div 
//               className="camera-flash"
//               variants={{
//                 takePhoto: { opacity: [0, 1, 0] }
//               }}
//               animate={photoSequenceControls}
//               transition={{ duration: 0.5 }}
//             />

//             {/* Computer screen */}
//             <motion.div 
//               className="computer-screen"
//               variants={{
//                 initial: { opacity: 0, y: 100 },
//                 transferToComputer: { opacity: 1, y: 0 },
//                 expandComputer: { 
//                   width: "100%", 
//                   height: "100%",
//                   borderRadius: 0,
//                   transition: { duration: 1 }
//                 }
//               }}
//               animate={photoSequenceControls}
//             >
//               <motion.div 
//                 className="computer-content"
//                 variants={{
//                   transferToComputer: { opacity: 0 },
//                   aiProcessing: { opacity: 1 }
//                 }}
//                 animate={photoSequenceControls}
//               >
//                 <div className="scanning-animation">
//                   <div className="scan-line"></div>
//                 </div>
//                 <div className="progress-bar">
//                   <motion.div 
//                     className="progress-fill"
//                     variants={{
//                       aiProcessing: { width: "100%" }
//                     }}
//                     animate={photoSequenceControls}
//                     transition={{ duration: 2 }}
//                   />
//                 </div>
//                 <div className="processing-text">Enhancing Portrait...</div>
//               </motion.div>

//               <motion.div 
//                 className="enhanced-result"
//                 variants={{
//                   showEnhanced: { opacity: 1 }
//                 }}
//                 animate={photoSequenceControls}
//               >
//                 <div className="result-image"></div>
//                 <div className="result-text">Portrait Enhanced!</div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!showPhotoSequence && (
//         <>
//           {user && (
//             <motion.div
//               className="user-profile-top"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.5 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <img 
//                 src={user.picture} 
//                 alt={user.name} 
//                 className="user-avatar-top"
//               />
//               <span className="user-name-top">{user.name}</span>
//             </motion.div>
//           )}

//           <div className="animation-stage">
//             <motion.div 
//               className="okm-logo"
//               initial={{ scale: 0, opacity: 0 }}
//               animate={controls}
//               style={{ fontSize: logoFontSize }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               OKM
//             </motion.div>

//             <motion.div 
//               className="book"
//               initial={{ rotateY: 90, opacity: 0 }}
//               animate={bookControls}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="book-cover"></div>
//               <div className="book-pages"></div>
//               <div className="book-spine"></div>
//             </motion.div>

//             <div className="particles-container">
//               {[...Array(particleCount)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className="particle"
//                   custom={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={particleControls}
//                   style={{
//                     left: `${Math.random() * 80 + 10}%`,
//                     top: `${Math.random() * 60 + 20}%`,
//                     fontSize: particleSize
//                   }}
//                 >
//                   {particleEmojis[i % particleEmojis.length]}
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           <motion.div 
//             className="content"
//             initial={{ opacity: 0, y: 20 }}
//             animate={contentControls}
//           >
//             <h1>Welcome to OKM Education</h1>
//             <p>Unlocking knowledge, empowering minds</p>

//             {showButton && (
//               <motion.button
//                 className="go-button"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//                 onClick={handleButtonClick}
//                 whileHover={{ 
//                   scale: 1.05,
//                   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="button-loading">
//                     <span className="button-spinner" />
//                     {user ? "Entering..." : "Logging in..."}
//                   </span>
//                 ) : (
//                   user ? "Enter Dashboard" : "Login with Google"
//                 )}
//               </motion.button>
//             )}
//           </motion.div>
//         </>
//       )}
//     </div>
//   );
// };

// export default OKMAnimation;



// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import './SplashScreen.css';

// const CartoonAnimation = () => {
//   const [stage, setStage] = useState(0);
//   const controls = useAnimation();
//   const computerControls = useAnimation();

//   const stages = [
//     { id: 0, name: 'boy-approaches' },
//     { id: 1, name: 'take-photo' },
//     { id: 2, name: 'walk-home' },
//     { id: 3, name: 'feed-computer' },
//     { id: 4, name: 'computer-expands' },
//     { id: 5, name: 'show-result' }
//   ];

//   useEffect(() => {
//     const runAnimation = async () => {
//       // Boy approaches
//       await controls.start({
//         x: [300, 150],
//         transition: { duration: 1.5 }
//       });
//       setStage(1);

//       // Take photo
//       await controls.start({
//         scale: [1, 1.1, 1],
//         transition: { duration: 0.5 }
//       });
//       setStage(2);

//       // Walk home (boy turns around)
//       await controls.start({
//         x: [150, -200],
//         rotateY: [0, 180],
//         transition: { duration: 2 }
//       });
//       setStage(3);

//       // Feed to computer
//       await controls.start({
//         x: [-200, -100],
//         transition: { duration: 1 }
//       });
//       setStage(4);

//       // Computer expands
//       await computerControls.start({
//         width: ['100px', '50vw'],
//         height: ['80px', '40vh'],
//         transition: { duration: 1.5 }
//       });
//       setStage(5);

//       // Show result
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     };

//     runAnimation();
//   }, []);

//   return (
//     <div className="animation-container">
//       {/* Sunshine Portrait */}
//       <div className={`sunshine-portrait ${stage >= 0 ? 'visible' : ''}`}>
//         <div className="sun-face">☀️</div>
//       </div>

//       {/* Boy Character */}
//       <motion.div 
//         className="boy-character"
//         animate={controls}
//         initial={{ x: 300 }}
//       >
//         <div className="boy-head">👦</div>
//         <div className="camera">📷</div>
//       </motion.div>

//       {/* Computer */}
//       <motion.div 
//         className="computer"
//         animate={computerControls}
//         initial={{ width: 100, height: 80 }}
//       >
//         <div className="screen">
//           {stage >= 3 && <div className="photo-transfer">🖼️→</div>}
//           {stage >= 4 && <div className="scanning">Scanning...</div>}
//           {stage >= 5 && (
//             <div className="result">
//               <div className="enhanced-photo">✨🖼️✨</div>
//               <div>Enhanced!</div>
//             </div>
//           )}
//         </div>
//       </motion.div>

//       {/* Stage Indicator */}
//       <div className="stage-indicator">
//         {stages.map(s => (
//           <div key={s.id} className={`stage ${stage >= s.id ? 'active' : ''}`}>
//             {s.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartoonAnimation;






// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import './SplashScreen.css';

// const FullAnimation = () => {
//   const navigate = useNavigate();
//   const [stage, setStage] = useState(0);
//   const [showPhoto, setShowPhoto] = useState(false);
//   const [showButton, setShowButton] = useState(false);
//   const boyControls = useAnimation();
//   const cameraControls = useAnimation();
//   const photoControls = useAnimation();
//   const computerControls = useAnimation();
//   const screenControls = useAnimation();
//   const buttonControls = useAnimation();

//   const animationSequence = async () => {
//     // 1. Boy walks to mountain (0-5s)
//     await boyControls.start({
//       x: [500, 200],
//       y: [0, -30],
//       transition: { duration: 3, ease: "easeOut" }
//     });
//     setStage(1);

//     // 2. Camera focuses and takes photo (5-8s)
//     await cameraControls.start({
//       scale: [1, 1.2, 1],
//       rotate: [0, 5, -5, 0],
//       transition: { duration: 1.5 }
//     });
//     setShowPhoto(true);
//     setStage(2);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // 3. Boy turns and walks home (8-13s)
//     await boyControls.start({
//       x: [200, -200],
//       y: [-30, 0],
//       rotateY: [0, 180],
//       transition: { duration: 3 }
//     });
//     setStage(3);

//     // 4. Boy approaches computer (13-16s)
//     await boyControls.start({
//       x: [-200, 100],
//       transition: { duration: 2 }
//     });
//     setStage(4);

//     // 5. Photo transfers to computer (16-18s)
//     await photoControls.start({
//       x: [0, 150],
//       y: [0, -50],
//       opacity: [1, 0],
//       transition: { duration: 1.5 }
//     });
//     setShowPhoto(false);
//     setStage(5);

//     // 6. Computer expands (18-22s)
//     await computerControls.start({
//       width: ["200px", "50vw"],
//       height: ["150px", "40vh"],
//       transition: { duration: 2 }
//     });
//     setStage(6);

//     // 7. Processing animation (22-26s)
//     await new Promise(resolve => setTimeout(resolve, 3000));
//     setStage(7);

//     // 8. Show result and button (26-30s)
//     setShowButton(true);
//     await buttonControls.start({
//       opacity: [0, 1],
//       y: [20, 0],
//       transition: { duration: 1 }
//     });
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       animationSequence();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleRestart = () => {
//     setStage(0);
//     setShowPhoto(false);
//     setShowButton(false);
//     boyControls.start({ x: 500, y: 0, rotateY: 0 });
//     cameraControls.start({ scale: 1, rotate: 0 });
//     photoControls.start({ x: 0, y: 0, opacity: 1 });
//     computerControls.start({ width: "200px", height: "150px" });
//     animationSequence();
//   };

//   return (
//     <div className="animation-container">
//       {/* Mountain Scene */}
//       <div className="mountain-scene">
//         <div className="mountain"></div>
//         <div className="sun">☀️</div>
//       </div>

//       {/* Home Scene */}
//       <div className="home-scene">
//         <div className="house">
//           <div className="house-body"></div>
//           <div className="house-roof"></div>
//           <div className="house-door"></div>
//           <div className="house-window"></div>
//         </div>
//       </div>

//       {/* Boy Character */}
//       <motion.div className="boy" animate={boyControls}>
//         <div className="boy-head"></div>
//         <div className="boy-body"></div>
//         <motion.div className="camera" animate={cameraControls}>
//           <div className="camera-body">📷</div>
//           <div className="camera-flash"></div>
//         </motion.div>
//       </motion.div>

//       {/* Photo */}
//       <AnimatePresence>
//         {showPhoto && (
//           <motion.div
//             className="photo"
//             animate={photoControls}
//             initial={{ opacity: 0 }}
//             exit={{ opacity: 0 }}
//           >
//             <div className="photo-image">🏔️☀️</div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Computer */}
//       <motion.div 
//         className="computer"
//         animate={computerControls}
//         initial={{ width: "200px", height: "150px" }}
//       >
//         <div className="computer-screen">
//           {stage >= 5 && (
//             <div className="computer-content">
//               {stage < 7 ? (
//                 <div className="processing">
//                   <div className="scan-line"></div>
//                   <div className="code-lines">
//                     <div>Processing sunshine...</div>
//                     <div>Enhancing colors...</div>
//                     <div>Applying filters...</div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="result">
//                   <div className="enhanced-image">✨🏔️☀️✨</div>
//                   <div className="result-text">Sunshine Enhanced!</div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="computer-keyboard"></div>
//       </motion.div>

//       {/* Controls */}
//       <div className="controls">
//         <div className="stage-indicator">Stage: {stage}/7</div>
//         <button className="restart-btn" onClick={handleRestart}>
//           Restart Animation
//         </button>
//       </div>

//       {/* Continue Button */}
//       <AnimatePresence>
//         {showButton && (
//           <motion.button
//             className="continue-btn"
//             animate={buttonControls}
//             initial={{ opacity: 0, y: 20 }}
//             onClick={() => navigate('/home')}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Go to Home Page
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FullAnimation;





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
