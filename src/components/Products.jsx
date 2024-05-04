import React from "react";
import ReactDOM from "react-dom";
//Import css module
import classes from "./Products.module.css";

//Import from react-router-dom
import { useRouteLoaderData, Link } from "react-router-dom";

//Import from react-redux
import { useDispatch, useSelector } from "react-redux";

//Import product actions
import { productActions } from "../store/product";
import Overlay from "./Overlay";
import ProductPopup from "./ProductPopup";

const Products = () => {
  //Get data  return from loader function
  const data = useRouteLoaderData("products");

  //dispatch
  const dispatch = useDispatch();

  //Select showProduct  state
  const showProductPopup = useSelector(
    (state) => state.product.showProductPopup
  ); //Select showProduct  state

  //Click product image handler
  const clickProductImgHandler = (product) => {
    //dispatch to  set showProduct is true
    dispatch(productActions.showPopup(product));
  };

  return (
    <div className={classes.products}>
      {/*Show overlay */}
      {showProductPopup &&
        ReactDOM.createPortal(<Overlay />, document.getElementById("over-lay"))}
      {/* Show product popup */}
      {showProductPopup &&
        ReactDOM.createPortal(
          <ProductPopup />,
          document.getElementById("popup")
        )}
      <p>Made the hard way</p>
      <h3>Top trending products</h3>
      <div className={classes.container}>
        {/*Check data and handle data  */}
        {data &&
          data.length > 0 &&
          data.slice(0, 8).map((product) => (
            <div key={product._id}>
              <img
                onClick={() => {
                  clickProductImgHandler(product);
                }}
                src={product.img1}
                alt="product_item"
              />
              <h3>{product.name}</h3>
              <p>
                {/*Handle currency formatting */}
                {new Intl.NumberFormat()
                  .format(product.price)
                  .replace(/,/g, ".") + " VND"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
