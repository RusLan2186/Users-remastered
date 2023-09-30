import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
  error: '',
  isModal: false,
  searchList: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersFetching: (state) => {
      state.isLoading = true;
    },
    usersFetchingSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.list = action.payload;
    },
    usersFetchingError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    add: (state, action) => {
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      const idx = state.list.findIndex((i) => {
        return i.id === action.payload;
      });
      if (idx !== -1) {
        state.list.splice(idx, 1);
      }
    },
    change: (state, action) => {
      const idxChange = state.list.findIndex((i) => {
        return i.id === action.payload.id;
      });
      if (idxChange !== -1) {
        state.list[idxChange].name = action.payload.name;
        state.list[idxChange].username = action.payload.username;
      }
    },
    search: (state, action) => {
      state.searchList = state.list.filter(
        (user) =>
          user.name.toLowerCase().includes(action.payload) ||
          user.username.toLowerCase().includes(action.payload),
      );
    },
    sort: (state, action) => {
      state.list = action.payload;
    },
    openWindow: (state, action) => {
      state.isModal = action.payload;
    },
  },
});

export const {
  add,
  remove,
  change,
  search,
  usersFetching,
  usersFetchingSuccess,
  usersFetchingError,
  sort,
  openWindow,
} = usersSlice.actions;

export default usersSlice.reducer;
