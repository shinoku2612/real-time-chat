import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../components/ui/modal/Backdrop';
import Modal from '../components/ui/modal/Modal';
import useModal from '../hooks/useModal';

const withToggleModal = (WrappedComponent, childComponentObj) => {
  return (props) => {
    const [childKey, setChildKey] = useState(Object.keys(childComponentObj)[0]);
    const ChildComponent = useMemo(
      () => childComponentObj[childKey],
      [childKey],
    );
    const {isShow, onClose, onOpen} = useModal();

    return (
      <>
        {ReactDOM.createPortal(
          <>
            <Backdrop isShow={isShow} onClose={onClose} />
            <Modal isShow={isShow}>
              <ChildComponent onClose={onClose} />
            </Modal>
          </>,
          document.getElementById('modal'),
        )}
        <WrappedComponent
          {...props}
          modal={{close: onClose, open: onOpen}}
          toggleChild={setChildKey}
        />
      </>
    );
  };
};

export default withToggleModal;
