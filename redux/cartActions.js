const ADD_ITEM = 'CART/ADD_ITEM';
const DELETE_ITEM = 'CART/DELETE_ITEM';
const VIEW_CART = 'CART/VIEW_CART';

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

function viewCart() {
  return { type: VIEW_CART };
}

module.exports = {
  ADD_ITEM,
  DELETE_ITEM,
  VIEW_CART,

  addItem,
  deleteItem,
  viewCart
};
