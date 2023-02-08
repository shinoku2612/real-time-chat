import { useContext } from 'react';
import { UIContext } from '../context/UIContext';

const useUI = () => {
  return useContext(UIContext);
}

export default useUI;
