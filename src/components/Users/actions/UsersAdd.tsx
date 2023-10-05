import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { add, openWindow } from '../../redux/slices/usersSlice';
import Modal from '../../Modal/Modal';
import { RootState } from '../../redux/store';

const UsersAdd:React.FC = () => {
  const [post, setPost] = useState({ name: '', username: '' });
  const dispatch = useDispatch();
  const [error, setError] = useState<{errorName?:string; errorUserName?:string;}>( );
  const openModal = useSelector((store:RootState) => store.users.isModal);

  const addUser = (name:string, username:string) => {
    const newUser = {
      id: Date.now(),
      name,
      username,
    };
    if (post.name.length > 3 && post.username.length > 3) {
      dispatch(add(newUser));
      setPost({ name: '', username: '' });
      setError({ errorName: '', errorUserName: '' });
      dispatch(openWindow(false));
    }
    if (newUser.username.length <= 3) {
      setError({errorUserName: 'Enter username' });
    }
    if (newUser.name.length <= 3) {
      setError({errorName: 'Enter name' });
    }
  };
  useEffect(() => {
    if (post.name.length > 3) {
      setError({ errorName: '' });
    }
  }, [post.name]);

  useEffect(() => {
    if (post.username.length > 3) {
      setError({ errorUserName: '' });
    }
  }, [post.username]);

  return (
    <div>
      <div style={{ marginBottom: '50px' }}>
        <button className='button' onClick={() => dispatch(openWindow(!openModal))}>
          Add Users
        </button>
      </div>
      {openModal &&  (
        <Modal  changeError={setError} changePost={setPost}>
          <div className='add__form'>
            <div className='form__item'>
              {error && <p className='error'>{error.errorName}</p>}
        
                <input
                  className={error.errorName ? 'input__error' : 'input'}
                  value={post.name}
                  onChange={(e) => setPost({ ...post, name: e.target.value })}
                  placeholder='Enter name'
                  type='text'
                />
         </div>
            <div className='form__item'>
              {error &&   <p className='error'>{error.errorUserName}</p>}
              <input
                className={error.errorUserName ? 'input__error' : 'input'}
                value={post.username}
                onChange={(e) => setPost({ ...post, username: e.target.value })}
                placeholder='Enter username'
                type='text'
              />
            </div>
            <button className='button' onClick={() => addUser(post.name, post.username)}>
              Add
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default UsersAdd;
