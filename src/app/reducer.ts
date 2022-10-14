import { combineReducers } from 'redux';
import selectedCellsSlice from './slices/selectedCellsSlice';


export const rootReducer = combineReducers({
  selectedCells: selectedCellsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
