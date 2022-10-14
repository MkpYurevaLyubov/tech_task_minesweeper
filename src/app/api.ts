import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = 'wss://hometask.eg1236.com/game1/';

export const api = createApi({
  async baseQuery({ data }: { data: string }) {
    console.log('data', data)
    return { data: {} };
  },
  endpoints: (build) => ({
    // getMessage: build.mutation({ query(message: string) {
    //   return { map: message }
    // }}),
    channel: build.query<{ map: any[] }, string>({
      queryFn() {
        return { data: { map: [] } }
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = new WebSocket(url);
        try {
          await cacheDataLoaded;
          socket.onopen = () => {
            socket.send(arg);
          };

          socket.onmessage = (event: any) => {
            const message = event.data;
            const key = message.split('').splice(0, 3).join('');

            console.log('message', message);
            if (message === 'new: OK' || message === 'open: OK') {
              socket.send('map');
            }

            if (key === "map") {
              let map: any = message.split('\n');
              map = map.slice(1, map.length - 1).map((el: string) => el.split(''));

              updateCachedData((currentCacheData) => {
                currentCacheData.map.push([ ...map ]);
              });
            }
          }

        } catch {}
        await cacheEntryRemoved
        socket.onclose = () => {
          console.log("Соединение закрыто")
        };
      },
    }),
  }),
});

export const { useChannelQuery } = api;
