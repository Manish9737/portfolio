import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ghost } from "lucide-react"; // Funny icon

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 max-w-md w-full text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          className="flex justify-center mb-6"
        >
          <Ghost size={60} className="text-sky-300 opacity-80" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4 text-sky-400 drop-shadow-sm">
          Uh-oh! 404 Error
        </h1>
        <p className="text-sm text-white/80 mb-6">
          You’ve wandered into the void of the internet. 🌌<br />
          Our space hamster is spinning up the servers to get you home!
        </p>

        <button
          onClick={() => window.history.back()} 
          aria-label="Go back"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
        >
          🚀 Back to Safety
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
