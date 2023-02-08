import { AnimatePresence, motion } from 'framer-motion';
const NotifyBubble = ({ color, top, right, isNotify }) => {
  return (
    <AnimatePresence>
      {isNotify && (
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1.5, 1] }}
          transition={{ duration: 0.3 }}
          exit={{ scale: 0 }}
          className={`w-1.5 h-1.5 absolute flex ${top ?? 'top-[5px]'} ${right ??
            'right-[7px]'} z-[100]`}
        >
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color ??
              'bg-red-500'} opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-1.5 w-1.5 ${color ??
              'bg-red-500'}`}
          ></span>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default NotifyBubble;
