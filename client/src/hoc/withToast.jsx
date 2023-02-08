import React, { useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/ui/notification/Toast";

const withToast = (WrappedComponent) => {
  return (props) => {
    const [toastList, setListToast] = useState([]);

    const removeToastHandler = useCallback((id) => {
      setListToast((list) => list.filter((toast) => toast.id !== id));
    }, []);

    const addToastHandler = useCallback((toast) => {
      setListToast((list) =>
        list.concat({ ...toast, id: new Date().getTime() })
      );
    }, []);

    const toast = useMemo(
      () => ({ addToast: addToastHandler }),
      [addToastHandler]
    );

    return (
      <>
        {createPortal(
          <div className="fixed top-[70px] right-0 h-max w-max mt-4 z-[11]">
            {toastList.map((toast) => {
              return (
                <Toast
                  key={toast.id}
                  autoClose={toast.autoClose}
                  message={toast.message}
                  type={toast.type}
                  onRemove={removeToastHandler.bind(null, toast.id)}
                />
              );
            })}
          </div>,
          document.getElementById("root")
        )}
        <WrappedComponent {...props} toast={toast} />
      </>
    );
  };
};

export default withToast;
