import { useState } from 'react';

import UsersChange from './actions/UsersChange';
import { ListType } from '../redux/slices/usersSlice';

interface UsersListProps{
  number:number;
  user:ListType;
  remove:(user:number) =>void; 
}


const UsersList:React.FC <UsersListProps> = ({ user, number, remove }) => {
  const [isChange, setIsChange] = useState<boolean>(false);

  return (
    <div className={isChange ? '' : 'user__list user-list'}>
      {isChange ? (
        <div>
          <UsersChange user={user} setIsChange={setIsChange} />
        </div>
      ) : (
        <div className='user-list__item'>
          <div className='user-list__info'>
            <span className='user-list__number'> {number}.</span>
            <span className='user-list__name'> {user.name}</span>
            <span className='user-list__username'> {user.username}</span>
          </div>
          <div className='user-list__buttons'>
            <button className='button' onClick={() => remove(user.id)}>
              Delete
            </button>
            <button className='button' onClick={() => setIsChange(!isChange)}>
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
