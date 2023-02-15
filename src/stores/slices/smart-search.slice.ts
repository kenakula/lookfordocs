import { createSlice } from '@reduxjs/toolkit';

interface SmartSearchState {
  opened: boolean;
}

const initialState: SmartSearchState = {
  opened: false,
};

export const smartSearchSlice = createSlice({
  name: 'smartSearch',
  initialState,
  reducers: {
    openSmartSearch: state => {
      state.opened = true;
    },
    closeSmartSearch: state => {
      state.opened = false;
    },
  },
});

export const { openSmartSearch, closeSmartSearch } = smartSearchSlice.actions;
export const smartSearchReducer = smartSearchSlice.reducer;
