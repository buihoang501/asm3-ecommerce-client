import React from "react";

//CSS module
import classes from "./OrdersPage.module.css";

//Order services
import { axiosGetUserOrders } from "../services/orderServices";

//Get auth token
import { getAuthToken } from "../utils/auth";

//React router dom
import { useLoaderData, Link } from "react-router-dom";

const OrdersPage = () => {
  //Data orders
  const { orders } = useLoaderData();

  return (
    <div className={classes.orders}>
      <div className={classes["orders-banner"]}>
        <h2>History</h2>
        <p>History</p>
      </div>
      <div className={classes["orders-container"]}>
        {orders.length === 0 && <p>You don't have any orders.</p>}
        {orders.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Id order</th>
                <th>Id user</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId._id}</td>
                    <td>{order.userId.fullName}</td>
                    <td>{order.userId.phoneNumber}</td>
                    <td>{order.userId.address}</td>
                    <td>
                      {new Intl.NumberFormat()
                        .format(order.totalPrice)
                        .replace(/,/g, ".") + "  VND"}
                    </td>
                    <td>{order.deliveryStatus}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      <Link to={order._id} className={classes.view}>
                        View <span>&#10137;</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

export const loader = async ({ request, params }) => {
  //Get token
  const token = getAuthToken();
  if (!token || token === "TOKEN EXPIRED") {
    return null;
  }
  //Get data
  const data = await axiosGetUserOrders(token);
  if (data) {
    return data;
  }

  return null;
};
