import { URLS } from './urls.js';

export async function requestEmail(email) {
  const response = await fetch(URLS.USER_CONFIRM, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({email: `${email}`})
  });

  return response
}