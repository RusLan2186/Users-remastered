import { useState } from 'react';
import {useSelector } from 'react-redux';
import { sort } from '../../redux/slices/usersSlice';
import { RootState, useAppDispatch } from '../../redux/store';

interface SortOpenProps{
  sortOpen:boolean;
  setSortOpen:(sortOpen:boolean) =>void;
}


const UsersSort:React.FC<SortOpenProps> = ({ sortOpen, setSortOpen }) => {
  const [sortTitle, setSortTitle] = useState<string>('name');
  const users = useSelector((store:RootState) => store.users.list);
  const dispatch = useAppDispatch();
  const sortBy = (field:string) => {
    let result;
    if (field === 'name') {
      result = [...users].sort((a, b) => {
        if (a['name'].toLowerCase() < b['name'].toLowerCase()) return -1;
      });
    }
    if (field === 'username') {
      result = [...users].sort((a, b) => {
        if (a['username'].toLowerCase() < b['username'].toLowerCase()) return -1;
      });
    }

    setSortTitle(field);
    dispatch(sort(result));
    setSortOpen(false);
  };

  return (
    <div className='sort__wrapper' onClick={(e) => e.stopPropagation()}>
      <p className='sort__title' onClick={() => setSortOpen(!sortOpen)}>
        SortBy: <span>{sortTitle}</span>
      </p>
      {sortOpen && (
        <ul className='sort__list'>
          <li onClick={() => sortBy('name')}>name</li>
          <li onClick={() => sortBy('username')}>username</li>
        </ul>
      )}
    </div>
  );
};

export default UsersSort;
