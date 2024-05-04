//Order API
import { ORDER_API } from "../api/api";

//Axios
import axios from "axios";

//React router dom
import { json, redirect } from "react-router-dom";

//Create Order
export const axiosCreateOrder = async (token, dataSend) => {
  try {
    //Axios call auth request
    const response = await axios.post(`${ORDER_API}/`, dataSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    //No response => exit logic
    if (!response && response.status !== 422) {
      return;
    }

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    //Get validation errors data
    if (error.response.status === 422 || error.response.status === 403) {
      return error.response.data;
    } else {
      //other errors
      console.log(error);
    }
  }
};

//Get current user orders
export const axiosGetUserOrders = async (token) => {
  try {
    //Axios Fetch Request
    const response = await axios.get(`${ORDER_API}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw json(
        { message: "Something went wrong when getting current user orders" },
        { status: 500 }
      );
    }

    return response.data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};

//Get current user detail order
export const axiosGetUserDetailOrder = async (token, orderId) => {
  try {
    //Axios Fetch Request
    const response = await axios.get(`${ORDER_API}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw json(
        {
          message:
            "Something went wrong when getting current user detail order.",
        },
        { status: 500 }
      );
    }

    return response.data;
  } catch (error) {
    //Direct when not found with orderId
    return redirect("/orders");
  }
};
