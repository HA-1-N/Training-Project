import React, { useCallback, useEffect } from 'react';
import TableContent from './componentTable/TableContent';

const ProductDataTable = (
    {
        valueFilterList,
        handleChangeItem,
        onUpdate,
        postProductFilter,
    }: any) => {

    return (
        <>
            <TableContent
                valueFilterList={valueFilterList}
                handleChangeItem={handleChangeItem}
                onUpdate={onUpdate}
                postProductFilter={postProductFilter}
            />
        </>
    );
};

export default ProductDataTable;