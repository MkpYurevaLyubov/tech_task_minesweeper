import { combineReducers } from 'redux';
import selectedCellsSlice from './slices/selectedCellsSlice';
import mapSlice from "./slices/mapSlice";

export const rootReducer = combineReducers({
  map: mapSlice,
  selectedCells: selectedCellsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
