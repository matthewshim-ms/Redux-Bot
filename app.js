require('dotenv').config();

const builder = require('botbuilder');
const restify = require('restify');

const inMemoryStorage = new builder.MemoryBotStorage();
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

const bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage); // Register in memory storage

// Redux
const loadStore = require('./redux/loadStore');
const DialogActions = require('./redux/dialogActions');

// Create server
const server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`${ server.name } listening to ${ server.url }`);
});

server.post('/api/messages', connector.listen());

//=========================================================
// Bot Recognizers
//=========================================================

// TODO: 'shoppingcart' luis app, delete when done
const LuisAppID = process.env.LUIS_APP_ID; // Your-LUIS-App-ID
const LuisKey = process.env.LUIS_APP_KEY;  // Your-LUIS-Key
const LuisModel = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${ LuisAppID }?subscription-key=${ LuisKey }`;
const recognizer = new builder.LuisRecognizer(LuisModel);

const DialogSagas = {
  '/': [require('./redux/sagas/default'), builder.SimpleDialog],
  'changeCurrentCity': [require('./redux/sagas/changeCurrentCity'), builder.SimpleDialog, { matches: /^change city to (.*)/i }],
  'greet': [require('./redux/sagas/greet')],
  'printCurrentCity': [require('./redux/sagas/printCurrentCity'), builder.SimpleDialog, { matches: /^current city/i }],
  'reset': [require('./redux/sagas/reset'), builder.SimpleDialog, { matches: /^reset/i }],
  'search': [require('./redux/sagas/search')],
};

Object.keys(DialogSagas).forEach(name => {
  const [createSagas, dialogType = builder.SimpleDialog, triggerActionOptions] = DialogSagas[name];
  // let dialog;

  // switch (dialogType) {
  //   case builder.IntentDialog:
  //     dialog = new builder.IntentDialog()
  //       .onBegin((session, args, next) => {
  //         console.log(`onBegin: ${ name }`);

  //         const store = loadStore(session, createSagas(session));

  //         store.dispatch(DialogActions.dialogInit());

  //         return next();
  //       })
  //       .onDefault((session, args, next) => {
  //         console.log(`onDefault: ${ name }`);
  //         console.log(args);

  //         const store = loadStore(session, createSagas(session));

  //         if (args.intent && args.intent !== 'None') {
  //           store.dispatch(DialogActions.receiveIntent(args));
  //         } else {
  //           const { attachments, text } = session.message;

  //           store.dispatch(DialogActions.receiveMessage(text, attachments));
  //         }

  //         return next();
  //       });

  //     break;

  //   case builder.SimpleDialog:
      // dialog = new builder.SimpleDialog((session, result) => {
      //   const store = loadStore(session, createSagas(session));

      //   if (result) {
      //     store.dispatch(DialogActions.receiveDialogResult(result && result.response));
      //   } else {
      //     store.dispatch(DialogActions.dialogInit());
      //   }
      // });

  //     break;
  // }

  // triggerActionOptions && dialog.triggerAction(triggerActionOptions);

  // bot.dialog(name, dialog);

  // const dialog = new builder.SimpleDialog((session, result) => {
  // // const dialog = bot.dialog(name, (session, result) => {
  //   console.log(`simpleDialog: ${ name }, result = ${ result }`);

  //   const { attachments, text } = session.message;
  //   const store = loadStore(session, createSagas(session));

  //   // store.dispatch(DialogActions.receiveMessage(text, attachments, result && result.response));

  //   // if (result) {
  //     store.dispatch(DialogActions.receiveMessage(text, attachments, result && result.response));
  //   // } else {
  //   //   store.dispatch(DialogActions.dialogInit(text, attachments));
  //   // }
  // });

  // triggerActionOptions && dialog.triggerAction(triggerActionOptions);

  // // console.log(dialog);

  // bot.dialog(name, dialog);
});

bot.use({
  botbuilder: (session, next) => {
    console.log('botbuilder middleware');
    session.store = loadStore(session);
    next();
  }
});

// bot.on('receive', message

bot.dialog('/', new builder.SimpleDialog(session => {
  console.log(`simpleDialog`);

  const { attachments, text } = session.message;
  // const store = loadStore(session);

  // // // store.dispatch(DialogActions.receiveMessage(text, attachments, result && result.response));

  // // // if (result) {
  // //   console.log('firing RECEIVE_MESSAGE');
  session.store.dispatch(DialogActions.receiveMessage(text, attachments));
  // // } else {
  // //   store.dispatch(DialogActions.dialogInit(text, attachments));
  // // }
}));

//Sends greeting message when the bot is first added to a conversation
// bot.on('conversationUpdate', function (message) {
//   console.log(message);
//   // console.log(this);
//   // if (message.membersAdded) {
//   //   message.membersAdded.forEach(function (identity) {
//   //     if (identity.id === message.address.bot.id) {
//   //       var reply = new builder.Message()
//   //         .address(message.address)
//   //         .text('Hi! I am ImageCaption Bot. I can understand the content of any image and try to describe it as well as any human. Try sending me an image or an image URL.');

//   //       bot.send(reply);
//   //     }
//   //   });
//   // }
// });
