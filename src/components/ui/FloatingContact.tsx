"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import { useFormModal } from "@/contexts/FormModalContext";

export function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useFormModal();

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          <button
            onClick={() => openModal("contact")}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-pw-sage text-white shadow-pw-lg hover:bg-pw-sage-600 hover:shadow-pw-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pw-sage focus:ring-offset-2"
            aria-label="Quick contact"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
