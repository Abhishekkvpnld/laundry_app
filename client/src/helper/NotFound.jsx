import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WashingMachine } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 text-center">
      
      {/* Animated Washing Machine Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
        className="bg-white shadow-lg rounded-full p-6 mb-6"
      >
        <WashingMachine className="w-20 h-20 text-blue-500" />
      </motion.div>

      {/* Error Text */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl font-extrabold text-gray-800"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-2 text-gray-600 text-lg"
      >
        Oops! This page is stuck in the wash cycle. 🫧
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
