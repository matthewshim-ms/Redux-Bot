const { put, takeEvery } = require('redux-saga/effects');
const { BEGIN_DIALOG, endDialog, promptText, RECEIVE_DIALOG_RESULT } = require('../dialogActions');
const { setUsername } = require('../conversationActions');

module.exports = function* search(session, response) {
  yield takeEvery(RECEIVE_DIALOG_RESULT, function* ({ payload: { result } }) {
    if (result) {
      yield put(setUsername(result));
      yield put(endDialog(`Welcome ${ result }!\n * If you want to know which city I'm using for my searches type 'current city'. \n * Want to change the current city? Type 'change city to cityName'. \n * Want to change it just for your searches? Type 'change my city to cityName`));
    } else {
      yield put(promptText('Before get started, please tell me your name?'));
    }
  });
}
