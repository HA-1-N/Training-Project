import * as React from 'react';
import { AnyIfEmpty, useDispatch, useSelector } from 'react-redux';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { ButtonProps, Grid, Modal, Pagination, Stack } from '@mui/material';
import styled from 'styled-components';
import { FaTrash, FaPowerOff } from 'react-icons/fa';
import { purple } from '@mui/material/colors';
import Moment from 'react-moment';
import axios from 'axios';
import { API_PATHS } from '../../../../../configs/api';
import { setInfoProduct } from '../../../redux/InfoReducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../../../redux/reducer';
import { fetchThunk } from '../../../../common/redux/thunk';
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

const ButtonPowerOffItem = styled.button`
    display: inline-block;  
    height: 40px;
    width: 40px;
    background: transparent;
    color: #28a745;
    font-size: 18px;
    text-align: center;
    border: none;
    outline: none;
`;

const ButtonYes = styled.button`
    background-image: linear-gradient(90deg,#b18aff,#a16eff);
    border: none;
    box-shadow: 0 0 0 0 #7b51db, 0 0 0 0 #5a37b8, 0 0 transparent;
    color: #fff;
    padding: 0.6rem 1rem;
    text-transform: uppercase;
    border-radius: 0.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    transition-duration: 0.15s;
    transition-property: background-color,border-color,box-shadow,color;
    transition-timing-function: ease-in;
    cursor: pointer;

    &:hover{
        background-image: linear-gradient(90deg,#d5bfff,#b18aff);
    }
`;

const ButtonNo = styled.button`
    background-image: linear-gradient(90deg,#ff708d,#ff3d71);
    border: none;
    box-shadow: 0 0 0 0 #db2c66, 0 0 0 0 #b81d5b, 0 0 transparent;
    color: #fff;
    padding: 0.6rem 1rem;
    text-transform: uppercase;
    border-radius: 0.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    transition-duration: 0.15s;
    transition-property: background-color,border-color,box-shadow,color;
    transition-timing-function: ease-in;
    cursor: pointer;

    &:hover{
        background-image: linear-gradient(90deg,#ffa8b4,#ff708d);
    }

    &:focus{
        background-image: linear-gradient(90deg,#ff3d71,#db2c66);
        box-shadow: 0 0 0 0 #db2c66, 0 0 0 0 #b81d5b, 0 0 transparent, 0 0 0 0.375rem #6a6a94;
    }
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

const ButtonUpdate = styled.button`
    opacity: 1;
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
    margin-left: 1rem;

    &:hover{
        cursor: pointer;
        color: #1b1b38;
    }
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    border: '0.0625rem solid #13132b',
    borderRadius: '0.25rem',
    backgroundColor: '#323259',
    color: '#fff',
    fontSize: '1rem',
    padding: 0,
};

