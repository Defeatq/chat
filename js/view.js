export const UI_ELEMENTS = {
  MODALS: document.querySelectorAll('.overlay'),
  MODAL_TOGGLES: document.querySelectorAll('[data-path]'),
  MESSAGE_FORM: document.querySelector('.chat__post'),
  CHAT_DISPLAY: document.querySelector('.chat__display'),
  MAIN_MESSAGE_TEMPLATE: document.querySelector('.main-template'),
  AUTH: {
    AUTHENTIFICATION_FORM: document.querySelector('#authentification'),
    AUTHENTIFICATION_MODAL: document.querySelector('[data-target="authentification"]'),
  },
  CONFIRM: {
    CONFIRM_FORM: document.querySelector('#confirm'),
    CONFIRM_MODAL: document.querySelector('[data-target="confirm"]'),
  },
}

export function renderMessage(value) {
  const message = UI_ELEMENTS.MAIN_MESSAGE_TEMPLATE.content.cloneNode(true);
  message.querySelector('.message__text').textContent = `Я: ${value}`;

  UI_ELEMENTS.CHAT_DISPLAY.append(message);
}

export function renderAuth() {
  UI_ELEMENTS.AUTH.AUTHENTIFICATION_MODAL.classList.remove('overlay-visible');
  UI_ELEMENTS.CONFIRM.CONFIRM_MODAL.classList.add('overlay-visible');
}