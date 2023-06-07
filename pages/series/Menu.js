import EnhancedTable from "../../Components/tableau/tableau";
import MyRequest from "../../Components/request";
import {useContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Grid} from "@mui/material";

import {UserContext} from "../../Context/GlobalContext";
import Button from "@mui/material/Button";
import url from "../../Components/global";
import * as React from "react";
import {red} from "@mui/material/colors";

export default function menu() {
    const [data, setData] = useState([]);
    const {user,setUser}=useContext(UserContext)


    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('gerants', 'GET', {}, {'Content-Type': 'application/json'})
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',backgroundColor:red[400] }}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                {data.map((gerant) => (
                    <Grid item xs={6} key={gerant.id}>
                        <Grid
                            container
                            justifyContent="center" // Ajout du centrage du contenu
                        >
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 2 ,fontSize:20}}
                                onClick={() => router.push(url + '/api/reservations/' + gerant.id)}
                            >
                                {gerant.nom} {gerant.prenom}
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

        </div>

    );

}

// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/articless');
//     const articless=await res.json();
//
//     return {
//         props: {articless},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

