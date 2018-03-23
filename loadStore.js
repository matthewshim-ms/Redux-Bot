const { applyMiddleware, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { call, put, select, takeEvery, takeLatest } = require('redux-saga/effects');

const Actions = require('./actions');

const DEFAULT_STATE = {
  cart: []
};

function reducer(state = DEFAULT_STATE, action) {
  console.log('--- RECEIVED ACTION ---');
  console.log(action);

  switch (action.type) {
    case Actions.ADD_ITEM:
      state = { ...state,
        cart: [ ...state.cart,
          action.payload.text
        ]
      };

      break;

    default: break;
  }

  return state;
}

module.exports = function loadStore(session) {
  const { id } = session.message.address;

  const saga = createSagaMiddleware();

  // TODO: Load store using "id"
  const store = createStore(reducer, applyMiddleware(
    saga
  ));

  store.subscribe(() => {
    session.send({
      type: 'event',
      name: 'store',
      value: store.getState()
    });
  });

  saga.run(function* () {
    yield takeEvery(Actions.RECEIVE_MESSAGE, action => {
      console.log('I RECEIVED A USER MESSAGE');
    });

    // yield takeEvery(Actions.SEND_EVENT, action => {
    //   const { name, value } = action.payload;

    //   session.send({
    //     type: 'event',
    //     name,
    //     value
    //   });
    // });

    yield takeEvery(Actions.SEND_MESSAGE, action => {
      session.send(action.payload.text);
    });

    yield takeEvery(Actions.END_DIALOG, () => {
      session.endDialog();
    });

    yield takeEvery(Actions.EXPORT_STORE, function* () {
      const store = yield select();

      yield put(Actions.sendEvent('store', store));
    });

    yield takeEvery(
      action => action.type === Actions.RECEIVE_LUIS_INTENT && action.payload.intent === 'AddItem',
      function* (action) {
        for (let entity of action.payload.entities) {
          if (entity.type === 'ItemName') {
            yield put(Actions.addItem(entity.entity));
          }
        }
      }
    );

    yield takeEvery(
      action => action.type === Actions.RECEIVE_LUIS_INTENT && action.payload.intent === 'Delete',
      function* (action) {
        // TODO: Delete item
        console.log('TODO: DELETE ITEM');
      }
    );
  });

  return store;
}
