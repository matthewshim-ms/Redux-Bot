const { applyMiddleware, combineReducers, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');

const reducer = require('./reducer');
const dialogSagas = require('./sagas/dialog');

module.exports = function loadStore(session, sagas) {
  const saga = createSagaMiddleware();
  const store = createStore(
    reducer,
    session.conversationData,
    applyMiddleware(
      saga,
      store => next => action => {
        // console.log(action);

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
    yield* dialogSagas(session);
    yield* sagas;
  });

  return store;
}
