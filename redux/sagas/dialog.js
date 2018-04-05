const builder = require('botbuilder');
const { call, put, select, takeEvery, takeLatest } = require('redux-saga/effects');

const DialogActions = require('../dialogActions');

module.exports = function* (session) {
  // yield takeEvery(DialogActions.BEGIN_DIALOG, function* (action) {
  //   session.beginDialog(action.payload.name);
  // });

  // yield takeEvery(DialogActions.END_DIALOG, function* (action) {
  //   session.endDialog(action.payload.text);
  // });

  yield takeEvery(DialogActions.PROMPT_TEXT, function* (action) {
    builder.Prompts.text(session, action.payload.text);
  });

  yield takeEvery(DialogActions.SEND_EVENT, function* (action) {
    const { name, value } = action.payload;

    session.send({ type: 'event', name, value });
  });

  yield takeEvery(DialogActions.SEND_MESSAGE, function* (action) {
    let { message } = action.payload;

    if (!message) {
      const { attachments, text } = action.payload;

      message = new builder.Message(session);

      text && message.text(text);
      attachments && message.attachments(attachments);
    }

    session.send(message);

    // bot.send(message);
  });
};
