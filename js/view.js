import { format } from 'date-fns';

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

export function renderMainMessage(text, time = new Date()) {
  const message = UI_ELEMENTS.MAIN_MESSAGE_TEMPLATE.content.cloneNode(true);
  renderMessage(message, text, 'Я', time);
}

export function renderOtherMessage(text, from, time) {
  const message = UI_ELEMENTS.OTHER_MESSAGE_TEMPLATE.content.cloneNode(true);
  renderMessage(message, text, from, time);
}

export function renderAuth() {
  UI_ELEMENTS.AUTH.AUTHENTIFICATION_MODAL.classList.remove('overlay-visible');
  UI_ELEMENTS.CONFIRM.CONFIRM_MODAL.classList.add('overlay-visible');
}

export function renderConfirm() {
  UI_ELEMENTS.CONFIRM.CONFIRM_MODAL.classList.remove('overlay-visible');
}

function renderMessage(template, text, from, creationTime) {
  template.querySelector('.message__text').textContent = `${from}: ${text}`;
  template.querySelector('.message__time').textContent = format(creationTime, 'HH:mm');

  UI_ELEMENTS.CHAT_DISPLAY.append(template);
  UI_ELEMENTS.OUTER_CHAT.scrollTop = UI_ELEMENTS.OUTER_CHAT.scrollHeight - UI_ELEMENTS.OUTER_CHAT.clientHeight;
}