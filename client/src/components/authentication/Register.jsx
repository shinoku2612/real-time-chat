import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";
import Animation from "../../animation/Animation";
import withToast from "../../hoc/withToast";
import { register, resetStatus } from "../../store/authen-slice";
import { getStatus } from "../../store/selectors";
import { itemAnimate, slideInFromLeft } from "../../animation/models/index";
import {
  validatePassword,
  validateEmail,
  validateEmpty,
} from "../../utils/validate";
import { Link } from "react-router-dom";
import ComingSoon from "../ui/error/ComingSoon";
import withModal from "../../hoc/withModal";

const Register = withToast(({ toast, modal }) => {
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === "register/success") {
      toast.addToast({
        type: "success",
        message: "Create new account successfully!",
      });
      dispatch(resetStatus());
    }
    if (status === "register/failed") {
      toast.addToast({
        type: "error",
        message: "Your email is exist account!",
      });
      dispatch(resetStatus());
    }
  }, [status, toast, dispatch]);

  function submitRegisterHandler(event) {
    event.preventDefault();

    const firstName = firstNameRef.current;
    const lastName = lastNameRef.current;
    const email = emailRef.current;
    const password = passwordRef.current;

    if (
      firstName.isInValid ||
      lastName.isInValid ||
      email.isInValid ||
      password.isInValid
    ) {
      return;
    }

    dispatch(
      register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      })
    );
  }

  function changeMethodHandler() {
    modal.open();
  }

  return (
    <Animation animationCreator={slideInFromLeft}>
      <section className="lg:pt-[50px] pt-[30%] lg:ml-[100px] h-full flex flex-col justify-center w-full sm:mx-[1rem] sm:w-auto sm:text-[1.4rem]">
        <div className="md:mx-auto">
          <Animation animationCreator={itemAnimate.bind(null, 0)}>
            <h1 className="sm:text-[1.2rem] text-white w-max text-3xl font-[600] relative after:w-[10px] after:h-[10px] after:absolute after:rounded-[50%] after:bottom-1 after:right-[-10px] after:bg-cyan-300">
              Create new Account
            </h1>
          </Animation>
          <Animation animationCreator={itemAnimate.bind(null, 0.1)}>
            <span className="text-[16px] py-1.5">
              <span className="tracking-wider text-white after:content-[test]">
                Already a member?
              </span>
              <Link
                to="/auth/login"
                className="cursor-pointer no-underline text-cyan-300"
              >
                {" "}
                Login
              </Link>
            </span>
          </Animation>
          <form
            onSubmit={submitRegisterHandler}
            className="mt-5 flex flex-col lg:w-1/2 gap-y-3"
          >
            <div className="w-full flex gap-x-3">
              <div className="basis-1/2">
                <Animation
                  animationCreator={itemAnimate.bind(null, 0.2)}
                  className="basis-1/2"
                >
                  <MyInput
                    ref={firstNameRef}
                    validationFunction={validateEmpty}
                    errorText="First name is not empty!"
                    title="First name"
                    icon={<FeedOutlinedIcon sx={{ fontSize: 22 }} />}
                  />
                </Animation>
              </div>
              <div className="basis-1/2">
                <Animation
                  animationCreator={itemAnimate.bind(null, 0.3)}
                  className="basis-1/2"
                >
                  <MyInput
                    ref={lastNameRef}
                    validationFunction={validateEmpty}
                    errorText="Last name is not empty!"
                    title="Last name"
                    icon={<FeedOutlinedIcon sx={{ fontSize: 22 }} />}
                  />
                </Animation>
              </div>
            </div>
            <Animation animationCreator={itemAnimate.bind(null, 0.4)}>
              <MyInput
                ref={emailRef}
                validationFunction={validateEmail}
                errorText="Email is invalid!"
                title="Email"
                type="email"
                icon={<MarkunreadOutlinedIcon sx={{ fontSize: 22 }} />}
              />
            </Animation>
            <Animation animationCreator={itemAnimate.bind(null, 0.5)}>
              <MyInput
                ref={passwordRef}
                validationFunction={validatePassword}
                errorText="Password least 8 characters, 1 upper, 1 lower, 1 number, 1 special character!"
                title="Password"
                type="password"
                icon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 22 }} />}
              />
            </Animation>
            <Animation animationCreator={itemAnimate.bind(null, 0.6)}>
              <div className="flex gap-x-5 mt-2">
                <MyButton
                  title="Change method"
                  bgColor="bg-gray-500"
                  textColor="text-white"
                  width="w-1/2"
                  onClick={changeMethodHandler}
                  type="button"
                  disabled={status === "register/pending"}
                />
                <MyButton
                  title="Create account"
                  bgColor="bg-blue-500"
                  textColor="text-white"
                  width="w-1/2"
                  disabled={status === "register/pending"}
                />
              </div>
            </Animation>
          </form>
        </div>
      </section>
    </Animation>
  );
});

export default withModal(Register, ComingSoon);
