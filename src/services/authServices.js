//Auth API
import { AUTH_API } from "../api/api";

//Import axios
import axios from "axios";
//React router dom
import { json } from "react-router-dom";

//Login / Signup API
export const axiosAuthRequest = async (pathname, dataSend) => {
  try {
    //Axios call auth request
    const response = await axios.post(`${AUTH_API}/${pathname}`, dataSend);
    //No response => exit logic
    if (!response && response.status !== 422) {
      return;
    }

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    //Get validation errors data
    if (error.response.status === 422) {
      return error.response.data;
    } else {
      //other errors
      console.log(error);
    }
  }
};

//Get current user
export const axiosGetCurrentUser = async (token) => {
  try {
    //Axios Fetch Request
    const response = await axios.get(`${AUTH_API}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw json(
        { message: "Something went wrong when getting current user info" },
        { status: 500 }
      );
    }

    return response.data;
  } catch (error) {
    throw json({ message: error.message }, { status: error.status });
  }
};
