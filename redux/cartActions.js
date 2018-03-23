const ADD_ITEM = 'CART/ADD_ITEM';
const DELETE_ITEM = 'CART/DELETE_ITEM';
const VIEW_CART = 'CART/VIEW_CART';
const UPDATE_ITEM = 'CART/UPDATE_ITEM';
const CHECKOUT = 'CART/CHECKOUT';

function addItem(text) {
  return {
    type: ADD_ITEM,
    payload: { text }
  };
}

function deleteItem(text) {
  return {
    type: DELETE_ITEM,
    payload: { text }
  };
}

function updateItem(text){
  return {
    type: UPDATE_ITEM,
    payload: { text}
  };
}

function viewCart() {
  return { type: VIEW_CART };
}

function checkout(){
  return { type: CHECKOUT };
}

module.exports = {
  ADD_ITEM,
  DELETE_ITEM,
  VIEW_CART,
  UPDATE_ITEM,
  CHECKOUT,

  addItem,
  deleteItem,
  viewCart,
  updateItem,
  checkout
};
