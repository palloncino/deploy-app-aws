import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RouteState {
  current: string;
  focusedItem: string;
}

const initialState: RouteState = {
  current: '/',
  focusedItem: '',
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    changeRoute: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    setFocusItemId: (state, action: PayloadAction<string>) => {
      state.focusedItem = action.payload;
    },
  },
});

export const selectRoute = (state: any) => state.route?.current;
export const selectFocusedItem = (state: any) => state.route?.focusedItem ?? '';

export const { changeRoute, setFocusItemId } = routeSlice.actions;

export default routeSlice.reducer;
