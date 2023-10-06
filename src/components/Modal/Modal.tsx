import React from 'react';
import cl from './Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { UserSliceState, openWindow } from '../redux/slices/usersSlice';
import { RootState, useAppDispatch } from '../redux/store';


type PostType = {
  name:string;
  username:string;
}


interface ModaProps{
  changePost: ({}:PostType) => void;
  // changeError:({}:string)=>void; 
  changeError:({})=>void; 
children:React.ReactChild | React.ReactNode
  
}


const Modal:React.FC<ModaProps> = ({ children, changeError, changePost }) => {

  const dispatch = useAppDispatch();
  const openModal = useSelector((store:RootState) => store.users.isModal);
  const rootClasses = [cl.myModal];
  if (openModal) {
    rootClasses.push(cl.active);
  }
  const rootClassesContent = [cl.myModalContent];
  if (openModal) {
    rootClassesContent.push(cl.active);
  }

  const closeModal = () => {
    changeError('');
  changePost({ name: '', username: '' });
    dispatch(openWindow(false));
  };
  return (
    <div className={rootClasses.join(' ')} onClick={closeModal}>
      <div className={rootClassesContent.join(' ')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
