//Import createSlice  from redux toolkit
import { createSlice } from '@reduxjs/toolkit';

//Initilize product state
const initialProductState = {
  showProductPopup: false,

  product: null,
};

//Product Slice
const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    //Show Popup
    showPopup(state, action) {
      state.showProductPopup = true;
      state.product = action.payload;
    },
    //Hide Popup
    hidePopup(state, action) {
      state.showProductPopup = false;
      state.product = null;
    },
  },
});

//Export product actions
export const productActions = productSlice.actions;

//Export product slice.reducer
export default productSlice.reducer;
