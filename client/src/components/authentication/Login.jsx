import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";
import Animation from "../../animation/Animation";
import withToast from "../../hoc/withToast";
import { itemAnimate, slideInFromRight } from "../../animation/models/index";
import { validateEmail, validateEmpty } from "../../utils/validate";
import { login, resetStatus } from "../../store/authen-slice";
import { getStatus } from "../../store/selectors";

const Login = withToast(({ toast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(getStatus);
  const iconSize = { fontSize: 22 };

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (status === "login/failed") {
      toast.addToast({
        message: "Login failed, invalid email or password!",
        type: "error",
      });
    } else if (status === "login/success") {
      navigate(location?.state?.from ?? "/");
    }
    if (status !== "login/pending" && status !== "idle") {
      dispatch(resetStatus());
    }
  }, [status, toast, dispatch, navigate, location?.state?.from]);

  function submitLogInHandler(event) {
    event.preventDefault();

    const email = emailRef.current;
    const password = passwordRef.current;

    if (email.isInValid || password.isInValid) {
      return;
    }

    dispatch(login({ email: email.value, password: password.value }));
  }

  return (
    <Animation animationCreator={slideInFromRight}>
      <section className="lg:pr-[100px] lg:pt-[100px] pt-[30%] sm:text-[1.4rem] ">
        <div className="md:mx-auto md:w-[80%] md:block sm:mx-[1rem] sm:items-center sm:w-auto h-full w-full flex flex-col justify-center items-end">
          <Animation animationCreator={itemAnimate.bind(null, 0)}>
            <h1 className="text-white text-3xl sm:text-[1.6rem] w-max font-[600] relative after:absolute after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-cyan-300 after:bottom-[5px] after:right-[9px] before:w-[6px] before:h-[60%] before:bg-white before:absolute before:bottom-[20px] before:right-[11px] before:rounded-[8px] pr-4">
              Welcome Back
            </h1>
          </Animation>
          <form
            onSubmit={submitLogInHandler}
            className="mt-5 flex flex-col lg:w-1/2 gap-y-3"
          >
            <Animation animationCreator={itemAnimate.bind(null, 0.1)}>
              <MyInput
                validationFunction={validateEmail}
                errorText="Email is not valid!"
                ref={emailRef}
                title="Email"
                type="email"
                icon={<MarkunreadOutlinedIcon sx={iconSize} />}
              />
            </Animation>
            <Animation animationCreator={itemAnimate.bind(null, 0.2)}>
              <MyInput
                validationFunction={validateEmpty}
                errorText="Password is not empty!"
                ref={passwordRef}
                title="Password"
                type="password"
                icon={<RemoveRedEyeOutlinedIcon sx={iconSize} />}
              />
            </Animation>
            <Animation animationCreator={itemAnimate.bind(null, 0.3)}>
              <div className="ml-2 flex  justify-between">
                <span className="text-[16px] text-white">
                  <span>Don't have account?</span>
                  <Link
                    to="/auth/register"
                    className="text-cyan-400 cursor-pointer"
                  >
                    {" "}
                    Register
                  </Link>
                </span>
              </div>
            </Animation>
            <Animation animationCreator={itemAnimate.bind(null, 0.4)}>
              <div className="mt-5 w-full">
                <MyButton
                  title="Continue"
                  bgColor="bg-blue-500"
                  textColor="text-white"
                  width="w-full"
                  disabled={status === "login/pending"}
                />
              </div>
            </Animation>
          </form>
        </div>
      </section>
    </Animation>
  );
});

export default Login;
