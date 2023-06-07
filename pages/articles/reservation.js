import React, {useState, useEffect, useRef, useContext} from 'react';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import url from "../../Components/global";
import {useRouter} from "next/router";
import Circular from "../../Components/Circular";
import {Alert, AlertTitle, Avatar, Box, Button, Grid, ListItem, ListItemAvatar, Stack} from "@mui/material";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Search from "../../Components/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {DialogContext} from "../../Context/GlobalContext";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import {blue, blueGrey, grey, orange, pink, red, yellow} from "@mui/material/colors";
import OutlinedInput from "@mui/material/OutlinedInput";
import {useForm} from "react-hook-form";
import {useCart} from "react-use-cart";
import RemovCircleIcon from "@mui/icons-material/AddCircle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormData from "form-data";
import Add from "../../Components/AddArticle";
import MyRequest from "../../Components/request";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Reservation() {
    const router = useRouter()
    const [search, setsearch] = useState("   ");
    const [article, setMeuble] = useState([]);
    const [add, setAdd] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [sucess, setSucess] = useState(false);
    const initial = useRef(false);
    const {dialog, setDialog} = useContext(DialogContext)
    const Cfa = (price) => {
        return price.toLocaleString('fr-FR', {style: 'currency', currency: 'CFA'}).replace(',00', '');
    }
    const handleClickOpen = () => {
        setDialog(true);
        Searche()
    };
    const {emptyCart, isEmpty, items, inCart, addItem, updateItemQuantity, removeItem, cartTotal} = useCart();
    const handleClose = () => {
        setDialog(false);
    };
    const sucessCLose = () => {
        setSucess(false);
    };
    const formErrorCLose = () => {
        setErrorForm(false);
    };
    const Searche = async (url) => {

        await MyRequest('articles?nom=' + search, 'Get', {}, { 'Content-Type': 'application/json' })
            .then(async (response) => {
                if (response.status === 200) {
                    setMeuble(response.data);
                    if (response.status === 200) {
                    }
                }
            }).finally(() => setIsLoaded(false)).catch( (e)=>setError(true) )

    }
    useEffect(() => {
        if (initial.current) {
            Searche()
            window.scrollTo(0, 0);
        } else {
            initial.current = true
        }

    }, [search])
    const [nom, createNom] = useState("")
    const [prenom, createPrenom] = useState("")
    const [payer, createPayer] = useState(0)
    const [adresse, createAdresse] = useState("")
    const [numero, createNumero] = useState("")
    const [dimunie, createDimunie] = useState(0)
    const [errorForm, setErrorForm] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault()
        if (nom.length<3 || prenom.length<3 || adresse.length<3 || adresse<1000){

            setErrorForm(true)
        }else {
            console.log(nom.length)
            console.log(prenom.length)
            const formData = {
                "nom": nom,
                "prenom": prenom,
                "payer": payer,
                "adresse": adresse,
                "numero": numero,
                "dimunie": dimunie,
                "contenue": items,
                "user_id": 1
            }
            try {
                setIsLoaded(true)
                await MyRequest('reservations', 'POST', formData, { 'Content-Type': 'application/json' })
                    .then(async (response) => {
                        if (response.status === 200) {
                            createAdresse("")
                            createNom("")
                            createPrenom("")
                            createPayer("")
                            emptyCart()
                            setSucess(true)
                            router.push("/articles/listreservation")

                        }
                    }).finally(() => setIsLoaded(false)).catch( (e)=>alert(e) )
            } catch (e) {

            }
        }
    }


    if (error) {
        return <h1>Erreur de chargement veuiller recharger la page</h1>
    } else if (isLoaded) {
        return (
            <Circular/>
        )
    } else {
        return (
            <Box sx={{boxShadow:3,backgroundColor:blueGrey[900]}}>
                <Dialog
                    fullWidth
                    maxWidth="md"
                    open={dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Ajouter un nouveau article"}</DialogTitle>
                    <DialogContent>
                        <Search setsearch={setsearch}/>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prix de vente</TableCell>
                                        <TableCell>Quantité du Stock</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {article.map((articles) => {
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
                                                <TableCell>{Cfa(articles.prixVente)}</TableCell>
                                                <TableCell>{articles.stock}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            marginTop: 1,
                                                            backgroundColor: inCart(articles.id) ? "#1b5e20" : blue[900],
                                                        }}
                                                        onClick={() => {
                                                            inCart(articles.id) ? removeItem(articles.id) : addItem({
                                                                'nom': articles.nom,
                                                                'stock': articles.stock,
                                                                'image': articles.image,
                                                                'price': articles.prixVente,
                                                                'id': articles.id,
                                                            })
                                                        }}>
                                                        <AddShoppingCartIcon
                                                            sx={{color: "white"}}
                                                        />{inCart(articles.id) ? <DoneIcon/> : "Ajouter"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={handleClose}>Disagree</Button>*/}
                    {/*    <Button onClick={handleClose}>Agree</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>

                        <TableContainer style={{maxHeight: "85vh"}} component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Prix de vente</TableCell>
                                        <TableCell>Quantité du Stock</TableCell>
                                        <TableCell>Quantité a reserver</TableCell>
                                        <TableCell>Prix Total</TableCell>
                                        <TableCell align={"right"}>
                                            <Button
                                            startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                                            Ajouter
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {isEmpty ?
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                        <TableCell>Vide</TableCell>
                                    </TableRow>
                                </TableBody>:
                                    <TableBody>
                                        {items.map((articles) => {
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
                                                    <TableCell>{articles.price} CFA</TableCell>
                                                    <TableCell>{articles.stock}</TableCell>
                                                    <TableCell><Box display="flex"
                                                                    justifyContent="center"
                                                                    alignItems="center" sx={{
                                                        justifyContent: "center",
                                                        boxShadow: 3,
                                                        borderRadius: 2,
                                                        width: 50,
                                                        height: 40,
                                                        backgroundColor: blueGrey[900],
                                                        fontSize: 20,
                                                        color: "white"
                                                    }}>{articles.quantity}</Box></TableCell>
                                                    <TableCell>{articles.itemTotal} CFA</TableCell>
                                                    <TableCell>
                                                        <Stack spacing={3} direction="row"
                                                               sx={{marginLeft: 7, marginTop: 0}}>
                                                            <Button variant={"contained"}
                                                                    sx={{backgroundColor: yellow[800], borderRadius: 1}}
                                                                    style={{
                                                                        maxWidth: '50px',
                                                                        maxHeight: '25px',
                                                                        minWidth: '30px',
                                                                        minHeight: '20px'
                                                                    }}
                                                                    onClick={() => updateItemQuantity(articles.id, articles.quantity - 1)}><RemoveCircleIcon
                                                                sx={{color: "white"}}/></Button>
                                                            {articles.stock > articles.quantity ?
                                                                <Button variant={"contained"}
                                                                        sx={{color: "blue", borderRadius: 1}} style={{
                                                                    maxWidth: '50px',
                                                                    maxHeight: '25px',
                                                                    minWidth: '30px',
                                                                    minHeight: '20px'
                                                                }}
                                                                        onClick={() => updateItemQuantity(articles.id, articles.quantity + 1)}><AddCircleIcon
                                                                    sx={{color: "white"}}/></Button> :
                                                                <Button variant={"outlined"} style={{
                                                                    maxWidth: '50px',
                                                                    maxHeight: '25px',
                                                                    minWidth: '30px',
                                                                    minHeight: '20px'
                                                                }}><AddCircleIcon sx={{color:"white"}}/></Button>}
                                                            <Button variant={"contained"}
                                                                    sx={{backgroundColor: red[800], borderRadius: 1}}
                                                                    style={{
                                                                        maxWidth: '50px',
                                                                        maxHeight: '25px',
                                                                        minWidth: '30px',
                                                                        minHeight: '20px'
                                                                    }} onClick={() => removeItem(articles.id)}><DeleteIcon
                                                                style={{maxWidth: '20px', maxHeight: '20px',}}
                                                                sx={{color: "white"}}/></Button>
                                                        </Stack>

                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell><Box sx={{fontSize: 20}}>Total =</Box></TableCell>
                                            <TableCell>{cartTotal} CFA</TableCell>
                                        </TableRow>
                                    </TableBody>}
                            </Table>
                        </TableContainer>
                {!isEmpty ?
                    <>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="filled">
                                    <OutlinedInput
                                        fullWidth
                                        id="nom"
                                        onChange={(event) => {
                                            createNom(event.target.value);
                                        }}
                                        placeholder="Nom"
                                        aria-describedby="nom"
                                        inputProps={{
                                            'aria-label': 'Nom',
                                        }}
                                        sx={{ backgroundColor: 'white', height: '40px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        fullWidth
                                        id="prenom"
                                        onChange={(event) => {
                                            createPrenom(event.target.value);
                                        }}
                                        placeholder="Prénom"
                                        aria-describedby="prenom"
                                        inputProps={{
                                            'aria-label': 'Prénom',
                                        }}
                                        sx={{ backgroundColor: 'white', height: '40px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        fullWidth
                                        id="adresse"
                                        onChange={(event) => {
                                            createAdresse(event.target.value);
                                        }}
                                        placeholder="Adresse"
                                        aria-describedby="adresse"
                                        inputProps={{
                                            'aria-label': 'Adresse',
                                        }}
                                        sx={{ backgroundColor: 'white', height: '40px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        fullWidth
                                        id="numero"
                                        onChange={(event) => {
                                            createNumero(event.target.value);
                                        }}
                                        placeholder="Numero"
                                        aria-describedby="numero"
                                        inputProps={{
                                            'aria-label': 'Numero',
                                        }}
                                        sx={{ backgroundColor: 'white', height: '40px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        fullWidth
                                        id="dimunie"
                                        onChange={(event) => {
                                            createDimunie(event.target.value);
                                        }}
                                        placeholder="Réduction"
                                        aria-describedby="dimunie"
                                        inputProps={{
                                            'aria-label': 'Réduction',
                                        }}
                                        sx={{ backgroundColor: 'white', height: '40px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        fullWidth
                                        id="payer"
                                        onChange={(event) => {
                                            createPayer(event.target.value);
                                        }}
                                        placeholder="Somme payée"
                                        aria-describedby="payer"
                                        inputProps={{
                                            'aria-label': 'Somme payée',
                                        }}
                                        sx={{ backgroundColor: 'white', height: '40px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Button
                                    onClick={onSubmit}
                                    variant="contained"
                                    sx={{ fontSize: 20 }}
                                    startIcon={<BeenhereIcon />}
                                    fullWidth
                                >
                                    Réserver
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ fontSize: 20, color: 'white', backgroundColor: 'grey' }}
                                >
                                    Informations Clients
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                    :null}
                <Dialog

                    open={errorForm}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={formErrorCLose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Message"}</DialogTitle>
                    <DialogContent >
                        <Alert severity="error">
                            <AlertTitle>Eureur</AlertTitle>
                            Les champs
                            {nom.length<3?<Box > nom </Box>:null}
                            {prenom.length<3?<Box > prenom </Box>:null}
                            {adresse.length<3?<Box > adresse </Box>:null}
                            {payer.length<1000?<Box > Somme payer </Box>:null}
                            <strong> sont ivalide!</strong>

                        </Alert>
                    </DialogContent>
                </Dialog>
                <Dialog

                    open={sucess}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={sucessCLose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Message"}</DialogTitle>
                    <DialogContent >
                        <Alert severity="success">
                            <AlertTitle>Sucesse</AlertTitle>
                            La reservation a bien
                            <strong> été enregistrer</strong>

                        </Alert>
                    </DialogContent>
                </Dialog>
            </Box>
        );
    }

}



