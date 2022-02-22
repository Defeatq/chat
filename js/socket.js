import Cookies from "js-cookie";
import { URLS } from "./urls.js";
import { checkValidToken } from "./auth.js";
import { renderOtherMessage } from "./view.js";

export const socket = new WebSocket(`${URLS.SOCKET}?${Cookies.get('token')}`);

export function listeningSocket() {
  try {
    socket.onmessage = function(event) {
      const {text: message, user, createdAt: time} = JSON.parse(event.data);

      checkValidToken(data => {
        if (user.email !== data.email) {
          renderOtherMessage(message, user.name, new Date(time));
        }
      })
    };
  } catch(error) {
    throw new Error(error);
  }
};

export function sendSocketData(data) {
  try {
    socket.send(data);
  } catch(error) {
    throw new Error(error);
  }
}