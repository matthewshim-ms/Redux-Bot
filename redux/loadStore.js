const { applyMiddleware, combineReducers, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');

const cart = require('./cartReducer');
const createSagas = require('./sagas');

const production = process.env.NODE_ENV === 'production';

module.exports = function loadStore(session) {
  const saga = createSagaMiddleware();
  const store = createStore(
    combineReducers({ cart }),
    session.conversationData,
    applyMiddleware(
      saga,
      store => next => action => {
        production || console.log(action);

        return next(action);
      }
    )
  );

  production || store.subscribe(() => {
    session.conversationData = store.getState();
    session.save();

    session.send({
      type: 'event',
      name: 'store',
      value: store.getState()
    });
  });

  saga.run(createSagas(session));

  return store;
}
