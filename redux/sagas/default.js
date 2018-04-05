const { put, select, take, takeEvery } = require('redux-saga/effects');

const { setCity, setStage, setUsername } = require('../conversationActions');
const { beginDialog, RECEIVE_MESSAGE, sendMessage } = require('../dialogActions');

module.exports = function* (session) {
  let state, { city, stage, username } = yield select();

  if (!city) {
    city = 'Seattle';
    yield put(setCity(city));
    yield put(sendMessage(`Welcome to the Search City bot. I\'m currently configured to search for things in ${ city }`));
    yield put(sendMessage('Before get started, please tell me your name?'));
  }

  if (!stage) {
    yield put(setStage('greet'));
  } else if (stage === 'greet') {
    if (!username) {
      const action = yield take(RECEIVE_MESSAGE);
      const { text } = action.payload;

      if (!text) {
        // yield put(promptText('Before get started, please tell me your name?'));
      } else {
        yield put(setUsername(text));
        yield put(sendMessage(`Welcome ${ text }!\n * If you want to know which city I'm using for my searches type 'current city'. \n * Want to change the current city? Type 'change city to cityName'. \n * Want to change it just for your searches? Type 'change my city to cityName'`));
        yield put(setStage('search'));
      }
    }
  } else if (stage === 'search') {
    const action = yield take(RECEIVE_MESSAGE);
    const { city, username } = yield select();
    const messageText = action.payload.text.trim();

    yield put(sendMessage(`${ username }, wait a few seconds. Searching for \'${ messageText }\' in \'${ city }\'...`));
    yield put(sendMessage(`https://www.bing.com/search?q=${ encodeURIComponent(`${ messageText } in ${ city }`) }`));
  }
};
