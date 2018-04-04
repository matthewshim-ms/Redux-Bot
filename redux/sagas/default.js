const { put, select, takeEvery } = require('redux-saga/effects');

const { setCity } = require('../conversationActions');
const { beginDialog, sendMessage } = require('../dialogActions');

module.exports = function* (session) {
  let { city, username } = yield select();

  if (!city) {
    city = 'Seattle';
    yield put(setCity(city));
    session.send('Welcome to the Search City bot. I\'m currently configured to search for things in %s', city);
  }

  if (!username) {
    yield put(beginDialog('greet'));
  } else {
    yield put(beginDialog('search'));
  }
};
