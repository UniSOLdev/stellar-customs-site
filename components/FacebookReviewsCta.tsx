"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export function FacebookReviewsCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.a
        href={SITE.facebookReviews}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-center rounded-full border border-[#1877F2]/55 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9ec5ff] shadow-sm transition duration-300 hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-white hover:shadow-[0_0_28px_rgba(24,119,242,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
      >
        View All Reviews on Facebook
      </motion.a>
    </motion.div>
  );
}
