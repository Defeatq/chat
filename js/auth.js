import { request } from './request.js';
import { URLS } from './urls.js';
import Cookies from 'js-cookie';

export function checkValidToken(onSucces, onError) {
  if (Cookies.get('token')) {
    request('GET', `${URLS.API_KEY}/user/me`, Cookies.get('token'))
      .then(response => response.json())
      .then(userData => {
        const isCodeValid = userData.token === Cookies.get('token');

        if (isCodeValid) {
          onSucces(userData);
        } else {
          throw new Error('Invalid code');
        }
      })
      .catch(onError)
  }
}