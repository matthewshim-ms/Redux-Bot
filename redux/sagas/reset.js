const { put } = require('redux-saga/effects');
const { endDialog } = require('../dialogActions');
const { reset } = require('../conversationActions');

module.exports = function* reset(session) {
  yield put(reset());
  yield put(endDialog('Ups... I\'m suffering from a memory loss...'));
}
