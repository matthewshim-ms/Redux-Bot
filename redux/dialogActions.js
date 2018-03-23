const END = 'DIALOG/END';
const RECEIVE_LUIS_INTENT = 'DIALOG/RECEIVE_LUIS_INTENT';
const RECEIVE_MESSAGE = 'DIALOG/RECEIVE_MESSAGE';
const SEND_EVENT = 'DIALOG/SEND_EVENT';
const SEND_MESSAGE = 'DIALOG/SEND_MESSAGE';

function end() {
  return { type: END };
}

function receiveLuisIntent(intent) {
  return {
    type: RECEIVE_LUIS_INTENT,
    payload: intent
  };
}

function receiveMessage(text, attachments) {
  return {
    type: RECEIVE_MESSAGE,
    payload: { attachments, text }
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
  END,
  RECEIVE_LUIS_INTENT,
  RECEIVE_MESSAGE,
  SEND_EVENT,
  SEND_MESSAGE,

  end,
  receiveLuisIntent,
  receiveMessage,
  sendEvent,
  sendMessage
};
