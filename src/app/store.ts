import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import mapMiddleware from './middlewares/mapMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware => {
    return getDefaultMiddleware().concat(mapMiddleware);
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
