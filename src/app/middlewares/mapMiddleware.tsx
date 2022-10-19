import { Middleware } from 'redux';
import {
  connectionEstablished,
  receiveMessage,
  sendMessage,
  startConnecting
} from '../slices/mapSlice';

const url = 'wss://hometask.eg1236.com/game1/';

const mapMiddleware: Middleware = store => {
  let socket: WebSocket;

  return next => action => {
    const isConnectionEstablished = socket && store.getState().map.isConnected;

    if (startConnecting.match(action)) {
      socket = new WebSocket(url);
    }

    socket.onopen = () => {
      store.dispatch(connectionEstablished());
      socket.send(`new ${store.getState().map.level}`);
    };

    socket.onmessage = (event) => {
      const message = event.data;

      if (message === 'new: OK' || message === 'open: OK') {
        socket.send('map');
      }

      store.dispatch(receiveMessage(message));
    }

    if (sendMessage.match(action) && isConnectionEstablished) {
      socket.send(action.payload.content);
    }

    next(action);
  };
}

export default mapMiddleware;
