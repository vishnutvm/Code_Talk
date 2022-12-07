/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

export const userAuthSlice = createSlice({
  name: 'userauth',
  initialState,
  reducers: {
    // togle light and dark mood
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    // user login setting sate for user details and token
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // user Logout clearing token and user state
    setLogout: (state) => {
      // eslint-disable-next-line no-sequences
      (state.user = null), (state.token = null);
    },

    // update frieds
    setFriends: (state, action) => {
      // state.user.friends = action.payload.friends;
      const { user } = state;
      user.friends = action.payload.friends;
      state.user = user;
    },

    // update post
    setPosts: (state, action) => {
      state.posts = action.payload.posts.reverse();
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;

        return post;
      });

      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      let { posts } = state;
      console.log(posts);
      console.log('on this step');

      const updatedPost = posts.filter(
        (post) => post._id !== action.payload.id,
      );
      posts = updatedPost;
      return { ...state, posts };
    },
  },
});

export const {
  setPosts,
  setPost,
  setFriends,
  setMode,
  setLogin,
  setLogout,
  deletePost,
} = userAuthSlice.actions;
export default userAuthSlice.reducer;
