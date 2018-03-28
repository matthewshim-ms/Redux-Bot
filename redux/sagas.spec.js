const { default: createSagaMiddleware } = require('redux-saga');
const { applyMiddleware, createStore } = require('redux');
const DialogActions = require('./dialogActions');
const sagas = require('./sagas');

let store;

beforeEach(() => {
  const sagaMiddleware = createSagaMiddleware();

  store = createStore(s => s, applyMiddleware(sagaMiddleware));

  const originalDispatch = store.dispatch;

  store.dispatch = jest.fn(originalDispatch);

  const session = {
    conversationData: {},
    save: jest.fn(),
    send: jest.fn()
  };

  sagaMiddleware.run(sagas(session));
});

test('receive "AddItem" intent', async () => {
  store.dispatch({
    type: DialogActions.RECEIVE_LUIS_INTENT,
    payload: {
      intent: 'AddItem',
      entities: [{
        entity: 'burger',
        type: 'ItemName'
      }]
    }
  });

  console.log(store.dispatch.mock.calls);

  expect(store.dispatch).toHaveBeenCalledTimes(2);
});
