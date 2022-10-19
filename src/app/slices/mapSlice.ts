import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IMapState {
  map: Array<string[]>,
  message: string,
  isConnected: boolean,
  isEstablishingConnection: boolean,
}

const initialState: IMapState = {
  map: [],
  message: '',
  isConnected: false,
  isEstablishingConnection: false,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    startConnecting: ((state) => {
      state.isEstablishingConnection = true;
    }),
    connectionEstablished: ((state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    }),
    receiveMessage: ((state, action: PayloadAction<string>) => {
      const keyForMap = action.payload.split('').splice(0, 3).join('');
      const message = action.payload.split(' ').splice(0, 3).join(' ');

      if (message === 'open: You lose' || message === 'open: You win.') {
        state.message = message.split(' ').splice(1, 3).join(' ');
      }

      if (keyForMap === 'map') {
        let map: any = action.payload.split('\n');
        map = map.slice(1, map.length - 1).map((el: string) => el.split(''));
        state.map = map;
        state.message = '';
      }

    }),
    sendMessage: ((state, action: PayloadAction<{ content: string }>) => {
      return;
    }),
  }
});

export const {
  startConnecting,
  connectionEstablished,
  receiveMessage,
  sendMessage,
} = mapSlice.actions;
export const map = (state: RootState) => state.map;
export default mapSlice.reducer;

