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
  console.log('%s listening to %s', server.name, server.url);
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

const dialog = new builder.IntentDialog();

dialog.recognizer(recognizer);

dialog.onBegin((session, args, next) => {
  const store = loadStore(session);

  store.dispatch(DialogActions.sendMessage('Welcome to Cortoso Burger, we only build finest burgers!'));
});

dialog.onDefault((session, args, next) => {
  const store = loadStore(session);

  if (args.intent && args.intent !== 'None') {
    store.dispatch(DialogActions.receiveLuisIntent(args));
  } else {
    const { attachments, text } = session.message;

    store.dispatch(DialogActions.receiveMessage(text, attachments));
    store.dispatch(DialogActions.end());
  }
});

bot.dialog('/', dialog);
