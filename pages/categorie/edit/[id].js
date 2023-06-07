import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import Slide from "@mui/material/Slide";
import {useRouter} from "next/router";
import {Backdrop} from "@mui/material";
import Home from "../categorie";
import Edit from "../../../Components/EditArticle";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditCategorie() {
    const router = useRouter();
    const { id } = router.query;
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        router.push("/articles/categorie")
    };
    if (router.isFallback) {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }
    else {
        return (
            <>
                <Home/>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Modifier une Categorie"}</DialogTitle>
                    <DialogContent>
                        <Edit id={id}/>
                    </DialogContent>
                    {/*<DialogActions>*/}
                    {/*    <Button onClick={handleClose}>Disagree</Button>*/}
                    {/*    <Button onClick={handleClose}>Agree</Button>*/}
                    {/*</DialogActions>*/}
                </Dialog>
            </>)
    }
}
EditCategorie.getInitialProps = async (context) => {
    const { id } = context.query;
    return { id };
};
