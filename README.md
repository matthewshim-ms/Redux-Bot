# Redux-Bot
BotBuilder v3 Node.js bot with Redux state management

# To-do

* [ ] More tests for Redux
* [ ] Cleaner code inside `app.js`
* [ ] Investigate possibility to use ChatConnector directly

# Hiccups

* I want to have a single type of `Dialog`
  * I want to use `Prompt.text`
    * It requires `SimpleDialog` (forever looping dialog)
      * `SimpleDialog` end dialog will leak the result to the next dialog, e.g. our "search" dialog will automatically pick it up
    * It doesn't work well with `WaterfallDialog`
    * All `Dialog` need to be `SimpleDialog`
  * I want to use `dialog`/`beginDialog`
* We don't like `triggerActions`
* We want to have a singleton root dialog
  * We cannot use `beginDialog`
  * A lot of `if` inside the saga, but not `takeEvery`
