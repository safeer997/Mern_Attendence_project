import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkInProgressModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 w-[90%] sm:w-[400px] text-center space-y-4"
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              🚧 Work in Progress
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              We're currently building this feature to give you the best experience.  
              Stay tuned — it's coming soon! ✨
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4"
            >
              Got it!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorkInProgressModal;
