const { applyMiddleware, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');

const createDefaultSaga = require('./sagas/default');
const createDialogSagas = require('./sagas/dialog');
const reducer = require('./reducer');

module.exports = function loadStore(session) {
  const saga = createSagaMiddleware();
  const store = createStore(
    reducer,
    session.conversationData,
    applyMiddleware(
      saga,
      store => next => action => {
        session.send({
          type: 'event',
          name: 'action',
          value: action
        });

        return next(action);
      }
    )
  );

  store.subscribe(() => {
    session.conversationData = store.getState();
    session.save();

    session.send({
      type: 'event',
      name: 'store',
      value: store.getState()
    });
  });

  saga.run(function* () {
    yield* createDialogSagas(session);
    yield* createDefaultSaga(session);
  });

  return store;
}
