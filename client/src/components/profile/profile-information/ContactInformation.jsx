import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { InputInformation } from "../profile-input/ProfileInput";
import { UilEnvelopeAlt, UilPhone } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/selectors";
import { validateEmail, validatePhone } from "../../../utils/validate";
import withUpdateUser from "../../../hoc/withUpdateUser";
import { checkInputIsValid } from "../../../utils/helper";

const ContactInformation = ({ isUpdate }, ref) => {
  const user = useSelector(getUser);

  const phoneRef = useRef();
  /* const emailRef = useRef(); */

  useImperativeHandle(ref, () => ({
    userData: {
      phoneRef,
      /* emailRef, */
    },
    setDefaultValue() {
      phoneRef.current.setValue(user.phone);
      /* emailRef.current.setValue(user.email); */
    },
    checkValid() {
      return checkInputIsValid(phoneRef);
    },
    focus() {
      phoneRef.current.focus();
    },
  }));

  return (
    <div className="flex flex-col items-center gap-y-2 w-full">
      {/* <InputInformation */}
      {/*   readOnly={!isUpdate} */}
      {/*   ref={emailRef} */}
      {/*   title="Email" */}
      {/*   type="email" */}
      {/*   icon={<UilEnvelopeAlt size="20" className="text-slate-400" />} */}
      {/*   validateFunction={validateEmail} */}
      {/*   errorText="Email is invalid!" */}
      {/* /> */}
      <InputInformation
        readOnly={!isUpdate}
        ref={phoneRef}
        title="Phone"
        icon={<UilPhone size="20" className="text-slate-400" />}
        validateFunction={validatePhone}
        errorText="Phone is invalid!"
      />
    </div>
  );
};

export default withUpdateUser(
  forwardRef(ContactInformation),
  "Contact Information"
);
