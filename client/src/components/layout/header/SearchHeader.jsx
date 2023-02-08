import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Search from '../../ui/search/Search';

const SearchHeader = ({ isSearch }) => {
  return (
    <AnimatePresence>
      {isSearch && (
        <motion.form
          className="z-50 bottom-[-120%] absolute right-[50%] drop-shadow-xl w-36"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Search placeholder="search friend..." />
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default SearchHeader;
