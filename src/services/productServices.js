//Product API
import { PRODUCT_API } from "../api/api";
//Axios
import axios from "axios";
//React router dom
import { json } from "react-router-dom";

//Get all products hompage Client
export const axiosGetProducts = async () => {
  try {
    //Axios Fetch Request
    const response = await axios.get(`${PRODUCT_API}`);

    if (!response) {
      throw json(
        { message: "Something went wrong when getting products" },
        { status: 500 }
      );
    }

    return response.data.products;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};

//Get product detail page Client
export const axiosGetProductDetail = async (productId) => {
  try {
    //Axios Fetch Request
    const response = await axios.get(`${PRODUCT_API}/${productId}`);

    if (!response) {
      throw json(
        { message: "Something went wrong when getting product detail" },
        { status: 500 }
      );
    }

    return response.data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};

//Get products cart info Client
export const axiosGetProductsInCart = async (dataSend) => {
  try {
    //Axios Fetch Request
    const response = await axios.post(
      `${PRODUCT_API}/products-cart`,
      dataSend,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response) {
      throw json(
        { message: "Something went wrong when getting product detail" },
        { status: 500 }
      );
    }

    return response.data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};
