export const UI_ELEMENTS = {
  MODALS: document.querySelectorAll('.overlay'),
  MODAL_TOGGLES: document.querySelectorAll('[data-path]'),
  MESSAGE_FORM: document.querySelector('.chat__post'),
  CHAT_DISPLAY: document.querySelector('.chat__display'),
  MAIN_MESSAGE_TEMPLATE: document.querySelector('.main-template'),
}

export function renderMessage(value) {
  const message = UI_ELEMENTS.MAIN_MESSAGE_TEMPLATE.content.cloneNode(true);
  message.querySelector('.message__text').textContent = `Я: ${value}`;

  UI_ELEMENTS.CHAT_DISPLAY.append(message);
}