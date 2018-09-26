import { accessToken } from '../accessToken.js';

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with request! ${response.status}`);
    return;
  }
  return response.json();
};

export const getGithubNames = url => {
  return fetch(url + accessToken)
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch getUserData failed ${err}`);
    });
};
