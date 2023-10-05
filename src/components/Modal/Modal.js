import React from 'react';
import cl from './Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openWindow } from '../redux/slices/usersSlice';

const Modal = ({ children, changeError, changePost }) => {
  const dispatch = useDispatch();
  // const openModal = useSelector((store) => store.users.isModal);
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
