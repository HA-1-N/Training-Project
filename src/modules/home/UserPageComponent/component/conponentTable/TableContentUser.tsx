import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Grid } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setInfoUser } from '../../../redux/InfoReducer';
import { fetchThunk } from '../../../../common/redux/thunk';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ButtonDeleteItem = styled.button`
    display: inline-block;  
    height: 40px;
    width: 40px;
    background: #b18aff;
    color: #fff;
    border-radius: 3px;
    border: 1px solid #b18aff;
    font-size: 15px;
    text-align: center;
    outline: none;
    margin-right: 6px;
`;

const ButtonDelete = styled.button`
    opacity: 0.65;
    min-width: 150px;
    min-height: 35px;
    color: #fff;
    background-color: #f0ad4e;
    border: 1px solid #eea236;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    text-transform: none;
    font-weight: 500;  

    &:hover{
        cursor: pointer;
        color: #1b1b38;
    }
`;

interface Data {
    vendor: string;
    storeName?: string;
    fistName: string;
    lastName?: string;
    access_level: string;
    product: number;
    order: any;
    order_as_buyer?: number;
    order_as_buyer_total?: number;
    wishlist: string;
    created: string;
    last_login: string;
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [

    {
        id: 'vendor',
        numeric: false,
        disablePadding: true,
        label: 'Login/Email',
    },
    {
        id: 'fistName',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'access_level',
        numeric: false,
        disablePadding: false,
        label: 'Access level',
    },
    {
        id: 'product',
        numeric: false,
        disablePadding: false,
        label: 'Product',
    },
    {
        id: 'order',
        numeric: false,
        disablePadding: false,
        label: 'Order',
    },

    {
        id: 'wishlist',
        numeric: false,
        disablePadding: false,
        label: 'Wishlist',
    },
    {
        id: 'created',
        numeric: false,
        disablePadding: false,
        label: 'Created',
    },
    {
        id: 'last_login',
        numeric: false,
        disablePadding: false,
        label: 'Last Login',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                <TableCell></TableCell>
                {headCells?.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
}

const TableContentUser = (
    {
        handleFilterTableChange,
        valueFilterList,
        getUserDataTable,
    }: any) => {

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const userData: any = useSelector((storeUser: any) => storeUser?.infoUser?.infoUser);

    const [loading, setLoading] = React.useState(false);

    const orders = userData?.map((user: any) => user?.order);

    const [totalUserData, setTotalUserData] = React.useState(userData);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('last_login');
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = totalUserData?.map((n: any) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, profile_id: string) => {

        const selectedIndex = selected.indexOf(profile_id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, profile_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        // changePage(newPage);
        // console.log(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected?.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalUserData?.length) : 0;

    const handleDeleteCheck = () => {
        const newUsers = totalUserData.filter((user: any) => !selected.includes(user.profile_id));
        setTotalUserData(newUsers);
    };

    const handleChangePagiantion = (event: unknown, newPage: number) => {
        const newData = {
            ...valueFilterList,
            page: newPage,
        }
        getUserDataTable(newData);
    }

    const handleChangePerPage = (fieldName?: string, fieldValue?: string) => (e: any) => {
        handleFilterTableChange(fieldName, fieldValue || e?.target?.value || '');
        const newData = {
            ...valueFilterList,
            count: e.target.value,
        }
        getUserDataTable(newData);
    }

    React.useEffect(() => {
        setTotalUserData(userData);
    }, [userData]);

    const onChangeForm = (fieldName?: string, fieldValue?: string) => (e?: any) => {
        handleFilterTableChange(fieldName, fieldValue || e?.target?.value || '');
    }

    return (
        <>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Paper sx={{ width: '100%', mb: 2, height: 'auto' }}>
                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                    <TableContainer sx={{ height: 'auto' }}>
                        <Table
                            sx={{ minWidth: 750, height: 'auto' }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={totalUserData?.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(totalUserData, getComparator(order, orderBy))
                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    ?.map((user: any, index: any) => {
                                        const isItemSelected = isSelected(user?.profile_id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={user.profile_id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, user?.profile_id)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ padding: '0', }}>
                                                    <div style={{ borderLeft: '1.5px dashed #bbb', height: '30px' }}></div>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Link
                                                        to={`/user-detail/${user.profile_id}`}
                                                        style={{
                                                            margin: '0',
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        {user.vendor}
                                                    </Link>

                                                    <p style={{ margin: '0' }}>
                                                        {user.storeName}
                                                    </p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <span>{user?.fistName}</span>
                                                    <span>{' '}</span>
                                                    <span>{user?.lastName}</span>
                                                </TableCell>
                                                <TableCell align="left">{user?.access_level}</TableCell>
                                                <TableCell align="left">{user?.product}</TableCell>
                                                <TableCell align="left">
                                                    <div>
                                                        {(Number(user?.order?.order_as_buyer) + Number(user?.order?.order_as_buyer_total))}
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left">{user?.wishlist}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%' }}>
                                                    <Moment unix style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}>
                                                        {user?.created}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell align="left" sx={{ width: '10%', }}>
                                                    <Moment unix
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient: 'vertical',
                                                        }}
                                                    >
                                                        {user?.last_login}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell align="right" sx={{ width: '6%', }}>
                                                    <Grid sx={{ borderLeft: '1.5px dashed #bbb', }}>
                                                        <Grid>
                                                            <ButtonDeleteItem
                                                                onClick={(event) => handleClick(event, user?.profile_id)}
                                                            >
                                                                <FaTrash />
                                                            </ButtonDeleteItem>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 75, 100]}
                        component="div"
                        count={totalUserData?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}

                    <div
                        style={{
                            display: 'flex',
                            padding: '1.2rem 0.6rem',
                        }}
                    >
                        <Pagination
                            count={10}
                            color="secondary"
                            onChange={handleChangePagiantion}
                        />

                        {/* <select
                            className="form-select"
                            aria-label="Default select example"
                            style={{ width: '10%' }}
                            name='count'
                            onChange={(e) => handleChangePerPage('count')(e)}
                        >
                            <option value="10">10</option>
                            <option selected>25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                        </select> */}
                    </div>
                </Paper>
            </Box >

            {selected.length === 0
                ?
                (<ButtonDelete onClick={handleDeleteCheck}>Remove Selected</ButtonDelete>)
                : (<ButtonDelete style={{ opacity: 1 }} onClick={handleDeleteCheck}>Remove Selected</ButtonDelete>)
            }
        </>
    );
}

export default TableContentUser;