import FactureTable from "../../Components/tableau/FactureTableau";
import {useEffect, useRef, useState} from "react";
import MyRequest from "../../Components/request";
import {useRouter} from "next/router";


export default function Factures() {
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('factures', 'GET', {}, { 'Content-Type': 'application/json' })
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);
        return (
            <FactureTable rows={data}/>
        );

}

// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/factures');
//     const factures=await res.json();
//
//     return {
//         props: {factures},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

