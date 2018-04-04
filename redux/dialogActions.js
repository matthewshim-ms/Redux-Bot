const BEGIN_DIALOG = 'DIALOG/BEGIN_DIALOG';
const END_DIALOG = 'DIALOG/END_DIALOG';
const DIALOG_INIT = 'DIALOG/DIALOG_INIT';
const PROMPT_TEXT = 'DIALOG/PROMPT_TEXT';
const RECEIVE_INTENT = 'DIALOG/RECEIVE_INTENT';
const RECEIVE_MESSAGE = 'DIALOG/RECEIVE_MESSAGE';
const RECEIVE_DIALOG_RESULT = 'DIALOG/RECEIVE_DIALOG_RESULT';
const SEND_EVENT = 'DIALOG/SEND_EVENT';
const SEND_MESSAGE = 'DIALOG/SEND_MESSAGE';

function beginDialog(name) {
  return {
    type: BEGIN_DIALOG,
    payload: { name }
  };
}

function endDialog(text) {
  return { type: END_DIALOG, payload: { text } };
}

function dialogInit() {
  return { type: DIALOG_INIT };
}

function promptText(text) {
  return { type: PROMPT_TEXT, payload: { text } };
}

function receiveIntent({ intent, intents, entities }) {
  return {
    type: RECEIVE_INTENT,
    payload: { intent, intents, entities }
  };
}

function receiveMessage(text, attachments) {
  return {
    type: RECEIVE_MESSAGE,
    payload: { attachments, text }
  };
}

function receiveDialogResult(result) {
  return {
    type: RECEIVE_DIALOG_RESULT,
    payload: { result }
  };
}

function sendEvent(name, value) {
  return {
    type: SEND_EVENT,
    payload: { name, value }
  };
}

function sendMessage(text, attachments) {
  return {
    type: SEND_MESSAGE,
    payload: { attachments, text }
  };
}

module.exports = {
  BEGIN_DIALOG,
  END_DIALOG,
  DIALOG_INIT,
  PROMPT_TEXT,
  RECEIVE_DIALOG_RESULT,
  RECEIVE_INTENT,
  RECEIVE_MESSAGE,
  SEND_EVENT,
  SEND_MESSAGE,

  beginDialog,
  endDialog,
  dialogInit,
  promptText,
  receiveDialogResult,
  receiveIntent,
  receiveMessage,
  sendEvent,
  sendMessage
};
