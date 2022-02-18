import { UI_ELEMENTS, renderMessage, renderAuth, renderConfirm } from './view.js';
import { requestEmail, requestName, requestUser } from './request.js';
import Cookies from 'js-cookie';

UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const messageValue = document.querySelector('.post__message').value;
  renderMessage(messageValue);

  UI_ELEMENTS.MESSAGE_FORM.reset();
});

UI_ELEMENTS.AUTH.AUTHENTIFICATION_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const email = UI_ELEMENTS.AUTH.AUTHENTIFICATION_FORM.querySelector('.auth__setting').value;
  
  requestEmail(email)
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
  renderConfirm();
  
  UI_ELEMENTS.CONFIRM.CONFIRM_FORM.reset();
});

UI_ELEMENTS.NAME_EDIT_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const name = UI_ELEMENTS.NAME_EDIT_FORM.querySelector('.parameter__nickname__setting').value;
  
  requestName(Cookies.get('token'), name)
    .then(() => {
      UI_ELEMENTS.NAME_EDIT_FORM.reset();
    })
    .catch(alert)
})