import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import postsReducer from '../features/pages/posts/postsSLice';
import routeReducer from '../features/routes';
import authReducer from '../auth/authSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    route: routeReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
