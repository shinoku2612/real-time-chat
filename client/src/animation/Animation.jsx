import { motion } from 'framer-motion';

import React from 'react';

const Animation = ({ classes, children, animationCreator }) => {
  return (
    <motion.div className={classes} {...animationCreator()}>
      {children}
    </motion.div>
  );
};

export default Animation;
