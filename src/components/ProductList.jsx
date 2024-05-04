import React from "react";

//Import css module
import classes from "./ProductList.module.css";
//Import from react-router-dom
import { useNavigate } from "react-router-dom";

//Import uuid
import { v4 as uuidv4 } from "uuid";

const ProductList = ({ data }) => {
  //navigate
  const navigate = useNavigate();

  // Click product list image  to navigate detail page
  const clickProductImgHandler = (product) => {
    navigate(`/detail/${product._id}`);
  };

  return (
    <div className={classes["product-list"]}>
      <div className={classes.container}>
        {/*Check data and handle data  */}
        {data &&
          data.length > 0 &&
          data.map((product) => (
            <div key={product._id + uuidv4()}>
              <img
                onClick={() => {
                  clickProductImgHandler(product);
                }}
                src={
                  product.img1.includes("firebase")
                    ? product.img1
                    : `${process.env.REACT_APP_BACKEND_API}/${product.img1}`
                }
                alt="product_item"
              />
              <h3>{product.name}</h3>
              <p>
                {/*Handle currency formatting */}
                {new Intl.NumberFormat()
                  .format(product.price)
                  .replace(/,/g, ".") + "  VND"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
