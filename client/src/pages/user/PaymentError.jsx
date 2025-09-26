import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
        >
          <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mt-4">Payment Failed ❌</h1>
        <p className="text-gray-600 mt-2">
          Oops! Something went wrong with your payment. Please try again.
        </p>

        <Link
          to="/checkout"
          className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition-all"
        >
          Try Again
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentError;
