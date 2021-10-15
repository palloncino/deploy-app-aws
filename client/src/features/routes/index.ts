import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RouteState {
  current: string;
}

const initialState: RouteState = {
  current: '/',
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    changeRoute: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

export const selectRoute = (state: any) => state.route?.current;

export const { changeRoute } = routeSlice.actions;

export default routeSlice.reducer;
