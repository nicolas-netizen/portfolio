import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Terminal, Database, Cpu, Zap, Github, Layers } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  
  const loadingSteps = [
    'Initializing system...',
    'Loading React components...',
    'Compiling TypeScript...',
    'Loading animations...',
    'Optimizing images...',
    'Loading GitHub data...',
    'Setting up navigation...',
    'Preparing projects...',
    'Loading testimonials...',
    'Finalizing portfolio...',
    'Ready to launch! 🚀'
  ];

  // Typing effect for loading steps
  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const currentStepText = loadingSteps[currentStep];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex <= currentStepText.length) {
          setTypingText(currentStepText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
            setTypingText('');
          }, 4000); // Aumentado a 4000ms para más tiempo entre pasos
        }
      }, 80); // Aumentado de 50 a 80ms para escribir más lento

      return () => clearInterval(typingInterval);
    }
  }, [currentStep, loadingSteps]);

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 2000); // Aumentado de 1000 a 2000ms
          return 100;
        }
        const diff = Math.random() * 2 + 0.5; // Aún más lento para sincronizar con los pasos
        return Math.min(oldProgress + diff, 100);
      });
    }, 200); // Aumentado de 100 a 200ms para actualizar más lento

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Code Symbols */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-emerald-400/20 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {i % 4 === 0 ? <Code size={32} /> : 
               i % 4 === 1 ? <Terminal size={32} /> :
               i % 4 === 2 ? <Database size={32} /> : <Cpu size={32} />}
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Logo/Icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ 
                  rotateY: [0, 360],
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.5)",
                    "0 0 40px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.5)"
                  ]
                }}
                transition={{ 
                  rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <Code className="w-12 h-12 text-white" />
              </motion.div>
              
              {/* Orbiting Elements */}
              {[Layers, Github, Zap].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                  initial={{
                    x: 60,
                    y: -4,
                  }}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Nicolas.dev
            </span>
          </motion.h1>

          {/* Terminal-like Loading Text */}
          <motion.div
            className="mb-8 font-mono text-emerald-400 text-lg min-h-[2rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="text-emerald-500">$</span> {typingText}
            <motion.span
              className="inline-block w-2 h-5 bg-emerald-400 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-80 max-w-full mx-auto mb-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Percentage */}
          <motion.div
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Loading Steps Indicator */}
          <motion.div
            className="mt-6 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            {loadingSteps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-emerald-400' : 'bg-gray-600'
                }`}
                animate={{
                  scale: index === currentStep ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Tech Stack */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 text-emerald-400/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {['React', 'TypeScript', 'Node.js', 'MongoDB'].map((tech, index) => (
            <motion.div
              key={tech}
              className="text-sm font-mono"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.5 
              }}
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
