// const BEGIN_DIALOG = 'DIALOG/BEGIN_DIALOG';
// const CONVERSATION_UPDATE = 'DIALOG/CONVERSATION_UPDATE';
// const END_DIALOG = 'DIALOG/END_DIALOG';
const DIALOG_INIT = 'DIALOG/DIALOG_INIT';
const MEMBER_ADDED = 'DIALOG/MEMBER_ADDED';
const PROMPT_TEXT = 'DIALOG/PROMPT_TEXT';
const RECEIVE_INTENT = 'DIALOG/RECEIVE_INTENT';
const RECEIVE_MESSAGE = 'DIALOG/RECEIVE_MESSAGE';
const RECEIVE_DIALOG_RESULT = 'DIALOG/RECEIVE_DIALOG_RESULT';
const SEND_EVENT = 'DIALOG/SEND_EVENT';
const SEND_MESSAGE = 'DIALOG/SEND_MESSAGE';
const SET_STAGE = 'DIALOG/SET_STAGE';

function beginDialog(name) {
  return {
    type: BEGIN_DIALOG,
    payload: { name }
  };
}

// function conversationUpdate({ membersAdded }) {
//   return {
//     type: CONVERSATION_UPDATE,
//     payload: { membersAdded }
//   };
// }

function endDialog(text) {
  return { type: END_DIALOG, payload: { text } };
}

function dialogInit() {
  return { type: DIALOG_INIT };
}

function memberAdded(id) {
  return { type: MEMBER_ADDED, payload: { id } };
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

function receiveMessage(text, attachments, response) {
  return {
    type: RECEIVE_MESSAGE,
    payload: { attachments, response, text }
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

function setStage(stage) {
  return {
    type: SET_STAGE,
    payload: { stage }
  };
}

module.exports = {
  // BEGIN_DIALOG,
  // CONVERSATION_UPDATE,
  // END_DIALOG,
  DIALOG_INIT,
  MEMBER_ADDED,
  PROMPT_TEXT,
  RECEIVE_DIALOG_RESULT,
  RECEIVE_INTENT,
  RECEIVE_MESSAGE,
  SEND_EVENT,
  SEND_MESSAGE,
  SET_STAGE,

  // beginDialog,
  // conversationUpdate,
  // endDialog,
  dialogInit,
  memberAdded,
  promptText,
  receiveDialogResult,
  receiveIntent,
  receiveMessage,
  sendEvent,
  sendMessage,
  setStage
};
