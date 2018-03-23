const ADD_ITEM = 'ADD_ITEM';
const END_DIALOG = 'END_DIALOG';
const EXPORT_STORE = 'DUMP_STORE';
const RECEIVE_LUIS_INTENT = 'RECEIVE_LUIS_INTENT';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
// const SEND_EVENT = 'SEND_EVENT';
const SEND_MESSAGE = 'SEND_MESSAGE';

function addItem(text) {
  return {
    type: 'ADD_ITEM',
    payload: { text }
  };
}

function endDialog() {
  return { type: 'END_DIALOG' };
}

function exportStore() {
  return { type: 'DUMP_STORE' };
}

function receiveLuisIntent(intent) {
  return {
    type: 'RECEIVE_LUIS_INTENT',
    payload: intent
  };
}

function receiveMessage(text, attachments) {
  return {
    type: 'RECEIVE_MESSAGE',
    payload: { attachments, text }
  };
}

// function sendEvent(name, value) {
//   return {
//     type: 'SEND_EVENT',
//     payload: { name, value }
//   };
// }

function sendMessage(text, attachments) {
  return {
    type: 'SEND_MESSAGE',
    payload: { attachments, text }
  };
}

module.exports = {
  ADD_ITEM,
  END_DIALOG,
  EXPORT_STORE,
  RECEIVE_LUIS_INTENT,
  RECEIVE_MESSAGE,
  // SEND_EVENT,
  SEND_MESSAGE,

  addItem,
  endDialog,
  exportStore,
  receiveLuisIntent,
  receiveMessage,
  // sendEvent,
  sendMessage
};
