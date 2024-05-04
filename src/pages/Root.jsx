import React, { useEffect } from "react";
//React-dom
import ReactDOM from "react-dom";

//React-router-dom
import { Outlet, useLocation, useSubmit } from "react-router-dom";

//Import components
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";

//Import react-redux hooks
import { useDispatch } from "react-redux";

//Axios
import axios from "axios";

//Import auth actions
import { authActions } from "../store/auth";

//Import products actions
import { productActions } from "../store/product";

//Utilfuncs
import { getAuthToken, getTokenDuration } from "../utils/auth";
//Improt cart actions
import { cartActions } from "../store/cart";
import LiveChat from "../components/LiveChat";

const Root = () => {
  //isAuthenticated ,userName

  //submit
  const submit = useSubmit();

  //location object
  const location = useLocation();

  //dispatch
  const dispatch = useDispatch();

  //Handle navigation page
  useEffect(() => {
    //Hide popup
    dispatch(productActions.hidePopup());
    //Get userName from localStorage
    const userName = localStorage.getItem("userName");
    //Check cart from local Storage
    const listCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (listCart.length > 0) {
      //Dispatch to update cart
      dispatch(cartActions.updateCart(listCart));
    } else {
      //Empty cart state
      dispatch(cartActions.setEmptyCart());
    }

    //Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // token
    const token = getAuthToken();

    //If no token
    if (!token) {
      delete axios.defaults.headers.common["Authorization"];
      return;
    }
    //Token expired
    if (token === "TOKEN EXPIRED" || !userName) {
      submit(null, { action: "/logout", method: "post" });
      dispatch(authActions.onLogout());
      delete axios.defaults.headers.common["Authorization"];
      return;
    }
    //Token valid
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //Dispatch setAuth action
    dispatch(authActions.setAuth({ userName, token }));

    //Get token duration
    const tokenDuration = getTokenDuration();

    //Auto logout when token expired
    let timeoutId = setTimeout(() => {
      delete axios.defaults.headers.common["Authorization"];
      submit(null, { action: "/logout", method: "post" });
      dispatch(authActions.onLogout());
    }, tokenDuration);

    //Clean up function
    return () => {
      //Clear timeout
      clearTimeout(timeoutId);
    };
  }, [location.pathname, dispatch, submit]);

  return (
    <div>
      {/* Create portal to render live chat component*/}
      {ReactDOM.createPortal(
        <LiveChat />,
        document.getElementById("live-chat")
      )}

      {/* Render Main Navigation */}
      <MainNavigation />
      <main>
        {/* Render nested routes  */}
        <Outlet />
      </main>
      {/* Render Footer Component */}
      <Footer />
    </div>
  );
};

export default Root;
