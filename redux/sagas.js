const { call, put, select, takeEvery, takeLatest } = require('redux-saga/effects');

const CartActions = require('./cartActions');
const DialogActions = require('./dialogActions');

module.exports = function (session) {
  return function* sagas() {
    yield takeEvery(DialogActions.RECEIVE_MESSAGE, action => {
      // Handle unrecognized messages
    });

    yield takeEvery(DialogActions.SEND_EVENT, action => {
      const { name, value } = action.payload;

      session.send({ type: 'event', name, value });
    });

    yield takeEvery(DialogActions.SEND_MESSAGE, action => {
      session.send(action.payload.text);
    });

    yield takeEvery(DialogActions.END, () => {
      session.endDialog();
    });

    yield takeEvery(
      action => action.type === DialogActions.RECEIVE_LUIS_INTENT && action.payload.intent === 'AddItem',
      function* (action) {
        for (let entity of action.payload.entities) {
          if (entity.type === 'ItemName') {
            yield put(CartActions.addItem(entity.entity));
          }
        }
      }
    );

    yield takeEvery(
      action => action.type === DialogActions.RECEIVE_LUIS_INTENT && action.payload.intent === 'Delete',
      function* (action) {
        // TODO: Delete item
        console.log('TODO: DELETE ITEM');
      }
    );

    yield takeEvery(
      action => action.type === DialogActions.RECEIVE_LUIS_INTENT && action.payload.intent === 'UpdateItem',
      function* (action) {
        // TODO: Update Item
        console.log('TODO: UPDATE ITEM');
      }
    );
  };
};
