import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from 'axios'
import {Alert, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import url from "../Components/global";
import {UserContext} from "../Context/GlobalContext";
import {useRouter} from "next/router";
import Circular from "../Components/Circular";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
                MaisonTurque
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useContext(UserContext)
    const [aalert, setAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
console.log(email+password)
    const refreshData=()=>{
        router.replace(router.asPath)
    }

    useEffect(() => {
        const usernameInput = document.getElementById('email')
        const passwordInput = document.getElementById('password')
        if (usernameInput.value) {
            setEmail(usernameInput.value)
        }
        if (passwordInput.value) {
            setPassword(passwordInput.value)
        }
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();
        setAlert(null);
        setIsLoading(true);

        try {
            const formData = {
                "email": email,
                "password": password
            }
            await axios.post(url + "/api/login", formData)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.clear();
                        localStorage.setItem('user', JSON.stringify(res.data))
                        setIsLoading(false)
                        window.location.reload();
                        // router.push("/")
                    }
                    else {
                        localStorage.clear();
                    }
                }).catch(
                    function () {
                        localStorage.clear();
                        setAlert(true)
                        setTimeout(() => {
                            setAlert(false)
                        }, 5000);
                    }
                )
        } catch (e) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    }
if (isLoading){
    return <Circular/>
}else {
    return (
        <Box sx={{bgcolor: 'white', borderRadius: 5}}>
            {aalert ? <Alert variant="filled" severity="error">
                Votre Mots de passe ou votre Adresse email est incorrect
            </Alert> : null}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Se Connecter
                        </Typography>
                        <Box component="form" noValidate sx={{mt: 1}}>
                            <TextField
                                onChange={event => setEmail(event.target.value)}
                                margin="normal"
                                defaultValue={""}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={event => setPassword(event.target.value)}
                                margin="normal"
                                required
                                defaultValue={""}
                                fullWidth
                                name="password"
                                label="Mots de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Se souvenir de moi"
                            />
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Connecté
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 8, mb: 4}}/>
                </Container>
            </ThemeProvider>
        </Box>

    )
}
}
