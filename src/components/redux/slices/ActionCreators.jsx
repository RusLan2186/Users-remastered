import axios from 'axios';
import { ListType,  usersFetching, usersFetchingError, usersFetchingSuccess } from './usersSlice';

export const fetchUsers   = () => async (dispatch) => {
  try {
    dispatch(usersFetching());
    // const response = await axios.get<ListType[]>('https://jsonplaceholder.typicode.com/users?_limit=5');
    const response = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=5');
    dispatch(usersFetchingSuccess(response.data));
  } catch (e) {
    dispatch(usersFetchingError(e.message));
  }
};
