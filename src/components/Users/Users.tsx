import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from './UsersList';

import { ListType, UserSliceState, remove, search } from '../redux/slices/usersSlice';
import { fetchUsers } from '../redux/slices/ActionCreators';
import UsersAdd from './actions/UsersAdd';
import UsersSearch from './actions/UsersSearch';
import UsersSort from './actions/UsersSort';
import { v4 as uuidv4 } from 'uuid';
import { RootState, useAppDispatch } from '../redux/store';

const Users:React.FC  = () => {
  const dispatch = useAppDispatch();
  const usersList = useSelector((store:RootState) => store.users.list);
  const loadError = useSelector((store:RootState) => store.users.error);
  const isLoading = useSelector((store:RootState) => store.users.isLoading);
  const searchList = useSelector((store:RootState) => store.users.searchList);
  const [searchValue, setSearchValue] = useState('');
  const [sortOpen, setSortOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const deleteUser = (user:number) => {
    dispatch(remove(user));
    
    
  };
  useEffect(() => {
    dispatch(search(searchValue));
  }, [usersList, searchValue]);

  return (
    <div onClick={() => setSortOpen(false)} className='container'>
      <UsersAdd
      />
      {isLoading && <h1 className='is__loading'>Loading....</h1>}
      <p className='load__error'> {loadError}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '60px',
        }}
      >
        <div className='search__item'>
          <UsersSearch searchValue={searchValue} changeSearchValue={setSearchValue} />
        </div>
        <div>
          <UsersSort setSortOpen={setSortOpen} sortOpen={sortOpen} />
        </div>
      </div>
      {searchList.length !== 0 ? (
        <div>
          {searchList.map((user:ListType, index:number) => (
            <UsersList key={uuidv4()} number={index + 1} user={user} remove={deleteUser} />
          ))}
        </div>
      ) : (
        <h1>Users not found</h1>
      )}
    </div>
  );
};

export default Users;
