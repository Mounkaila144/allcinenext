import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import ItemCard from "../Components/itemCard";
import url from "../Components/global";
import io from 'socket.io-client';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Circular from "../Components/Circular";
import {blueGrey, yellow} from "@mui/material/colors";
import PaidIcon from '@mui/icons-material/Paid';
import CategoryIcon from '@mui/icons-material/Category';
import {useRouter} from "next/router";
import {UserContext} from "../Context/GlobalContext";
import axios from "axios";
import MyRequest from "../Components/request";


function Dashboard() {
    const [data, setData] = useState(null);
    const router = useRouter();
    const {user,setUser}=useContext(UserContext)


    const Cfa = (price) => {
        return price.toLocaleString('fr-FR', {style: 'currency', currency: 'CFA'}).replace(',00', '');
    }


    useEffect(() => {
        async function fetchData() {
            await MyRequest('dahboard', 'GET', {}, { 'Content-Type': 'application/json' })
                .then(async (response) => {
                    if (response.status === 200) {
                        setData(response.data)
                    }
                })

        }
        // Fetch data every 5 seconds
        fetchData()
        const interval = setInterval(() => {fetchData();}, 5000);

        return () => clearInterval(interval);
    }, []);

    if (data) {
        return (
            <div style={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper style={{padding: '16px', textAlign: 'center', color: '#757575', boxShadow: 3}}>
                            <Grid container spacing={3} justify="center">

                                <Grid item xs={4}>
                                    <ItemCard icon={<PointOfSaleIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Dans la caisse"} number={Cfa(data.caisse)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <ItemCard icon={<PaidIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Recette Journalière"} number={Cfa(data.recetJour)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <ItemCard icon={<PaidIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Recette Mensuelle"} number={Cfa(data.recetMoi)}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <ItemCard icon={<CategoryIcon sx={{
                                        fontSize: 60,
                                        color: "white",
                                        backgroundColor: blueGrey[900],
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        marginTop: -5
                                    }}/>} text={"Nombre d'article"} number={data.TotalArticle}/>
                                </Grid>
                                {user===2?<>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Benefice Journalière"} number={Cfa(data.beneficeJour)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Benefice Mensuelle"} number={Cfa(data.beneficeMoi)}/></Grid>
                                </>:null}
                                    <Grid item xs={4}><ItemCard icon={<CategoryIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Nombre D'article Vendue"} number={data.articleVendue}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme retirer durant ce moi"}
                                                            number={Cfa(data.prixRetirerMoi)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme retirer durant cette année"}
                                                            number={Cfa(data.prixRetirerAnnee)}/></Grid>
                                <Grid item xs={4}>

                                </Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme Ajouter durant ce moi"}
                                                            number={Cfa(data.prixAjouterMoi)}/></Grid>
                                <Grid item xs={4}><ItemCard icon={<PaidIcon sx={{
                                    fontSize: 60,
                                    color: "white",
                                    backgroundColor: blueGrey[900],
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    marginTop: -5
                                }}/>} text={"Somme Ajouter durant cette année"}
                                                            number={Cfa(data.prixAjouterAnnee)}/></Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{padding: '16px', textAlign: 'center', color: '#757575', boxShadow: 3}}></Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{padding: '16px', textAlign: 'center', color: '#757575'}}></Paper>
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return <Circular/>
    }

}

export default Dashboard;
