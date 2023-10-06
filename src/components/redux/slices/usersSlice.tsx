import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ListType = {
id:number;
name:string;
username:string;
email?:string;
adress?:{};
}

export interface UserSliceState{
  list:ListType[];
  isLoading:boolean;
  error?: string;
isModal:boolean;
  searchList:ListType[];
}

const initialState:UserSliceState = {
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
    usersFetchingSuccess: (state, action:PayloadAction<ListType[]>) => {
      state.isLoading = false;
      state.error ='';
      state.list = action.payload;

    },
    usersFetchingError: (state, action:PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
     },

    add: (state, action:PayloadAction<ListType>) => {
      state.list.push(action.payload);
    },

    remove: (state, action:PayloadAction<number>) => {
      const idx = state.list.findIndex((i) => {
        return i.id === action.payload;
      });
      if (idx !== -1) {
        state.list.splice(idx, 1);
      }
    },
    change: (state, action:PayloadAction<ListType>) => {
      const idxChange = state.list.findIndex((i) => {
        return i.id === action.payload.id;
      });
      if (idxChange !== -1) {
        state.list[idxChange].name = action.payload.name;
        state.list[idxChange].username = action.payload.username;
      }
    },
    search: (state, action:PayloadAction<string>) => {
      state.searchList = state.list.filter(
        (user) =>
          user.name.toLowerCase().includes(action.payload) ||
          user.username.toLowerCase().includes(action.payload),
      );
    },
    sort: (state, action:PayloadAction<ListType[]> ) => {
      state.list = action.payload;
  
      
    },
    openWindow: (state, action:PayloadAction<boolean>) => {
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
