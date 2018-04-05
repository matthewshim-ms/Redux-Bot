const { put, select, takeEvery } = require('redux-saga/effects');
const { endDialog, RECEIVE_MESSAGE, sendMessage } = require('../dialogActions');

module.exports = function* search(session) {
  yield takeEvery(RECEIVE_MESSAGE, function* (action) {
    const { city, username } = yield select();
    const messageText = action.payload.text.trim();

    yield put(sendMessage(`${ username }, wait a few seconds. Searching for \'${ messageText }\' in \'${ city }\'...`));
    yield put(sendMessage(`https://www.bing.com/search?q=${ encodeURIComponent(`${ messageText } in ${ city }`) }`));
    yield put(endDialog());
  });
}
