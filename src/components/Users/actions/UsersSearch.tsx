import { useRef } from 'react';



interface searchProps{
  searchValue:string;
  changeSearchValue:(searchValue:string) =>void;
}

const UsersSearch:React.FC<searchProps> = ({ searchValue, changeSearchValue }) => {
  const inputRef = useRef<HTMLInputElement>(null);



  const clearInput = (e:React.MouseEvent<HTMLParagraphElement>) => {
    changeSearchValue('');
    inputRef.current?.focus();
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
