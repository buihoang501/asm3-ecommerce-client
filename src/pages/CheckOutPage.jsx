import React, { useMemo } from "react";

//Import css module
import classes from "./CheckOutPage.module.css";

//Import from react-redux
import { useSelector } from "react-redux";

//Auth services
import { axiosGetCurrentUser } from "../services/authServices";

//Order services
import { axiosCreateOrder } from "../services/orderServices";
//React router dom
import {
  useLoaderData,
  useActionData,
  Navigate,
  Form,
  redirect,
} from "react-router-dom";

//Utils
import { getAuthToken } from "../utils/auth";

const CheckOutPage = () => {
  //data loader
  const data = useLoaderData();

  //action data
  const actionData = useActionData();

  //Address errors
  const addressErrors = actionData?.errors?.filter(
    (error) => error.path === "address"
  );

  const listCart = useSelector((state) => state.cart.listCart);

  //Select list cart state
  //Total cart price
  const checkoutTotalPrice = useMemo(() => {
    return listCart.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }, [listCart]);
  //If no product in cart
  if (
    JSON.parse(localStorage.getItem("cart")) &&
    JSON.parse(localStorage.getItem("cart")).length === 0
  ) {
    alert(
      "Please add at least one product to cart before accessing this page."
    );
    return <Navigate to="/shop" />;
  }

  return (
    <div className={classes.checkout}>
      <div className={classes["checkout-banner"]}>
        <h2>Checkout</h2>
        <div>
          <h3>Home /</h3>
          <h3> Cart /</h3>
          <p> Checkout</p>
        </div>
      </div>
      <h3>Billing details</h3>
      <div className={classes.container}>
        <div className={classes.left}>
          <Form action="/checkout" method="post">
            <div className={classes["form-control"]}>
              <label>Full name:</label>
              <input
                defaultValue={data?.user?.fullName}
                readOnly
                name="name"
                type="text"
                placeholder="Enter Your Full Name Here!"
              />
            </div>

            <div className={classes["form-control"]}>
              <label>Email:</label>
              <input
                defaultValue={data?.user?.email}
                type="email"
                readOnly
                name="email"
                placeholder="Enter Your Email Here!"
              />
            </div>
            <div className={classes["form-control"]}>
              <label>Phone Number:</label>
              <input
                type="text"
                defaultValue={data?.user?.phoneNumber}
                readOnly
                name="phoneNumber"
                placeholder="Enter Your Phone Number Here!"
              />
            </div>

            <div className={classes["form-control"]}>
              <label>Address:</label>
              {addressErrors && addressErrors.length > 0 && (
                <p className={classes.error}>{addressErrors[0].msg}</p>
              )}
              <input
                type="text"
                name="address"
                defaultValue={data.user.address}
                placeholder="Enter Your Adress Here!"
              />
            </div>

            <input type="hidden" name="totalPrice" value={checkoutTotalPrice} />
            <div>
              <button type="submit">Place order</button>
            </div>
          </Form>
        </div>
        <div className={classes.right}>
          <div className={classes.wrapper}>
            <h2>Your Order</h2>

            {/* Loop through and render from list cart */}
            {listCart &&
              listCart.length > 0 &&
              listCart.map((cart) => {
                return (
                  <div key={cart.id} className={classes["item-order"]}>
                    <h3>{cart.name.substring(0, 20)}</h3>
                    <p>
                      {" "}
                      {/*Handle currency formatting */}
                      {new Intl.NumberFormat()
                        .format(cart.price)
                        .replace(/,/g, ".") + ` VND x ${cart.quantity}`}
                    </p>
                  </div>
                );
              })}

            <div className={classes.total}>
              <h3>Total</h3>
              <p>
                {/* Handle total price */}

                {new Intl.NumberFormat()
                  .format(checkoutTotalPrice)
                  .replace(/,/g, ".") + "  VND"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;

export const loader = async ({ request, params }) => {
  //Get token
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") {
    return null;
  }
  //Get data from call api
  const data = await axiosGetCurrentUser(token);
  if (data) {
    return data;
  }
  return null;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  //Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart"));

  //Data send
  const dataSend = {
    address: formData.get("address"),
    cart: cart,
    totalPrice: formData.get("totalPrice"),
  };

  //Get token
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") {
    return null;
  }
  //Call API
  const data = await axiosCreateOrder(token, dataSend);
  if (data) {
    //Fail with stock case
    if (data?.message === "Quantity exceeded product quantity in stock!") {
      alert(`${data?.message} Please tweak quantity in cart`);
      return null;
    }

    //Success case
    if (data?.message) {
      localStorage.removeItem("cart");

      alert("You order successfully");
      return redirect("/orders");
    }

    return data;
  }
  //formData
  return null;
};
