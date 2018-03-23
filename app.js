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
const LuisKey = '4941fa348c49494db1e8e8d2fd7adb2c'; // Your-LUIS-Key
const LuisAppID = '4fdecb57-2404-4d0f-954b-4696c41c9b5e'; // Your-LUIS-App-ID
const LuisModel = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${ LuisAppID }?subscription-key=${ LuisKey }`;
const recognizer = new builder.LuisRecognizer(LuisModel);

bot.recognizer(recognizer);

bot.dialog('/', [(session, args, next) => {
  const { attachments, text } = session.message;
  const store = loadStore(session);

  store.dispatch(DialogActions.receiveMessage(text, attachments));
  store.dispatch(DialogActions.sendMessage('Sorry, I don\'t know what you say. You can say: add.'));
  store.dispatch(DialogActions.end());
}]);

const HOISTED_INTENTS = ['AddItem', 'Delete'];

HOISTED_INTENTS.forEach(name => {
  bot.dialog(`/${ name }`, [(session, args, next) => {
    const store = loadStore(session);

    // TODO: Don't know why sometimes LUIS hit this dialog route without args
    if (args) {
      store.dispatch(DialogActions.receiveLuisIntent(args.intent));
    }
  }]).triggerAction({
    matches: name
  });
});
