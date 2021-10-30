import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
// import { Singleton as Authentication } from '../../../auth';

export interface PostsState {
  data: any;
}

const initialState: PostsState = {
  data: [],
};

export const getPosts = createAsyncThunk('POSTS/GET_DATA', async () => {
  // const auth = Authentication.getInstance();
  // const access_token = auth.getProp('token');

  let defaultHeaders = {
    'Content-Type': 'application/json',
  };

  let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/posts/get-posts`;

  let options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      // Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(URL, options);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const selectPosts = (state: RootState) => state.posts.data;

export default postsSlice.reducer;
