import React from 'react';
import clsx from 'clsx';
import { BsArrowLeftCircle } from 'react-icons/bs';

import styles from '../../../css/UserPageAdd.module.css';
import FormAddUser from './FormAddUser';

const UserPageAdd = ({ showUserAddPage, handleClick, getUserData, setShowUserAddPage }: any) => {
  return (
    <>
      {!!showUserAddPage && (
        <div className={clsx(styles.userPageAdd)}>
          <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapHeader)}>
              <button className={clsx(styles.btn)} onClick={handleClick}>
                <BsArrowLeftCircle />
              </button>

              <h1 className={clsx(styles.title)}>Create Profile</h1>
            </div>

            <div className={clsx(styles.formAddUser)}>
              <FormAddUser
                getUserDataTable={getUserData}
                setShowUserAddPageClick={setShowUserAddPage}
                showUserAddPage={showUserAddPage}
              />
            </div>

            <div className={clsx(styles.footerContainer)}>
              {/* <div className={clsx(styles.width)}></div>
                            <div className={clsx(styles.wrapBtnFooter)}>
                                <button className={clsx(styles.btnCreate)}>Create account</button>
                            </div>
                            <div className={clsx(styles.width)}></div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPageAdd;
