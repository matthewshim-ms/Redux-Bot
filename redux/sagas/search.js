const { put, select } = require('redux-saga/effects');
const { endDialog, sendMessage } = require('../dialogActions');

module.exports = function* search(session) {
  const { city, username } = yield select();
  const messageText = session.message.text.trim();

  yield put(sendMessage(`${ username }, wait a few seconds. Searching for \'${ messageText }\' in \'${ city }\'...`));
  yield put(sendMessage(`https://www.bing.com/search?q=${ encodeURIComponent(`${ messageText } in ${ city }`) }`));
  yield put(endDialog());
}
