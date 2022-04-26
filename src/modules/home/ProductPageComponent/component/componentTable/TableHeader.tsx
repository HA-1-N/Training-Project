import React from 'react';
import {
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    TableSortLabel,
} from '@mui/material';

const TableHeader = ({ orderDirection, valueToOrderBy, handleRequestSort }: any) => {

    const createSortHandler = (property: any) => (event: any) => {
        handleRequestSort(event, property);
    }


    return (
        <>
            <TableHead >
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                            // checked={rowCount > 0 && numSelected === rowCount}
                            // onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>

                    <TableCell>
                        {''}
                    </TableCell>

                    <TableCell >
                        <TableSortLabel
                            active={valueToOrderBy === "sku"}
                            direction={valueToOrderBy === "sku" ? orderDirection : 'asc'}
                            onClick={createSortHandler("sku")}
                        >
                            SKU
                        </TableSortLabel>
                    </TableCell>

                    <TableCell >
                        <TableSortLabel
                            active={valueToOrderBy === "name"}
                            direction={valueToOrderBy === "name" ? orderDirection : 'asc'}
                            onClick={createSortHandler("name")}
                        >
                            Name
                        </TableSortLabel>
                    </TableCell>

                    <TableCell>
                        Category
                    </TableCell>

                    <TableCell >
                        <TableSortLabel
                            active={valueToOrderBy === "price"}
                            direction={valueToOrderBy === "price" ? orderDirection : 'asc'}
                            onClick={createSortHandler("price")}
                        >
                            Price
                        </TableSortLabel>
                    </TableCell>

                    <TableCell >
                        <TableSortLabel
                            active={valueToOrderBy === "amount"}
                            direction={valueToOrderBy === "amount" ? orderDirection : 'asc'}
                            onClick={createSortHandler("amount")}
                        >
                            In Stock
                        </TableSortLabel>
                    </TableCell>

                    <TableCell >
                        <TableSortLabel
                            active={valueToOrderBy === "vendor"}
                            direction={valueToOrderBy === "vendor" ? orderDirection : 'asc'}
                            onClick={createSortHandler("vendor")}
                        >
                            Vendor
                        </TableSortLabel>
                    </TableCell>

                    <TableCell >
                        <TableSortLabel
                            active={valueToOrderBy === "arrivalDate"}
                            direction={valueToOrderBy === "arrivalDate" ? orderDirection : 'asc'}
                            onClick={createSortHandler("arrivalDate")}
                        >
                            Arrival Date
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
        </>
    );
};

export default TableHeader;