import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SelectedCells {
  value: any[],
}

const initialState: SelectedCells = {
  value: [],
};

export const selectedCellsSlice = createSlice({
  name: 'selectedCells',
  initialState,
  reducers: {
    updateMap: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    }
  },
});

export const selectCount = (state: RootState) => state.selectedCells.value;

export default selectedCellsSlice.reducer;
