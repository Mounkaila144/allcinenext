import EnhancedTable from "./tableau/tableau";
import MyRequest from "./request";
import axios from "axios";
import url from "./global";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../Context/GlobalContext";
import {useRouter} from "next/router";

export default function Home({id}) {
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('articles?id='+id, 'GET', {}, { 'Content-Type': 'application/json' })
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);
    return (
    <EnhancedTable id={id} rows={data}/>
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

