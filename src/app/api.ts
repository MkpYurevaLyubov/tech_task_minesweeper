import { createApi } from '@reduxjs/toolkit/query/react';

const url = 'wss://hometask.eg1236.com/game1/';

let socket: WebSocket;

export const api = createApi({
  async baseQuery({ message }: { message: string }) {
    socket.send(message);
    return { data: {} };
  },
  endpoints: (build) => ({
    sendMessage: build.mutation<unknown, { message: string }>({
      query({ message }) {
        return { message };
      },
    }),
    channel: build.query<{ map: any[] }, string>({
      queryFn() {
        return { data: { map: [] } }
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        if (!socket) {
          socket = new WebSocket(url);
        }
        try {
          await cacheDataLoaded;
          socket.onopen = () => {
            socket.send(arg);
          };

          socket.onmessage = (event: any) => {
            const message = event.data;
            const key = message.split('').splice(0, 3).join('');

            if (message === 'new: OK' || message === 'open: OK') {
              socket.send('map');
            }

            if (key === 'map') {
              let map: any = message.split('\n');
              map = map.slice(1, map.length - 1).map((el: string) => el.split(''));

              updateCachedData((currentCacheData) => {
                currentCacheData.map = map;
              });
            }
          }

        } catch {}
        await cacheEntryRemoved;
        socket.onclose = () => {
          console.log('Соединение закрыто');
        };
      },
    }),
  }),
});

export const { useChannelQuery, useSendMessageMutation } = api;
