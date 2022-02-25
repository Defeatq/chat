import { format } from 'date-fns';
import Cookies from 'js-cookie';

export const UI_ELEMENTS = {
  MODALS: document.querySelectorAll('.overlay'),
  MODAL_TOGGLES: document.querySelectorAll('[data-path]'),
  MESSAGE_FORM: document.querySelector('.chat__post'),
  CHAT_DISPLAY: document.querySelector('.chat__display'),
  MAIN_MESSAGE_TEMPLATE: document.querySelector('.main-template'),
  OTHER_MESSAGE_TEMPLATE: document.querySelector('.other-template'),
  OUTER_CHAT: document.querySelector('.chat__wrapper'),
  NAME_EDIT_FORM: document.querySelector('#name-edit'),
  AUTH: {
    AUTHENTIFICATION_FORM: document.querySelector('#authentification'),
    AUTHENTIFICATION_MODAL: document.querySelector('[data-target="authentification"]'),
  },
  CONFIRM: {
    CONFIRM_FORM: document.querySelector('#confirm'),
    CONFIRM_MODAL: document.querySelector('[data-target="confirm"]'),
  },
  PRELOADER: document.querySelector('.preloader'),
}

export function renderMainMessage(text, time = new Date(), method) {
  const message = UI_ELEMENTS.MAIN_MESSAGE_TEMPLATE.content.cloneNode(true);
  renderMessage(message, text, 'Я', time, method);
}

export function renderOtherMessage(text, from, time, method) {
  const message = UI_ELEMENTS.OTHER_MESSAGE_TEMPLATE.content.cloneNode(true);
  renderMessage(message, text, from, time, method);
}

export function renderAuth() {
  UI_ELEMENTS.AUTH.AUTHENTIFICATION_MODAL.classList.remove('overlay-visible');
  UI_ELEMENTS.CONFIRM.CONFIRM_MODAL.classList.add('overlay-visible');
}

export function renderConfirm() {
  UI_ELEMENTS.CONFIRM.CONFIRM_MODAL.classList.remove('overlay-visible');
}

export function renderMessagesInRange(from, to, messages) {
  for (let i = from; i > to; i--) {
    const {text, user, createdAt: time} = messages[i];
    const isMainEmail = Cookies.get('email') === user.email;

    if (isMainEmail) {
      renderMainMessage(text, new Date(time), 'prepend');
    } else {
      renderOtherMessage(text, user.name, new Date(time), 'prepend');
    }
  }
}

function renderMessage(template, text, from, creationTime, method = 'append') {
  template.querySelector('.message__text').textContent = `${from}: ${text}`;
  template.querySelector('.message__time').textContent = format(creationTime, 'HH:mm');

  UI_ELEMENTS.CHAT_DISPLAY[method](template);
}