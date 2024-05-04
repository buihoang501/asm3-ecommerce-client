import React, { useState, useEffect } from "react";

//Import css module
import classes from "./DetailPage.module.css";

//Import uuid
import { v4 as uuidv4 } from "uuid";

//Import from react-router-dom
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

//Import cart actions
import { cartActions } from "../store/cart";

//Import from react-redux
import { useDispatch } from "react-redux";

//Product services
import { axiosGetProductDetail } from "../services/productServices";

//Socket io
import socket from "../utils/socket-io";

const DetailPage = () => {
  //dispatch
  const dispatch = useDispatch();

  // const cartList = useSelector((state) => state.cart.listCart);

  //location
  const location = useLocation();

  //navigate
  const navigate = useNavigate();

  //Get product detail and related products
  const { product: productLoader, relatedProducts } = useLoaderData();

  const [product, setProduct] = useState(null);

  //Quantity state
  const [quantity, setQuantity] = useState(1);

  //Side effect handler
  useEffect(() => {
    setQuantity(1);
    //Current product
    setProduct(productLoader);
  }, [location.pathname]);

  useEffect(() => {
    //Handle data
    const handleData = (data) => {
      if (data.action === "PRODUCT") {
        setProduct(data.product);
      }
    };

    socket.on("product", handleData);

    return () => {
      socket.off("product", handleData);
    };
  }, []);

  // Click product list image  to navigate detail page
  const clickProductImgHandler = (product) => {
    //navigate

    navigate(`/detail/${product._id}`);
    // setProduct(product);
  };

  //Increment quantity handler
  const incrementHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  //Decrement quantity handler
  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  //Add cart click handler
  const addCartClickHandler = (cartItem) => {
    //When out of stock
    if (product?.stock === undefined || product?.stock < 1) {
      alert("Sorry this product is out of stock! Please buy another product");
      return;
    }
    //Get cart from localStorage
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    //Find productIn cart

    const productInCart =
      cart?.length > 0 &&
      cart.find((cartProduct) => cartProduct?.id === cartItem?.id);

    const productInCartQuantity = +productInCart?.quantity || 0;

    //When exceeded quantity
    if (product?.stock < cartItem?.quantity + productInCartQuantity) {
      alert(
        `Exeeded quantity stock or quantity in cart is full! ${product?.stock}`
      );
      return;
    }
    //Dispatch to add to cartList
    dispatch(cartActions.addCart(cartItem));
  };

  return (
    <div className={classes.detail}>
      {product && (
        <React.Fragment>
          <div className={classes.main}>
            <div className={classes.left}>
              <div className={classes.one}>
                <img
                  src={
                    product.img1.includes("firebase")
                      ? product.img1
                      : `${process.env.REACT_APP_BACKEND_API}/${product.img1}`
                  }
                  alt={product.name}
                />
                <img
                  src={
                    product.img2.includes("firebase")
                      ? product.img2
                      : `${process.env.REACT_APP_BACKEND_API}/${product.img2}`
                  }
                  alt={product.name}
                />
                <img
                  src={
                    product.img3.includes("firebase")
                      ? product.img3
                      : `${process.env.REACT_APP_BACKEND_API}/${product.img3}`
                  }
                  alt={product.name}
                />
                <img
                  src={
                    product.img4.includes("firebase")
                      ? product.img4
                      : `${process.env.REACT_APP_BACKEND_API}/${product.img4}`
                  }
                  alt={product.name}
                />
              </div>
              <div className={classes.four}>
                <img
                  src={
                    product.img4.includes("firebase")
                      ? product.img4
                      : `${process.env.REACT_APP_BACKEND_API}/${product.img4}`
                  }
                  alt={product.name}
                />
              </div>
            </div>
            <div className={classes.right}>
              <h2>{product.name}</h2>
              <h3>
                {/*Handle currency formatting */}
                {new Intl.NumberFormat()
                  .format(product.price)
                  .replace(/,/g, ".") + " VND"}
              </h3>
              <p>{product.short_desc}</p>
              <h4>
                Category: <span>{product.category}</span>{" "}
              </h4>
              <div className={classes.stock}>
                <span>Stock</span>
                <span> : </span>
                <span
                  className={
                    product?.stock > 0
                      ? `${classes.normal}`
                      : `${classes["out-of-stock"]}`
                  }
                >
                  {product?.stock > 0 ? product?.stock : "Out of stock!"}
                </span>
              </div>

              <div className={classes.quantity}>
                <span>Quantity</span>
                <span style={{ cursor: "pointer" }} onClick={decrementHandler}>
                  <i className="fa-sharp fa-solid fa-caret-left"></i>
                </span>
                <span className={classes.number}>{quantity}</span>
                <span style={{ cursor: "pointer" }} onClick={incrementHandler}>
                  <i className="fa-sharp fa-solid fa-caret-right"></i>
                </span>
                <button
                  onClick={() => {
                    addCartClickHandler({
                      quantity: quantity,
                      id: product._id,
                      name: product.name,
                      img: product.img1,
                      price: product.price,
                    });
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className={classes.description}>
        <button>Description</button>
        <h3>Product Description</h3>
        {/* Handle string with  long_desc property */}
        {product &&
          product.long_desc
            .split("\n")
            .map((text) => <p key={uuidv4()}>{text}</p>)}
      </div>
      <div className={classes["related-products"]}>
        <h3>Related products</h3>
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            {/* Map through relatedProducts array */}
            {relatedProducts.map((product) => (
              <div key={product._id}>
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
        )}
        {relatedProducts.length === 0 && <p>No related product found!</p>}
      </div>
    </div>
  );
};

export default DetailPage;

export const loader = async ({ request, params }) => {
  //ProductId
  const { productId } = params;

  const response = await axiosGetProductDetail(productId);
  if (response) {
    return response;
  }
  return null;
};
