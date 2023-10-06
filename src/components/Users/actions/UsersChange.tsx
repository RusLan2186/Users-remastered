import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ListType, change } from '../../redux/slices/usersSlice';
import { useAppDispatch } from '../../redux/store';


interface UsersChangeProps{
  user:ListType;
  // isChange?:boolean;
  setIsChange:(isChange:boolean) =>void;
}


const UsersChange:React.FC<UsersChangeProps> = ({ user, setIsChange }) => {
  const dispatch = useAppDispatch();
  const [changePost, setChangePost] = useState<{}>({
    changeName: user.name,
    changeUserName: user.username,
  });
  
  const [changeError, setChangeError] = useState<
    { changeErrorName?: string; changeErrorUserName?:string; }
  >();

  const changeUsers = (id:number) => {
    if (changePost.changeName.length > 3 && changePost.changeUserName.length > 3) {
      dispatch(change({ id, name: changePost.changeName, username: changePost.changeUserName }));
      setIsChange(false);
      setChangeError({ changeErrorName: '', changeErrorUserName: '' });
    }
    if (changePost.changeUserName.length <= 3) {
      setChangeError({ changeErrorUserName: 'Enter username' });
    }
    if (changePost.changeName.length <= 3) {
      setChangeError({ changeErrorName: 'Enter name' });
    }
  };

  useEffect(() => {
    if (changePost.changeName.length > 3) {
      setChangeError({ changeErrorName: '' });
    }
  }, [changePost.changeName]);

  useEffect(() => {
    if (changePost.changeUserName.length > 3) {
      setChangeError({ changeErrorUserName: '' });
    }
  }, [changePost.changeUserName]);
  return (
    <div className='add__change-form'>
      <div className='change-form__item'>
        <p className='change__error'>{changeError.changeErrorName}</p>
        <input
          className={changeError.changeErrorName ? 'input__error' : 'input'}
          value={changePost.changeName}
          onChange={(e) => setChangePost({ ...changePost, changeName: e.target.value })}
          type='text'
        />
      </div>
      <div className='change-form__item'>
        <p className='change__error'>{changeError.changeErrorUserName}</p>
        <input
          className={changeError.changeErrorUserName ? 'input__error' : 'input'}
          value={changePost.changeUserName}
          onChange={(e) => setChangePost({ ...changePost, changeUserName: e.target.value })}
          type='text'
        />
      </div>
      <button className='button' onClick={() => changeUsers(user.id)}>
        Save
      </button>
      <button className='button' onClick={() => setIsChange(false)}>
        Cancel
      </button>
    </div>
  );
};

export default UsersChange;
