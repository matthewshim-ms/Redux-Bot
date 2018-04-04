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
  '/': [require('./redux/sagas/default'), builder.IntentDialog],
  'greet': [require('./redux/sagas/greet')],
  'search': [require('./redux/sagas/search')],
};

Object.keys(DialogSagas).forEach(name => {
  const [createSagas, dialogType = builder.SimpleDialog] = DialogSagas[name];
  let dialog;

  switch (dialogType) {
    case builder.IntentDialog:
      dialog = new builder.IntentDialog()
        .onBegin(session => {
          const store = loadStore(session, createSagas(session));

          store.dispatch(DialogActions.dialogInit());
        })
        .onDefault((session, args, next) => {
          const store = loadStore(session, createSagas(session));

          if (args.intent && args.intent !== 'None') {
            store.dispatch(DialogActions.receiveIntent(args));
          } else {
            const { attachments, text } = session.message;

            store.dispatch(DialogActions.receiveMessage(text, attachments));
          }
        });

      break;

    case builder.SimpleDialog:
      dialog = new builder.SimpleDialog((session, result) => {
        const store = loadStore(session, createSagas(session));

        if (result) {
          store.dispatch(DialogActions.receiveDialogResult(result && result.response));
        } else {
          store.dispatch(DialogActions.dialogInit());
        }
      });

      break;
  }

  bot.dialog(name, dialog);
});