interface Data {
    sku: string;
    name: string;
    category: string;
    price: number;
    amount: number;
    vendor: string;
    arrivalDate: string;
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
        id: 'sku',
        numeric: false,
        disablePadding: true,
        label: 'SKU',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'In stock',
    },

    {
        id: 'vendor',
        numeric: false,
        disablePadding: false,
        label: 'Vendor',
    },

    {
        id: 'arrivalDate',
        numeric: false,
        disablePadding: false,
        label: 'Arrival Date',
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
            <TableRow sx={{ backgroundColor: '#323259', }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                        sx={{ color: '#fff', }}
                    />
                </TableCell>
                <TableCell></TableCell>
                {headCells?.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ color: '#fff', }}
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

export default function TableContent(
    {
        valueFilterList,
        handleChangeItem,
        onUpdate,
        postProductFilter,
    }: any) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const ProductData = useSelector((store: any) => store?.infoProduct?.infoProduct);
    console.log('ProductData...', ProductData);

    const [totalProductData, setTotalProduct] = React.useState(ProductData);
    console.log('totalProductData...', totalProductData);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [showInp, setShowInp] = React.useState(false);
    const [editProductId, setEditProductId] = React.useState(null);

    const [editProductForm, setEditProductForm] = React.useState({
        id: '',
        sku: '',
        name: '',
        category: '',
        price: '',
        amount: '',
        vendor: '',
        arrivalDate: '',
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            const newSelecteds = totalProductData?.map((n: any) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected?.slice(0, selectedIndex),
                selected?.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        const newData = {
            ...valueFilterList,
            page: newPage,
        }
        setPage(newPage);
        postProductFilter(newData);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalProductData.length) : 0;


    const handleEditClick = (product: any) => {
        setShowInp(!showInp);
        setEditProductId(product.id);

        const priceValue = {
            id: product.id,
            sku: product.sku,
            name: product.name,
            category: product.category,
            price: product.price,
            amount: product.amount,
            vendor: product.vendor,
            arrivalDate: product.arrivalDate,
        }
        setEditProductForm(priceValue);
    };

    const handleEditProductChange = (e: any) => {
        const fieldName: any = e.target.getAttribute('name');
        const fieldValue: any = e.target.value;

        const newProductPrice: any = { ...editProductForm };
        newProductPrice[fieldName] = fieldValue;

        setEditProductForm(newProductPrice);
    }

    const handleEditPriceSubmit = (e: any) => {
        e.preventDefault();
        const editedPrice = {
            id: editProductId,
            sku: editProductForm.sku,
            name: editProductForm.name,
            category: editProductForm.category,
            price: editProductForm.price,
            amount: editProductForm.amount,
            vendor: editProductForm.vendor,
            arrivalDate: editProductForm.arrivalDate,
        }

        const newProducts = [...totalProductData];

        const index = totalProductData.findIndex((product: any) => product.id === editProductId);

        newProducts[index] = editedPrice;

        setTotalProduct(newProducts);
        setEditProductId(null);
    }

    const handleDeleteCheck = () => {
        const newProduct = totalProductData.filter((product: any) => !selected.includes(product.name));
        setTotalProduct(newProduct);
    }

    // const onChangeEdit = (fieldName?: string, fieldValue?: string) => (e: any) => {
    //     changeItem(fieldName, fieldValue || e?.target?.value || '');
    // }

    const handleClickUpdate = () => {
        onUpdate({
            params: [{
                ...editProductForm,
                stock: editProductForm.amount,
            }]
        })
    }

    const handleChangePagePagination = (event: unknown, newPage: number) => {
        const newData = {
            ...valueFilterList,
            page: newPage,
        }
        postProductFilter(newData);
    };

    React.useEffect(() => {
        setTotalProduct(ProductData);
    }, [ProductData]);

    React.useEffect(() => {
        const json = dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/api/products/list', 'post'));
        console.log(json);
    }, [dispatch]);

    return (
        <>
            <form onSubmit={handleEditPriceSubmit}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={totalProductData?.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(totalProductData, getComparator(order, orderBy))
                                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        ?.map((product: any, index: any) => {
                                            const isItemSelected = isSelected(product.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={product.name}
                                                    sx={{ background: '#323259' }}
                                                >
                                                    <TableCell padding="checkbox" sx={{ color: '#fff' }}>
                                                        <Checkbox
                                                            onClick={(event) => handleClick(event, product.name)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ width: '5%', }}>
                                                        <Grid sx={{ borderRight: '1.5px dashed #bbb', }}>
                                                            <Grid sx={{ color: '#28a745', borderLeft: '1px solid #ddd', }}>
                                                                <ButtonPowerOffItem onClick={handleOpen}>
                                                                    <FaPowerOff />
                                                                </ButtonPowerOffItem>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                        sx={{ color: '#fff' }}
                                                    >
                                                        {product.sku}
                                                    </TableCell>
                                                    <TableCell align="left" sx={{
                                                        color: '#007bff',
                                                        width: '25%',
                                                    }}>
                                                        <Link to={`/product-detail/${product.id}`}>
                                                            <span
                                                                style={{
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 1,
                                                                    WebkitBoxOrient: 'vertical',
                                                                }}
                                                            >
                                                                {product.name}
                                                            </span>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ color: '#fff' }}>{product.category}</TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{ color: '#fff' }}
                                                        onClick={() => handleEditClick(product)}
                                                    >
                                                        {editProductId === product.id
                                                            ?
                                                            (
                                                                <input
                                                                    type="text"
                                                                    name='price'
                                                                    value={editProductForm.price}
                                                                    onChange={handleEditProductChange}
                                                                />
                                                            )
                                                            :
                                                            product.price}
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ color: '#fff' }} onClick={() => handleEditClick(product)}>
                                                        {editProductId === product.id
                                                            ?
                                                            (<input
                                                                type="text"
                                                                name='amount'
                                                                value={editProductForm.amount}
                                                                onChange={handleEditProductChange}
                                                            />)
                                                            : product.amount}
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ color: '#007bff' }}>{product.vendor}</TableCell>
                                                    <TableCell align="left" sx={{ color: '#fff' }}>
                                                        <Moment unix>
                                                            {product.arrivalDate}
                                                        </Moment>
                                                    </TableCell>
                                                    <TableCell align="right" sx={{ width: '6%', }}>
                                                        <Grid sx={{ borderLeft: '1.5px dashed #bbb', }}>
                                                            <Grid>
                                                                <ButtonDeleteItem
                                                                    onClick={(event) => handleClick(event, product.name)}
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
                            count={totalProductData?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}

                        <div
                            style={{
                                padding: '1.2rem 0'
                            }}
                        >
                            <Pagination
                                count={25}
                                color="secondary"
                                onChange={handleChangePagePagination}
                            />
                        </div>
                    </Paper>
                </Box >

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2"
                                sx={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid #1b1b38',
                                    borderTopLeftRadius: '0.25rem',
                                    borderTopRightRadius: '0.25rem',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    lineHeight: '1.5rem',
                                }}
                            >
                                Confirm Update
                            </Typography>
                            <Typography id="modal-modal-description"
                                sx={{
                                    padding: '1rem 1.5rem',
                                    overflow: 'auto',
                                }}
                            >
                                Do you want to update this product?
                            </Typography>

                            <Stack
                                direction="row"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '1rem 1.5rem',
                                    borderTop: '1px solid #1b1b38',
                                    borderBottomLeftRadius: '0.25rem',
                                    borderBottomRightRadius: '0.25rem',
                                }}
                            >
                                <ButtonYes
                                    onSubmit={handleEditPriceSubmit}
                                    onClick={handleClose}
                                >
                                    Yes
                                </ButtonYes>
                                <ButtonNo onClick={handleClose}>
                                    No
                                </ButtonNo>
                            </Stack>
                        </Box>
                    </Modal>
                </div>

                {selected.length === 0
                    ?
                    (<ButtonDelete onClick={handleDeleteCheck}>Remove Selected</ButtonDelete>)
                    : (<ButtonDelete style={{ opacity: 1 }} onClick={handleDeleteCheck}>Remove Selected</ButtonDelete>)
                }

                <ButtonUpdate type='submit' onClick={handleClickUpdate}>Update</ButtonUpdate>
            </form>
        </>
    );
}

