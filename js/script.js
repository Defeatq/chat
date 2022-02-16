import { getCityData } from './requests.js';
import { UI_ELEMENTS, renderMessage } from './view.js';

UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', event => {
  event.preventDefault();

  const messageValue = document.querySelector('.post__message').value;
  renderMessage(messageValue);

  UI_ELEMENTS.MESSAGE_FORM.reset();
});