import React from 'react';
import TableContentUser from './conponentTable/TableContentUser';

const UserDataTable = ({
  handleClickCheck,
  getUserData,
  handleFilterListChange,
  valueFilterList,
  postDeleteUser,
}: any) => {
  return (
    <>
      <div>
        <TableContentUser
          getUserDataTable={getUserData}
          handleClickCheckHidden={handleClickCheck}
          handleFilterTableChange={handleFilterListChange}
          valueFilterList={valueFilterList}
          postDeleteUser={postDeleteUser}
        />
      </div>
    </>
  );
};

export default UserDataTable;
