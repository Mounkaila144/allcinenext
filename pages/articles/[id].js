import Home, {getPostData} from "../../Components/articles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Add from "../../Components/AddArticle";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import Slide from "@mui/material/Slide";
import {useRouter} from "next/router";
import Page from "../index";
import ArticleDialog from "../../Components/Dialog";
import Edit from "../../Components/EditArticle";
import {Backdrop, CircularProgress} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import url from "../../Components/global";
import {UserContext} from "../../Context/GlobalContext";
import MyRequest from "../../Components/request";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Article() {
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
                    <DialogTitle>{"Modifier un article"}</DialogTitle>
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
Article.getInitialProps = async (context) => {
    const { id } = context.query;
    return { id };
};
