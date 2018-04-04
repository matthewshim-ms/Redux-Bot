const SET_CITY = 'SET_CITY';
const SET_USERNAME = 'SET_USERNAME';

function setCity(city) {
  return { type: SET_CITY, payload: { city } };
}

function setUsername(username) {
  return { type: SET_USERNAME, payload: { username } };
}

module.exports = {
  SET_CITY,
  SET_USERNAME,

  setCity,
  setUsername
};
