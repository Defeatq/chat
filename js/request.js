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

export async function requestName(token, name) {
  const response = await fetch(URLS.USER_CONFIRM, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({name: `${name}`})
  });

  return response
}

export async function requestUser(token) {
  const response = await fetch(URLS.USER_ME, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response
}