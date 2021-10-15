import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MenuState {
  isOpen: boolean;
}

const initialState: MenuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

export const selectIsOpen = (state: RootState) => state.menu.isOpen;

export default menuSlice.reducer;
