const { put, takeEvery } = require('redux-saga/effects');
const { BEGIN_DIALOG, DIALOG_INIT, endDialog, promptText, RECEIVE_DIALOG_RESULT, sendMessage } = require('../dialogActions');
const { RECEIVE_MESSAGE } = require('../dialogActions');
const { setUsername } = require('../conversationActions');

module.exports = function* greet(session, response) {
  yield takeEvery(RECEIVE_MESSAGE, function* (action) {
    const { text } = action.payload;

    if (!text) {
      yield put(sendMessage('Before get started, please tell me your name?'));
      // yield put(promptText('Before get started, please tell me your name?'));
    } else {
      yield put(setUsername(text));
      yield put(endDialog(`Welcome ${ text }!\n * If you want to know which city I'm using for my searches type 'current city'. \n * Want to change the current city? Type 'change city to cityName'. \n * Want to change it just for your searches? Type 'change my city to cityName'`));
    }
  });

  // yield takeEvery(DIALOG_INIT, function* () {
  //   yield put(promptText('Before get started, please tell me your name?'));
  // });

  // yield takeEvery(RECEIVE_MESSAGE, function* ({ payload: { response } }) {
  //   yield put(setUsername(response));
  //   yield put(endDialog(`Welcome ${ response }!\n * If you want to know which city I'm using for my searches type 'current city'. \n * Want to change the current city? Type 'change city to cityName'. \n * Want to change it just for your searches? Type 'change my city to cityName'`));
  // });
}
