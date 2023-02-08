import  { useState, useCallback } from 'react';

const useModal = () => {
  const [isShow, setIsShow] = useState(false);

  const openModalHandler = useCallback(() => {
    setIsShow(true);
  }, []);

  const closeModalHandler = useCallback(() => {
    setIsShow(false);
  }, []);

  return {isShow, onOpen: openModalHandler, onClose: closeModalHandler}
};

export default useModal;
