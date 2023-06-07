import EnhancedTable from "../../Components/tableau/tableau";
import MyRequest from "../../Components/request";
import {useContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Grid} from "@mui/material";
import CategorieCard from "../../Components/CategorieCard";
import CategorieDialog from "../../Components/CategorieDialog";
import {UserContext} from "../../Context/GlobalContext";

export default function Home() {
    const [data, setData] = useState([]);
    const {user,setUser}=useContext(UserContext)


    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('categories', 'GET', {}, {'Content-Type': 'application/json'})
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);
    return (
        <>
            {user===2?<CategorieDialog/>:null}

                <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 12, sm: 12, md: 12}}>
                    {data.slice(0, 18).map((categories) => (
                        <Grid item xs={6} sm={4} md={3}>

                            <CategorieCard sx={{boxShadow: 6,}}
                                           categories={categories}
                            />
                        </Grid>

                    ))}
                </Grid>

        </>

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

