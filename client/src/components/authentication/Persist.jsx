import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getLocal } from '../../services/localServices';
import { resetStatus, persistLogin } from '../../store/authen-slice';
import { getToken, getStatus } from '../../store/selectors';
import CircleLoading from '../ui/loading/CircleLoading';
import { opacityAnimate } from '../../animation/models';

const Persist = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const status = useSelector(getStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = getLocal('userId');
    !token && userId ? dispatch(persistLogin(userId)) : setIsLoading(false);
  }, []);

  useEffect(() => {
    if (status === 'persist-login/finish') {
      setIsLoading(false);
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div {...opacityAnimate}>
            <CircleLoading />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isLoading && (
          <motion.div {...opacityAnimate}>
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Persist;
