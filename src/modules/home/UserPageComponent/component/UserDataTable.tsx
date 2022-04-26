import React from 'react';
import TableContentUser from './conponentTable/TableContentUser';

const UserDataTable = ({
    handleClickCheck,
    getUserData,
    handleFilterListChange,
    valueFilterList,
}: any) => {
    return (
        <>
            <div>
                <TableContentUser
                    getUserDataTable={getUserData}
                    handleClickCheckHidden={handleClickCheck}
                    handleFilterTableChange={handleFilterListChange}
                    valueFilterList={valueFilterList}
                />
            </div>
        </>
    );
};

export default UserDataTable;