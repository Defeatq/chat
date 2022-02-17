import { UI_ELEMENTS, renderMessage, renderAuth } from './view.js';
import { requestEmail } from './request.js';
console.log(UI_ELEMENTS.CONFIRM.CONFIRM_FORM)
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

  UI_ELEMENTS.CONFIRM.CONFIRM_FORM.reset();
})