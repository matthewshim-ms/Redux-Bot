const { applyMiddleware, combineReducers, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { select } = require('redux-saga/effects');
const { SET_STAGE } = require('./dialogActions');

const dialogSagas = require('./sagas/dialog');
const reducer = require('./reducer');

module.exports = function loadStore(session, sagas) {
  const saga = createSagaMiddleware();
  const store = createStore(
    reducer,
    // (state, action) => {
    //   state = reducer(state, action);

    //   if (action.type === SET_STAGE) {
    //     const { stage } = action.payload;

    //     state = { ...state, stages: [...state.stages, stage ] };

    //     if (stage === 'greet') {
    //       saga.run(function* () {
    //         yield* require('./sagas/greet')(session);
    //       });
    //     }
    //   }

    //   return state;
    // },
    {
      stages: [],
      ...session.conversationData
    },
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

    // const stage = yield select(state => state.stages[state.stages.length - 1]);

    // console.log(`stage: ${ stage }`);

    // if (stage === 'greet') {
    //   yield* require('./sagas/greet')(session);
    // } else {
      yield* require('./sagas/default')(session);
    // }

    // yield* sagas;
  });

  return store;
}
