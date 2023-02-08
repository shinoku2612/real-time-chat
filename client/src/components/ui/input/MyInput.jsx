import { useImperativeHandle, useId, useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { UilEyeSlash } from "@iconscout/react-unicons";
import useInput from "../../../hooks/useInput";
import ErrorMessage from "../../ui/error/ErrorMessage";

export const InputInformation = forwardRef(
  ({ icon, type, title, width, placeholder, validateFn, errorText }, ref) => {
    const {
      state: { value, isValid, isInValid },
      actions: { onChange, onBlur, reset, setValue },
    } = useInput(validateFn);

    useImperativeHandle(ref, () => ({
      value,
      isValid,
      isInValid,
      reset,
      blur: onBlur,
      setValue,
    }));

    const id = useId();
    return (
      <>
        <div
          className={`w-${
            width ?? "full"
          } rounded-md bg-transparent px-2 py-1 border border-slate-300`}
        >
          <div className="flex flex-col w-full">
            <label className="text-[12px] opacity-50" htmlFor={id}>
              {title}
            </label>
            <input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              required
              placeholder={placeholder}
              className="text-[16px] text-slate-600 outline-none border-none bg-transparent w-full font-[500] placeholder:font-normal placeholder:text-[14px] placeholder:pl-2"
              id={id}
              type={type ?? "text"}
            />
          </div>
          <div className="opacity-50">{icon}</div>
        </div>
        <ErrorMessage
          message={errorText ?? "Input is invalid!"}
          isShow={isInValid}
        />
      </>
    );
  }
);

const MyInput = forwardRef((props, ref) => {
  const {
    state: { value, isValid, isInValid },
    actions: { onChange, onBlur, reset, setValue },
  } = useInput(props.validationFunction);

  useImperativeHandle(ref, () => ({
    value,
    isValid,
    isInValid,
    reset,
    blur: onBlur,
    setValue,
  }));

  const id = useId();
  const [isPassword, togglePassword] = useState(props.type === "password");
  const fieldIsPassword = isPassword && props.type === "password";

  const passwordAnimate = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  };

  function togglePasswordHandler() {
    if (props.type === "password") togglePassword((prevState) => !prevState);
  }

  return (
    <>
      <motion.div
        className={`flex items-center rounded-[18px] px-4 pt-1 pb-1.5 text-[18px] bg-gray-700 text-white border border-transparent border-solid focus-within:border-blue-800 shadow-[0_0_3px_2px_transparent] focus-within:shadow-blue-500 ${props.className}`}
      >
        <div className="flex flex-col w-full">
          <label className="text-[12px]  opacity-50" htmlFor={id}>
            {props.title}
          </label>
          <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required
            placeholder={props.placeholder}
            className="block outline-none border-none bg-transparent w-full font-[500] opacity-100 text-white"
            id={id}
            type={fieldIsPassword ? "password" : "text"}
          />
        </div>
        <div
          onClick={togglePasswordHandler}
          className={`opacity-50 ${
            props.type === "password" ? "cursor-pointer" : ""
          }`}
        >
          {!isPassword && (
            <motion.div {...passwordAnimate}>{props.icon}</motion.div>
          )}
          {isPassword && (
            <motion.div {...passwordAnimate}>
              <UilEyeSlash size={22} />
            </motion.div>
          )}
        </div>
      </motion.div>
      <ErrorMessage
        message={props.errorText ?? "Input is invalid!"}
        isShow={isInValid}
      />
    </>
  );
});

export const InputRadio = ({ list, width, title }) => {
  return (
    <div
      className={`w-${
        width ?? "full"
      } rounded-md bg-transparent px-2 py-1 border border-slate-300 gap-y-2 flex flex-col`}
    >
      <span className="text-[14px] text-slate-400">{title}</span>
      {list.map((item) => (
        <div className="cursor-pointer flex w-full flex-col border border-slate-400 rounded-md px-2 py-0.5">
          <motion.label
            whileInView={{
              color: "blue",
              fontWeight: "bold",
            }}
            className=" select-none cursor-pointer text-[12px]  opacity-50 basis-1/3"
            htmlFor={item.title}
          >
            {item.title}
          </motion.label>
          <input
            required
            className="cursor-pointer text-[16px] text-slate-600 outline-none border-none bg-transparent w-full font-[500]"
            id={item.title}
            type="radio"
          />
        </div>
      ))}
    </div>
  );
};

export const InputArea = ({ width, rows, title, placeholder }) => {
  const id = useId();
  return (
    <div
      className={`w-${
        width ?? "full"
      } rounded-md bg-transparent px-2 py-1 border border-slate-300 flex flex-col`}
    >
      <label className="text-[12px]  opacity-50 basis-1/3" htmlFor={id}>
        {title}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="placeholder:text-[14px] placeholder:pl-2 placeholder:font-normal text-[16px] text-slate-600 outline-none border-none bg-transparent w-full font-[500] resize-none"
        id={id}
        type="radio"
      />
    </div>
  );
};

export default MyInput;
