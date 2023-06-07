import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Add from "../AddArticle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useContext, useState} from "react";
import {DialogContext} from "../../Context/GlobalContext";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Image from "next/image";
import url from "../global";
import {blue} from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import PropTypes, {bool} from "prop-types";
import {useRouter} from "next/router";
import axios from "axios";
import Circular from "../Circular";
import ErrorPage from "../ErrorPage";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {TableFooter} from "@mui/material";
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
        id: 'vendue',
        numeric: true,
        disablePadding: false,
        label: "Date",
    },
    {
        id: 'vendue',
        numeric: true,
        disablePadding: false,
        label: "Payer",
    },
    {
        id: 'vendue',
        numeric: true,
        disablePadding: false,
        label: "Somme restant",
    },

    {
        id: 'restant',
        numeric: true,
        disablePadding: false,
        label: "voir le contenue",
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
    console.log(data)
    const removeSelect = async () => {
        setLoading(true)
        const res = await axios.post(url + '/api/reservations/delect', {"data":data})
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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogReservation({contenue,total,payer,rest,dimunie}) {
    const [dialog, setDialog] = React.useState(false);
    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };
    const Cfa = (price) => {
        return price.toLocaleString('fr-FR', {style: 'currency', currency: 'CFA'}).replace(',00', '');
    }
    return (
        <div>
            <Button
               variant="contained" onClick={handleClickOpen}>
                Voir le contenue
            </Button>
            <Dialog
                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Ajouter un nouveau article"}</DialogTitle>
                <DialogContent >
                    <TableContainer component={Paper}>
                        <Table style={{maxHeight: "85vh"}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Quantité reserver</TableCell>
                                    <TableCell>Prix Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                    {contenue.map((articles) => {
                        console.log(articles)
                        return (
                            <TableRow

                                key={articles.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell> <Image
                                    src={url + "/storage/article/" + articles.image}
                                    width={50} height={50} style={{borderRadius: 8}}
                                    alt={"image"}/></TableCell>
                                <TableCell component="th" scope="articles">
                                    {articles.nom}
                                </TableCell>
                                <TableCell>{articles.quantity}</TableCell>
                                <TableCell>{Cfa(articles.itemTotal)}</TableCell>
                            </TableRow>
                        );
                    })}
                            </TableBody>
                        </Table>
                        <Box sx={{fontFamily:"bold",fontSize:20}}>Total <span style={{color:"blue"}}> {Cfa(total)}</span> , Reduction <span style={{color:"red"}}>{Cfa(dimunie)}</span></Box>

                        <Box sx={{fontFamily:"bold",fontSize:20}}>le client a donné <span style={{color:"blue"}}> {Cfa(parseInt(payer))}</span>  et il lui rest a payer <span style={{color:"red"}}>{Cfa(rest)}</span></Box>

                    </TableContainer>
                </DialogContent>
            </Dialog>
        </div>
    );
}