import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SelectedCells {
  selectedArr: string[],
}

const initialState: SelectedCells = {
  selectedArr: [],
};

export const selectedCellsSlice = createSlice({
  name: 'selectedCells',
  initialState,
  reducers: {
    addFlag: (state, action: PayloadAction<{ selected: string }>) => {
      const selected = action.payload.selected;
      if (state.selectedArr.includes(selected)) {
        state.selectedArr = state.selectedArr.filter((el: string) => el !== selected);
      } else {
        state.selectedArr.push(action.payload.selected);
      }
    }
  },
});

export const { addFlag } = selectedCellsSlice.actions;
export const selectCount = (state: RootState) => state.selectedCells;
export default selectedCellsSlice.reducer;
