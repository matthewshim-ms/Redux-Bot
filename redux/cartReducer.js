const CartActions = require('./cartActions');

const DEFAULT_STATE = {
  items: []
};

module.exports = function cart(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CartActions.ADD_ITEM:
      state = { ...state,
        items: [ ...state.items,
          action.payload.text
        ]
      };

      break;

    default: break;
  }

  return state;
}
