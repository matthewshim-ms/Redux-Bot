import { CardAction } from 'botbuilder';

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

    case CardAction.DELETE_ITEM:
      state = { ...state, 
        items: [ ...state.items,
          actions.payload.text
        ]
      };

      break;

    case CardAction.UPDATE_ITEM:
      state = { ...state,
          items: [...state.items,
            actions.payload.text
          ]
      };
      
      break;

    case CardAction.CHECKOUT:
    state = { ...state,
      items: [...state.items,
        actions.payload.text
      ]

    }

    default: break;
  }

  return state;
}
