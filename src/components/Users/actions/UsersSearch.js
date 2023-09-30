import { useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { search } from '../../redux/slices/usersSlice';

const UsersSearch = ({ searchValue, changeSearchValue }) => {
  const inputRef = useRef();

  // const dispatch = useDispatch();
  // const usersList = useSelector((store) => store.users.list);

  const clearInput = () => {
    changeSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className='search__form'>
      <p className={searchValue ? 'search-input__clear ' : 'hidden'} onClick={clearInput}>
        X
      </p>
      <input
        className='input'
        value={searchValue}
        onChange={(e) => changeSearchValue(e.target.value)}
        type='text'
        placeholder='Search....'
        ref={inputRef}
      />
    </div>
  );
};

export default UsersSearch;
