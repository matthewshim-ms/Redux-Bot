const BEGIN_DIALOG = 'DIALOG/BEGIN_DIALOG';
const END_DIALOG = 'DIALOG/END_DIALOG';
const PROMPT_TEXT = 'DIALOG/PROMPT_TEXT';
const RECEIVE_MESSAGE = 'DIALOG/RECEIVE_MESSAGE';
const SEND_EVENT = 'DIALOG/SEND_EVENT';
const SEND_MESSAGE = 'DIALOG/SEND_MESSAGE';

function beginDialog(name) {
  return {
    type: BEGIN_DIALOG,
    payload: { name }
  };
}

function endDialog(text, args) {
  return { type: END_DIALOG, payload: { args, text } };
}

function promptText(text) {
  return { type: PROMPT_TEXT, payload: { text } };
}

function receiveMessage(text, attachments, result) {
  return {
    type: RECEIVE_MESSAGE,
    payload: { attachments, result, text }
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
  PROMPT_TEXT,
  RECEIVE_MESSAGE,
  SEND_EVENT,
  SEND_MESSAGE,

  beginDialog,
  endDialog,
  promptText,
  receiveMessage,
  sendEvent,
  sendMessage
};
