const { put, takeEvery } = require('redux-saga/effects');
const { RECEIVE_INTENT } = require('../dialogActions');
const { setCity } = require('../conversationActions');

module.exports = function* changeCurrentCity(session) {
  yield takeEvery(RECEIVE_INTENT, function* (action) {
    const { username } = yield select();
    const newCity = action.payload.intent.matched[1];

    yield put(setCity(newCity));
    yield put(endDialog(`All set ${ username }. From now on, all my searches will be for things in ${ newCity }.`));
  });
}
