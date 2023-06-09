import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
import Image from "next/image";
import Button from "@mui/material/Button";
import {Backdrop, Card, Chip, CircularProgress, Stack} from "@mui/material";
import {blue, grey, red, yellow} from "@mui/material/colors";
import Add from "../AddArticle";
import ArticleDialog from "../Dialog";
import {useRouter} from "next/router";
import url from "../global";
import axios from "axios";
import {useState} from "react";
import Circular from "../Circular";
import ErrorPage from "../ErrorPage";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MyRequest from "../request";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'N°',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: true,
        label: 'Nom',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Prenom',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: "Adresse",
    },
     {
        id: 'numero',
        numeric: true,
        disablePadding: false,
        label: "Numero",
    },

    {
        id: 'reduction',
        numeric: true,
        disablePadding: false,
        label: "Reduction",
    },

     {
        id: 'vendue',
        numeric: true,
        disablePadding: false,
        label: "Date",
    }, {
        id: 'restant',
        numeric: true,
        disablePadding: false,
        label: "Factures",
    },


];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'desc'}
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
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['desc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const router=useRouter();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const refreshData=()=>{
        router.replace(router.asPath)
    }
    const { numSelected } = props;
    var data=Object.values(numSelected);
    const removeSelect = async () => {
        setLoading(true)
        await MyRequest('factures/1', 'DELETE', {"data":data}, { 'Content-Type': 'application/json' })
            .then(function (response) {
                if(response.status===200){
                    numSelected.length=0
                    refreshData();
                }
            })
            .finally(()=> {
                setLoading(false)
            }).catch(()=>setError(true))
    };
    if (loading) {
        return (
            <Circular/>
        )
    }else if(error){
        return ( <ErrorPage/>)
    }
    else {
        return (
            <Toolbar
                sx={{
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                    ...(numSelected.length > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected.length > 0 ? (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected.length} selectionner
                    </Typography>
                ) : (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Articles
                    </Typography>
                )}

                {numSelected.length > 0 ? (
                    <Tooltip title="Suprimer">
                        <IconButton onClick={() => removeSelect()}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filtre list">
                        <IconButton>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
export default function FactureTable({rows}) {
    const router = useRouter()
    const refreshData=()=>{
        router.replace(router.asPath)
    }

    const [order, setOrder] = React.useState('desc');
    const [open, setOpen] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loading, setLoading] = useState(false)
    const [remove, setRemove] = useState(null)
    const [add, setAdd] = useState(null)
    const Submitremove = async (id) => {
        setLoading(true)
        const res = await axios.post(url + '/api/factures/remove/'+id, {"remove":remove})
            .then(function (response) {
                if(response.status===200){
                    refreshData();
                }
            })
            .finally(()=> {
                setLoading(false)
            }).catch(()=>setLoading(true))
    };
    const Submitadd = async (id) => {
        setLoading(true)
        const res = await axios.post(url + '/api/factures/remove/'+id, {"remove":add})
            .then(function (response) {
                if(response.status===200){
                    refreshData();
                }
            })
            .finally(()=> {
                setLoading(false)
            }).catch(()=>setLoading(true))
    };



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'desc';
        setOrder(isAsc ? 'desc' : 'desc');
        setOrderBy(property);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);

    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const closeAdd=()=>{
        setOpen(false)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    if (loading) {
        return (
                <Circular/>
        )
    } else {
        return (
            <Box sx={{margin: 1, boxShadow: 2}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <EnhancedTableToolbar numSelected={selected}/>
                    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                        <Table size={dense ? 'small' : 'medium'}>

                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        const fullDate = row.created_at;
                                        const date = new Date(fullDate);
                                        const shortDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}h:${date.getMinutes()}:${date.getSeconds()}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                onDoubleClick={() => {
                                                    setLoading(true)
                                                    router.push("/factures/" + row.id)

                                                }}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell >#0{row.id}</TableCell>
                                                <TableCell >{row.nom}</TableCell>
                                                <TableCell >
                                                    {row.prenom}
                                                </TableCell>
                                                <TableCell >{row.adresse}</TableCell>
                                                <TableCell >{row.numero}</TableCell>
                                                <TableCell >{row.dimunie} CFA</TableCell>
                                                <TableCell >{shortDate}</TableCell>
                                                <TableCell>
                                                            <Button variant={"contained"}
                                                                    sx={{ borderRadius: 2}}
                                                                    onClick={() =>router.push(url+'/api/factures/' + row.id)}>Generer</Button>


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
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Dense padding"
                />
            </Box>
        );
    }
}
