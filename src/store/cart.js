//Import  from  @redux toolkit
import { createSlice } from "@reduxjs/toolkit";

//initialize cart state
const initialCartState = {
  listCart: [],
};

//Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addCart(state, action) {
      //Find cartItem  exist index
      const cartItemExistIndex = state.listCart.findIndex(
        (cart) => cart.id === action.payload.id
      );
      //No exist in cart
      if (cartItemExistIndex === -1) {
        //Add to list cart
        state.listCart = [...state.listCart, action.payload];

        //Save list cart into local storage
        localStorage.setItem("cart", JSON.stringify(state.listCart));
      }
      //Check exist
      else {
        //Add quantity
        state.listCart[cartItemExistIndex].quantity =
          state.listCart[cartItemExistIndex].quantity + action.payload.quantity;

        //Save list cart into local storage
        localStorage.setItem("cart", JSON.stringify(state.listCart));
      }
    },
    updateCart(state, action) {
      //get id array from payload
      const payloadIdArr = action.payload?.map((item) => item.id);

      //Find Cart Exist
      const findCartExist = state.listCart.find((cart) =>
        payloadIdArr.includes(cart.id)
      );

      //Check if exist
      if (findCartExist) {
        //Exit
        return;
      } // Non exist
      else {
        state.listCart = [...state.listCart, ...action.payload];
      }
    },
    incrementCartQuantity(state, action) {
      //Find Cart Exist Index
      const findCartExistIndex = state.listCart.findIndex(
        (cart) => cart.id === action.payload.id
      );

      //If exist
      if (findCartExistIndex !== -1) {
        //increase  one
        state.listCart[findCartExistIndex].quantity += 1;

        //save cart list to localstorage
        localStorage.setItem("cart", JSON.stringify(state.listCart));
      } else {
        return;
      }
    },
    decrementCartQuantity(state, action) {
      //Find Cart Exist Index
      const findCartExistIndex = state.listCart.findIndex(
        (cart) => cart.id === action.payload.id
      );

      //If exist and check if quantity >1
      if (
        findCartExistIndex !== -1 &&
        state.listCart[findCartExistIndex].quantity > 1
      ) {
        //derement  one
        state.listCart[findCartExistIndex].quantity -= 1;
        //save cart list to localstorage
        localStorage.setItem("cart", JSON.stringify(state.listCart));
      } else {
        return;
      }
    },
    deleteCart(state, action) {
      //filter to delete cart
      state.listCart = state.listCart.filter(
        (cart) => cart.id !== action.payload
      );
      //save cart list to localstorage
      localStorage.setItem("cart", JSON.stringify(state.listCart));
    },
    setEmptyCart(state) {
      state.listCart = [];
    },
  },
});

//Export cart actions
export const cartActions = cartSlice.actions;

//Export cart slice reducer
export default cartSlice.reducer;
