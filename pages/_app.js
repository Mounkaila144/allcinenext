import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.css';
import createEmotionCache from "../config/createEmotionCache";
import lightTheme from "../styles/theme";
import MenuHome from "../Components/Home";
import {CartProvider} from "react-use-cart";
import jwt_decode from "jwt-decode";
import {DialogCategorieContext, DialogContext, DrawerContext, UserContext} from "../Context/GlobalContext";
import {useRouter} from "next/router";
import Login from "./login";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
    const [dialog, setDialog] = useState(false)
    const [dialogCategorie, setDialogCategorie] = useState(false)
    const [open, setOpen] = useState(true)
    const [user, setUser] = useState(0)
    const router = useRouter();

    useEffect(() => {
        if (localStorage.hasOwnProperty('user')) {

                const userValue = JSON.parse(localStorage.getItem('user'));
            const token = userValue["token"];
            var decoded = jwt_decode(token);
            const currentTime = new Date().getTime() / 1000; // Obtenez le temps actuel en secondes
            if (decoded.exp < currentTime) {
                setUser(0)
                localStorage.clear()
                window.location.reload();
            } else {
                if (userValue["user"]["roles"][0]["name"] === "admin"){
                    setUser(2)
                }else if (userValue["user"]["roles"][0]["name"] === "user"){
                    setUser(1)
                }
                router.push("/")

            }
            console.log(decoded);
        }else {
            setUser(0)
        }
        console.log(user)
    }, []);
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <CartProvider>
                <UserContext.Provider value={{user,setUser}} >
                <DrawerContext.Provider value={{open,setOpen}} >
                <DialogCategorieContext.Provider value={{dialogCategorie,setDialogCategorie}} >
                <DialogContext.Provider value={{dialog,setDialog}} >
                    {user === 0 ?
                        <Login/>
                        :
                        <MenuHome>
                            <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={7}
                                           showOnShallow={true}/>
                            <Component {...pageProps} />
                        </MenuHome>
                    }
                </DialogContext.Provider>
                </DialogCategorieContext.Provider>
                </DrawerContext.Provider>
                </UserContext.Provider>
                </CartProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
