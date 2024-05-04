import React from "react";

//Import components
import Banner from "../components/Banner";
import Category from "../components/Category";

//Import from react-router
import Products from "../components/Products";
import OthersInfo from "../components/OthersInfo";

//Product Service
import { axiosGetProducts } from "../services/productServices";

const HomePage = () => {
  return (
    <React.Fragment>
      {/*Render Banner Component */}
      <Banner />
      {/*Render Category Component */}
      <Category />
      {/*Render Products Component */}
      <Products />
      {/*Render Others Info Component */}
      <OthersInfo />
    </React.Fragment>
  );
};

export default HomePage;
export const loader = async () => {
  const response = axiosGetProducts();
  if (response) {
    return response;
  }
  return null;
};
