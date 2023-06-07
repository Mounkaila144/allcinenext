import * as React from "react";
import Slide from "@mui/material/Slide";
import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";
import Home from "../../Components/articles";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function Categorie() {
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
            <Home id={id}/>
        )
    }
}
Categorie.getInitialProps = async (context) => {
    const { id } = context.query;
    return { id };
};
