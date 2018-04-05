const { put, select } = require('redux-saga/effects');
const { endDialog } = require('../dialogActions');

module.exports = function* printCurrentCity(session) {
  const { city, username } = yield select();

  yield put(endDialog(`Hey ${ username }, I\'m currently configured to search for things in ${ city }.`));
}
