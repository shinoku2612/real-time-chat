import { createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from './ui-slice';
import * as searchService from '../services/search';

const INIT_STATE = {
  users: [],
  status: 'idle',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: INIT_STATE,
  reducers: {
    setUser(state, action) {
      state.users = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetStatus(state) {
      state.status = 'idle';
    },
  },
});

export const search = (name) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const { data } = await searchService.searchUser(name);
    dispatch(setUser(data));
    dispatch(setStatus('search-user/success'));
  } catch (error) {
    console.log(`search error ${error}`);
    dispatch(setStatus('search-user/failed'));
  } finally {
    dispatch(hideLoading());
  }
};

export const { setUser, setStatus, resetStatus } = searchSlice.actions;
export default searchSlice.reducer;
