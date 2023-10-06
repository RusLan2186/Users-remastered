import axios from 'axios';
import { ListType,  usersFetching, usersFetchingError, usersFetchingSuccess } from './usersSlice';
import { AppDispatch } from '../store';


export const fetchUsers   = () => async (dispatch:AppDispatch) => {
  try {
    dispatch(usersFetching());
    const response = await axios.get<ListType[]>('https://js2onplaceholder.typicode.com/users?_limit=5');
dispatch(usersFetchingSuccess(response.data));
  } catch (e:any) {
    dispatch(usersFetchingError(e.message));
       }
};
