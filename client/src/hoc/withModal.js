import ReactDOM from "react-dom";
import Backdrop from "../components/ui/modal/Backdrop";
import Modal from "../components/ui/modal/Modal";
import useModal from "../hooks/useModal";

const withModal = (WrappedComponent, ChildComponent) => {
  return (props) => {
    const { isShow, onClose, onOpen } = useModal();

    return (
      <>
        {ReactDOM.createPortal(
          <>
            <Backdrop isShow={isShow} onClose={onClose} />
            <Modal isShow={isShow}>
              <ChildComponent onClose={onClose} />
            </Modal>
          </>,
          document.getElementById("modal")
        )}
        <WrappedComponent {...props} modal={{ close: onClose, open: onOpen }} />
      </>
    );
  };
};

export default withModal;
