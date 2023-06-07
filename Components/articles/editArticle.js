import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ModeIcon from '@mui/icons-material/Mode';
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import Slide from "@mui/material/Slide";
import {useRouter} from "next/router";
import {Alert, AlertTitle, Backdrop, CircularProgress, OutlinedInput, Stack, Typography} from "@mui/material";
import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {blueGrey, red, yellow} from "@mui/material/colors";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Circular from "../../Components/Circular";
import MyRequest from "../../Components/request";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditArticle({id}) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [add, createAdd] = useState(null)
    const [remove, createRemove] = useState(null)
    const [achat, createAchat] = useState(null)
    const [vente, createVente] = useState(null)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [btn, setBtn] = useState("add")

    const refreshData=()=>{
        router.replace(router.asPath)
    }
    const onSubmitRemove = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = {
            "remove": remove,
        }
        await MyRequest('articles/stocks/' + id, 'POST', formData, { 'Content-Type': 'application/json' })
            .then(async (response) => {
                if (response.status === 200) {
                    await setShow(true)
                }
            }).finally(() => setLoading(false)).catch( (e)=>alert(e) )
    }

    const onSubmitAdd = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = {
            "add": add,
        }
        await MyRequest('articles/stocks/' + id, 'POST', formData, { 'Content-Type': 'application/json' })
            .then(async (response) => {
                if (response.status === 200) {
                    await setShow(true)
                }
            }).finally(() => setLoading(false)).catch( (e)=>alert(e) )

    }
    const onSubmitPrix = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = {
            "prixAchat": achat,
            "prixVente": vente
        }
        await MyRequest('articles/stocks/' + id, 'POST', formData, { 'Content-Type': 'application/json' })
            .then(async (response) => {
                if (response.status === 200) {
                    await setShow(true)
                }
            }).finally(() => setLoading(false)).catch( (e)=>alert(e) )

    }

    if (show){
        setTimeout(() => {
            setShow(false)
            handleClose()
            // After 3 seconds set the show value to false
        }, 3000)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        refreshData()
    };

        if (loading) {
            return (
                <Circular/>
            )
        } else {
                return (
                    <>
                        <Button
                            startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                            Operation
                        </Button>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Operation"}</DialogTitle>
                            {show ?
                                <DialogContent>
                                    <Alert severity="success">
                                        <AlertTitle>Success</AlertTitle>
                                        L'operation <strong>a bien été prise en compte!</strong>
                                    </Alert>
                                </DialogContent> :
                                <DialogContent>
                                    <Stack spacing={3} direction="row"
                                           sx={{marginLeft: 7, marginTop: 0}}>
                                        <Button variant={"contained"}
                                                sx={{
                                                    backgroundColor: yellow[800],
                                                    borderRadius: 3,
                                                    ':hover': {bgcolor: blueGrey[900]}
                                                }}
                                                onClick={() => setBtn("remove")}><RemoveCircleIcon
                                            sx={{color: "white"}}/>Dimunier stock
                                        </Button>

                                        <Button variant={"contained"}
                                                sx={{borderRadius: 3, ':hover': {bgcolor: blueGrey[900]}}}
                                                onClick={() => setBtn("add")}><AddCircleIcon
                                            sx={{color: "white"}}/>Ajouter Stocks</Button>
                                        <Button variant={"contained"}
                                                sx={{
                                                    backgroundColor: red[800],
                                                    borderRadius: 3,
                                                    ':hover': {bgcolor: blueGrey[900]}
                                                }}
                                                onClick={() => setBtn("prix")}><ModeIcon
                                            style={{maxWidth: '20px', maxHeight: '20px',}}
                                            sx={{color: "white"}}/>Modifier les prix</Button>
                                    </Stack>
                                    {btn === "add" ? <><FormControl sx={{m: 1, width: '35ch'}} variant="outlined">
                                        <FormHelperText id="Quantité">
                                            <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                                Ajouter une quantité de
                                            </Typography>
                                        </FormHelperText>

                                        <OutlinedInput
                                            sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                            id="Quantité"
                                            onChange={(event) => {
                                                createAdd(parseInt(event.target.value))
                                            }}
                                            aria-describedby="nom"
                                            inputProps={{
                                                'type': "number",
                                                'min': "0",
                                                'max': "1000",
                                                'aria-label': 'weight',
                                            }}
                                        />
                                    </FormControl>
                                        <Button variant={"contained"}
                                                sx={{marginTop: 6, borderRadius: 3, ':hover': {bgcolor: blueGrey[900]}}}
                                                onClick={onSubmitAdd}><AddCircleIcon
                                            sx={{color: "white"}}/>Ajouter
                                        </Button></> : null}
                                    {btn === "remove" ? <> <FormControl sx={{m: 1, width: '35ch'}} variant="outlined">
                                        <FormHelperText id="Quantité">
                                            <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                                Dimunier une quantité de
                                            </Typography>
                                        </FormHelperText>

                                        <OutlinedInput
                                            sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                            id="Quantité"
                                            onChange={(event) => {
                                                createRemove(parseInt(event.target.value))
                                            }}
                                            aria-describedby="nom"
                                            inputProps={{
                                                'type': "number",
                                                'min': "0",
                                                'max': "1000",
                                                'aria-label': 'weight',
                                            }}
                                        />
                                    </FormControl>
                                        <Button variant={"contained"}
                                                sx={{
                                                    backgroundColor: yellow[800],
                                                    marginTop: 6,
                                                    borderRadius: 3,
                                                    ':hover': {bgcolor: blueGrey[900]}
                                                }}
                                                onClick={onSubmitRemove}><RemoveCircleIcon
                                            sx={{color: "white"}}/>Dimunier
                                        </Button></> : null}
                                    {btn === "prix" ? <>
                                        <FormControl sx={{m: 1, width: '35ch'}} variant="outlined">
                                            <FormHelperText id="Quantité">
                                                <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                                    Modifier le prix d'achat
                                                </Typography>
                                            </FormHelperText>

                                            <OutlinedInput
                                                sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                                id="Quantité"
                                                onChange={(event) => {
                                                    createAchat(parseInt(event.target.value))
                                                }}
                                                aria-describedby="nom"
                                                inputProps={{
                                                    'type': "number",
                                                    'min': "0",
                                                    'max': "1000",
                                                    'aria-label': 'weight',
                                                }}
                                            />

                                        </FormControl>
                                        <FormControl sx={{m: 1, width: '35ch'}} variant="outlined">
                                            <FormHelperText id="Quantité">
                                                <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                                    Modifier le prix de vente
                                                </Typography>
                                            </FormHelperText>

                                            <OutlinedInput
                                                sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                                                id="Quantité"
                                                onChange={(event) => {
                                                    createVente(parseInt(event.target.value))
                                                }}
                                                aria-describedby="nom"
                                                inputProps={{
                                                    'type': "number",
                                                    'min': "0",
                                                    'max': "1000",
                                                    'aria-label': 'weight',
                                                }}
                                            />

                                        </FormControl>
                                        <Button variant={"contained"}
                                                sx={{
                                                    backgroundColor: red[800],
                                                    marginTop: 6,
                                                    borderRadius: 3,
                                                    ':hover': {bgcolor: blueGrey[900]}
                                                }}
                                                onClick={onSubmitPrix}><ModeIcon
                                            sx={{color: "white"}}/>Modifier
                                        </Button></> : null}
                                </DialogContent>
                            }
                        </Dialog>
                    </>)

        }

}
