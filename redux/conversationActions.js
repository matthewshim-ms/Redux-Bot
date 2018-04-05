const RESET = 'RESET';
const SET_CITY = 'SET_CITY';
const SET_STAGE = 'SET_STAGE';
const SET_USERNAME = 'SET_USERNAME';

function reset() {
  return { type: RESET };
}

function setCity(city) {
  return { type: SET_CITY, payload: { city } };
}

function setStage(stage) {
  return { type: SET_STAGE, payload: { stage } };
}

function setUsername(username) {
  return { type: SET_USERNAME, payload: { username } };
}

module.exports = {
  RESET,
  SET_CITY,
  SET_STAGE,
  SET_USERNAME,

  reset,
  setCity,
  setStage,
  setUsername
};
