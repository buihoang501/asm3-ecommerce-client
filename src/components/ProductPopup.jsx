import React from "react";

//Import css module
import classes from "./ProductPopup.module.css";

//Import from react-redux
import { useSelector, useDispatch } from "react-redux";

//Import Product actions
import { productActions } from "../store/product";

//Import from react-router-dom
import { useNavigate } from "react-router-dom";

const ProductPopUp = () => {
  //navigate
  const navigate = useNavigate();

  //get productItem from store
  const productItem = useSelector((state) => state.product.product);
  //dispatch
  const dispatch = useDispatch();

  //Click x hide popup
  const hideClickHandler = () => {
    //dispatch to set hide popup
    dispatch(productActions.hidePopup());
  };

  //View detail product click
  const viewDetailHandler = () => {
    navigate(`/detail/${productItem._id}`);
  };

  return (
    <div className={classes.popup}>
      <div className={classes.container}>
        <div onClick={hideClickHandler} className={classes.hide}>
          &times;
        </div>

        <div>
          <img src={productItem.img1} alt="product-item" />
        </div>

        <div>
          <h3>{productItem.name}</h3>
          <h4>
            {/*Handle currency formatting */}
            {new Intl.NumberFormat()
              .format(productItem.price)
              .replace(/,/g, ".") + " VND"}
          </h4>
          <p>{productItem.short_desc}</p>
          <button onClick={viewDetailHandler}>
            <i className="fa-solid fa-cart-shopping"></i>View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopUp;
