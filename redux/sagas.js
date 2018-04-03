const builder = require('botbuilder');
const { call, put, select, takeEvery, takeLatest } = require('redux-saga/effects');

const CartActions = require('./cartActions');
const DialogActions = require('./dialogActions');

module.exports = function (session) {
  return function* sagas() {
    yield takeEvery(DialogActions.RECEIVE_MESSAGE, function* (action) {
      if (/(^|\s)cart($|\s)/.test(action.payload.text)) {
        yield put({ type: CartActions.VIEW_CART });
      } else {
        yield put(DialogActions.sendMessage('Sorry, I don\'t know what you said.\n\nTo start with a burger, say, "add burger."'));
      }
    });

    yield takeEvery(DialogActions.SEND_EVENT, function* (action) {
      const { name, value } = action.payload;

      session.send({ type: 'event', name, value });
    });

    yield takeEvery(DialogActions.SEND_MESSAGE, function* (action) {
      const message = new builder.Message(session);
      const { attachments, text } = action.payload;

      text && message.text(text);
      attachments && message.attachments(attachments);
      session.send(message);
    });

    yield takeEvery(DialogActions.END, function* () {
      session.endDialog();
    });

    yield takeEvery(CartActions.ADD_ITEM, function* (action) {
      session.send(`I have added "${ action.payload.text }".`);
    });

    yield takeEvery(
      action => action.type === DialogActions.RECEIVE_LUIS_INTENT && action.payload.intent === 'AddItem',
      function* (action) {
        if (!action.payload.entities.length) {
          yield put(DialogActions.sendMessage('Sorry, I don\'t know what to add.'));
        }

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

    yield takeEvery(
      action => action.type === DialogActions.RECEIVE_LUIS_INTENT && action.payload.intent === 'ViewCart',
      function* (action) {
        const { items } = yield select(state => state.cart);
        const subtotal = items.length * 6.78;
        const tax = subtotal * .1;

        yield put(DialogActions.sendMessage(
          null,
          [
            new builder.ReceiptCard(session)
              .title('Cortoso Burger')
              .items(items.map(item =>
                new builder.ReceiptItem(session)
                  .title(item)
                  .subtitle('Bacon + Lettuce + Tomato')
                  .price('$6.78')
                  .quantity('1')
              ))
              .tax(`$${ tax }`)
              .total(`$${ (tax + subtotal).toFixed(2) }`)
          ]
        ));
      }
    );

    yield takeEvery(
      action => action.type === DialogActions.RECEIVE_LUIS_INTENT && action.payload.intent === 'CheckOut',
      function* (action) {
        yield put(DialogActions.sendMessage('Thanks for dining with us!'));
        yield put(DialogActions.end());
      }
    );
  };
};
