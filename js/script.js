import { UI_ELEMENTS, renderMainMessage, renderOtherMessage, renderAuth, renderConfirm, renderOtherMessage, renderMessagesInRange } from './view.js';
import { request, requestForMessages } from './request.js';
import { checkValidToken } from './auth.js'
import { URLS } from './urls.js';
import Cookies from 'js-cookie';
import { listeningSocket, sendSocketData } from './socket.js';

checkValidToken(() => {
  renderAuth();
  renderConfirm();
});

UI_ELEMENTS.OUTER_CHAT.addEventListener('scroll', event => {
  const isStart = event.target.scrollTop === 0;
  const currentState = JSON.parse(localStorage.getItem('currentState'));
  const prevScrollHeight = event.target.scrollHeight;

  if (isStart) {
    localStorage.setItem('currentState', currentState + 20);

    const newState = JSON.parse(localStorage.getItem('currentState'));
    const messages = JSON.parse(localStorage.getItem('messages')).messages;

    renderMessagesInRange(messages.length - currentState, messages.length - newState, messages);
    event.target.scrollTop = event.target.scrollHeight - prevScrollHeight;
  }
});

requestForMessages(messages => {
  localStorage.setItem('messages', JSON.stringify(messages));
  localStorage.setItem('currentState', 20);

  const _messages = JSON.parse(localStorage.getItem('messages')).messages;
  const currentState = JSON.parse(localStorage.getItem('currentState'));

  renderMessagesInRange(_messages.length - 1, _messages.length - currentState, _messages);
  UI_ELEMENTS.OUTER_CHAT.scrollTop = UI_ELEMENTS.OUTER_CHAT.scrollHeight;
});

listeningSocket();

UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const messageText = document.querySelector('.post__message').value;

  sendSocketData(JSON.stringify({
    text: messageText,
  }));
  renderMainMessage(messageText);
  UI_ELEMENTS.OUTER_CHAT.scrollTop = UI_ELEMENTS.OUTER_CHAT.scrollHeight - UI_ELEMENTS.OUTER_CHAT.clientHeight;

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