import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InputInformation } from "../profile-input/ProfileInput";
import { UilKeySkeleton } from "@iconscout/react-unicons";
import withToast from "../../../hoc/withToast";
import withUpdateUser from "../../../hoc/withUpdateUser";
import { checkInputIsValid } from "../../../utils/helper";

const SecureInformation = ({ toast, isUpdate }, ref) => {
  const passwordRef = useRef();
  const currentPasswordRef = useRef();

  useImperativeHandle(ref, () => ({
    userData: {
      currentPasswordRef,
      passwordRef,
    },
    setDefaultValue() {
      currentPasswordRef.current.setValue(new Date().getTime());
      // password mouse when click on header
      passwordRef.current?.reset();
    },
    checkValid() {
      const isDuplicate =
        passwordRef.current?.value === currentPasswordRef.current.value;
      isDuplicate &&
        passwordRef.current?.value !== "" &&
        currentPasswordRef.current?.value !== "" &&
        toast.addToast({
          type: "error",
          message: "New password must not duplicate!",
        });
      return checkInputIsValid(passwordRef, currentPasswordRef) && !isDuplicate;
    },
    focus() {
      currentPasswordRef.current.focus();
      currentPasswordRef.current.reset();
    },
  }));

  return (
    <div className="flex flex-col items-center gap-y-2 text-primary w-full">
      <InputInformation
        readOnly={!isUpdate}
        ref={currentPasswordRef}
        title="Password"
        placeholder=""
        icon={<UilKeySkeleton className=" text-slate-400" size="20" />}
        type="password"
      />
      <AnimatePresence>
        {isUpdate && (
          <motion.div
            className="w-full flex justify-center"
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              stiffness: 100,
              type: "spring",
              damping: 8,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
          >
            <InputInformation
              ref={passwordRef}
              title="New Password"
              placeholder=""
              icon={<UilKeySkeleton className=" text-slate-400" size="20" />}
              type="password"
              validateFunction={(value) => value.trim().length >= 8}
              errorText="Password least 8 characters!"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default withToast(
  withUpdateUser(forwardRef(SecureInformation), "Secure Information")
);
