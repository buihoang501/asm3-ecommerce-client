import React, { useState, useEffect } from "react";

//CSS module
import classes from "./AuthForm.module.css";

//React-redux hooks
import { useDispatch } from "react-redux";

//Auth actions
import { authActions } from "../store/auth";

//Auth Service
import { axiosAuthRequest } from "../services/authServices";

//React-router-dom
import { Link, useNavigate, Form, useActionData } from "react-router-dom";

const AuthForm = ({ login }) => {
  //navigate
  const navigate = useNavigate();

  //Dispatch
  const dispatch = useDispatch();

  // get data response from call API
  const data = useActionData();

  //Email Errors
  const emailErrors = data?.errors?.filter((error) => error.path === "email");

  //Full Name Errors
  const fullNameErrors = data?.errors?.filter(
    (error) => error.path === "fullName"
  );

  //Password Errors
  const passwordErrors = data?.errors?.filter(
    (error) => error.path === "password"
  );

  //PhoneNumber Errors
  const phoneNumberErrors = data?.errors?.filter(
    (error) => error.path === "phoneNumber"
  );
  useEffect(() => {
    //Validation success
    if (data?.token && data?.userName) {
      //set token to localStorage
      localStorage.setItem("token", data?.token);
      //create expiration time
      const expiration = new Date();
      //set expiration time to localStorage
      expiration.setHours(expiration.getHours() + 3);
      localStorage.setItem("expiration", expiration);
      //Set userName to LocalStorage
      localStorage.setItem("userName", data?.userName);

      //Dispatch set Auth
      dispatch(
        authActions.setAuth({ token: data?.token, userName: data?.userName })
      );

      //Get redirect
      const redirect = localStorage.getItem("redirect");
      //Redirect to save page /homepage
      if (redirect) {
        localStorage.removeItem("redirect");
        return navigate(`/${redirect}`);
      } else {
        return navigate("/");
      }
    }
  }, [data?.token, data?.userName, dispatch, navigate]);

  //auth data state
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  //Input change handler func
  const inputChangeHandler = (e) => {
    //Set state value change
    setAuthData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className={classes.auth}>
      <div className={classes.container}>
        <Form
          method="post"
          action={login ? "/login" : "/signup"}
          className={classes["auth-form"]}
          noValidate
        >
          <div className={classes["form-group"]}>
            <h1>{login ? "Sign In" : "Sign Up"}</h1>
            {data?.errors?.length > 0 && (
              <div className={classes["error-container"]}>
                {fullNameErrors?.length > 0 && <p>{fullNameErrors[0].msg}</p>}
                {emailErrors?.length > 0 && <p>{emailErrors[0].msg}</p>}
                {phoneNumberErrors?.length > 0 && (
                  <p>{phoneNumberErrors[0].msg}</p>
                )}
                {passwordErrors?.length > 0 && <p>{passwordErrors[0].msg}</p>}
              </div>
            )}

            <>
              {!login && (
                <input
                  value={authData.name}
                  onChange={inputChangeHandler}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                />
              )}

              <input
                value={authData.email}
                onChange={inputChangeHandler}
                type="email"
                name="email"
                placeholder="Email"
              />
              <input
                value={authData.password}
                onChange={inputChangeHandler}
                type="password"
                name="password"
                placeholder="Password"
              />
              {!login && (
                <input
                  value={authData.phone}
                  onChange={inputChangeHandler}
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                />
              )}
            </>
          </div>
          <button type="Submit">{login ? "Sign in" : "Sign up"}</button>
          <p className={classes.link}>
            {login ? "Create an account? " : "Login? "}
            <Link to={login ? "/signup" : "/login"}>
              {login ? "Sign up" : "Click"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;

export const action = async ({ request, params }) => {
  //Form Data
  const data = await request.formData();
  //Pathame
  const pathname = window.location.href.includes("/login") ? "login" : "signup";
  //Data send
  const dataSend = {
    fullName: data.get("name") ? data.get("name") : undefined,
    email: data.get("email"),
    phoneNumber: data.get("phone") ? data.get("phone") : undefined,
    password: data.get("password"),
  };
  //Call auth reuqest
  const responseData = await axiosAuthRequest(pathname, dataSend);
  if (responseData) {
    return responseData;
  }
  return null;
};
