
import url from "../../Components/global";
import AjouterTable from "../../Components/tableau/AjouterTable";
import {useEffect, useRef, useState} from "react";
import MyRequest from "../../Components/request";
import {useRouter} from "next/router";

export default function Ajouter() {
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('entresorties/ajouter', 'GET', {}, { 'Content-Type': 'application/json' })
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);
    return (
        <AjouterTable rows={data}/>
    );

}

// export async function getStaticProps() {
//     const res = await fetch('https://mouhtada.allcine227.com/api/entresorties');
//     const entresorties=await res.json();
//
//     return {
//         props: {entresorties},
//         revalidate: 10,// will be passed to the page component as props
//     }
//
// }

