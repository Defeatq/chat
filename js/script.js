import { UI_ELEMENTS, renderMainMessage, renderOtherMessage, renderAuth, renderConfirm, renderOtherMessage } from './view.js';
import { request, requestForMessages } from './request.js';
import { checkValidToken } from './auth.js'
import { URLS } from './urls.js';
import Cookies from 'js-cookie';
import { listeningSocket, sendSocketData } from './socket.js';

requestForMessages(messages => {
  messages.messages.forEach(messageData => {
    const {message, username, createdAt: time} = messageData;

    renderOtherMessage(message, username, new Date(time));
  });
});

checkValidToken(() => {
  renderAuth();
  renderConfirm();
});

listeningSocket();

UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const messageText = document.querySelector('.post__message').value;

  sendSocketData(JSON.stringify({
    text: messageText,
  }));
  renderMainMessage(messageText);

  UI_ELEMENTS.MESSAGE_FORM.reset();
});

UI_ELEMENTS.AUTH.AUTHENTIFICATION_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const email = UI_ELEMENTS.AUTH.AUTHENTIFICATION_FORM.querySelector('.auth__setting').value;
  
  request('POST', `${URLS.API_KEY}/user`, Cookies.get('token'), {email: `${email}`})
    .then(() => {
      renderAuth();
      UI_ELEMENTS.AUTH.AUTHENTIFICATION_FORM.reset();
    })
    .catch(alert);
});

UI_ELEMENTS.CONFIRM.CONFIRM_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const token = UI_ELEMENTS.CONFIRM.CONFIRM_FORM.querySelector('.auth__setting').value;
  Cookies.set('token', token);

  checkValidToken(() => {
    renderConfirm();
    UI_ELEMENTS.CONFIRM.CONFIRM_FORM.reset();
  }, alert);
});

UI_ELEMENTS.NAME_EDIT_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const name = UI_ELEMENTS.NAME_EDIT_FORM.querySelector('.parameter__nickname__setting').value;
  
  request('PATCH', `${URLS.API_KEY}/user`, Cookies.get('token'), {name: `${name}`})
    .then(() => {
      UI_ELEMENTS.NAME_EDIT_FORM.reset();
    })
    .catch(alert);
})