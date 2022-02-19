import { requestUser } from './request.js';
import Cookies from 'js-cookie';

export function checkValidToken(callback) {
  requestUser(Cookies.get('token'))
    .then(response => response.json())
    .then(userData => {
      const isCodeValid = userData.token === Cookies.get('token');

      if (isCodeValid) {
        callback(userData);
      } else {
        throw new Error('Invalid code');
      }
    })
    .catch(alert);
}