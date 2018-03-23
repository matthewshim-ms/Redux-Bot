const CartActions = require('./cartActions');
const DialogActions = require('./dialogActions');
const loadStore = require('./loadStore');

let session, store;

beforeEach(() => {
  session = {
    conversationData: {},
    save: jest.fn(),
    send: jest.fn()
  };

  store = loadStore(session);
});

test('"add burger" intent', () => {
  store.dispatch(DialogActions.receiveLuisIntent({
    intent: 'AddItem',
    entities: [{
      entity: 'burger',
      type: 'ItemName'
    }]
  }));

  expect(session.conversationData).toMatchSnapshot();
});
