const builder = require('botbuilder');
const restify = require('restify');
const redux = require('redux');
const createLogger = require('redux-logger').createLogger;
const { default: createSagaMiddleware } = require('redux-saga');
const { call, put, takeEvery, takeLatest } = require('redux-saga/effects');

const conversation = require('./conversation.js');

const inMemoryStorage = new builder.MemoryBotStorage();
const connector = new builder.ChatConnector({
    appId: "", // process.env.MICROSOFT_APP_ID
    appPassword:"" // process.env.MICROSOFT_APP_PASSWORD 
})

var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage); // Register in memory storage

// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());

// REDUX

// Example redux middleware: lower case the activity text
const lowerCase = store => next => action => {
    if (action.type === 'message') {
        action.activity.text = action.activity.text.toLowerCase();
    }
    return next(action);
}

// Create store
const sagaMiddleware = createSagaMiddleware();
const store = redux.createStore(conversation.store, 
    redux.applyMiddleware(
        // our custom Redux middleware
        lowerCase,
        sagaMiddleware,
        // and a popular piece of Redux middleware from npm
        // createLogger(),
        store => next => action => {
            console.log('----- ACTION -----');
            console.log(action);
            // console.log(" ----- ACTION ADDRESS")
            // console.log(action.payload.request.address);
            // console.log(" ----- ACTION USER INFO");
            // console.log(action.payload.request.user[0]);
            return next(action);
        }
));

sagaMiddleware.run(mySaga);

function* mySaga() {
    yield takeLatest("USER_MESSAGE", function* (action) {
        // console.log("==== ACTION OBJECT ====");
        // console.log(action);
        // console.log("==== ACTION Address ====");
        // console.log(action.payload.request.address);
        // console.log("==== ACTION USer ====");
        // console.log(action.payload.request.user);
        yield put({
            type: 'SEND_ACTIVITY',
            payload: {
                type: 'message',
                text: '((((' + action.payload.request.text + '))))',
                channelId: action.payload.request.address.channelId,
                serviceUrl: action.payload.request.address.serviceUrl,
                conversation: action.payload.request.address.conversation.id,
                from: { id: action.payload.request.address.bot.id, name: action.payload.request.address.bot.name },
                //recipient: action.payload.request.from,
                replyToId: action.payload.request.address.id
            }
        });
    });

    // yield takeLatest("SEND_ACTIVITY", function* (action) {
    //     console.log("SAGA MIDDLEWARE");
    //     bot.send([action.payload]);
    // });
}

// Redux provides a simple pub-sub model that we can use to help organize our application logic in a decoupled way


// tie the store to the adapter
store.subscribe(() => {
    // const state = store.getState();
    // if (state) {
    //     const last = state[state.length - 1];
    //     if (last && last.bot) {
    //         adapter.post([ last.bot ]);
    //     }
    // }

    console.log('----- STORE -----');
    console.log(store.getState());
});



//=========================================================
// Bot Recognizers
//=========================================================

// TODO: 'shoppingcart' luis app, delete when done
var LuisKey = '4941fa348c49494db1e8e8d2fd7adb2c'; // Your-LUIS-Key
var LuisAppID = '4fdecb57-2404-4d0f-954b-4696c41c9b5e'; // Your-LUIS-App-ID

var LuisModel = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/'+ LuisAppID +'?subscription-key=' + LuisKey;

var recognizer = new builder.LuisRecognizer(LuisModel);
bot.recognizer(recognizer);

bot.dialog('/', [
    function(session, args, next){
        session.send('Hi!');
        session.endDialog();
    }
]).triggerAction({
    matches: /^(hi|hello|yo)/i,
});

bot.dialog('/AddItem', [
    function (session, args, next){
        //store.dispatch({ type: 'USER_MESSAGE', payload: { request: session.message}});

        store.dispatch({ type: 'ADD_ITEM', payload: { request: session.message }});
        
        var intent = args.intent;
        console.log(" **** ENTITIES ");
        console.log(intent.entities);
        
        console.log('***NUMBER ENTITY')
        console.log(builder.EntityRecognizer.findEntity(intent.entities, 'builtin.number'));
        console.log(" !#$!# INTENT")
        console.log(intent);
        console.log(' = = = ITEM NAMES');
        console.log(builder.EntityRecognizer.findEntity(intent.entities, 'ItemName'));
    }
]).triggerAction({
    matches: 'AddItem'
})

bot.dialog('/Delete', [
    function(session, args, next){
        console.log("DELETE");
        var intent = args.intent;
    }
]).triggerAction({
    matches: 'Delete'
})

bot.dialog('/ViewCart', [
    function(session, args, next){
        console.log("VIEW CART");
        var intent = args.intent;
    }
]).triggerAction({
    matches: 'ViewCart'
})


