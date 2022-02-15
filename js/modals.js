import { UI_ELEMENTS } from "./view.js";

UI_ELEMENTS.MODALS.forEach(modal => {
  modal.addEventListener('click', event => {
    const isModal = event.target.parentElement.classList.contains('modal__close');

    if (isModal) {
      UI_ELEMENTS.MODALS.forEach(modal => {
        modal.classList.remove('overlay-visible');
      });
    };
  });
});

UI_ELEMENTS.MODAL_TOGGLES.forEach(button => {
  button.addEventListener('click', event => {
    const path = event.target.getAttribute('data-path');

    UI_ELEMENTS.MODALS.forEach(modal => {
      modal.classList.remove('overlay-visible');
    });

    document.querySelector(`[data-target=${path}]`).classList.add('overlay-visible');
  });
});