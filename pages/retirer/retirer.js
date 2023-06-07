import React, {useState, useEffect, useRef} from 'react';
import RetirerTable from "../../Components/tableau/retirerTable";
import MyRequest from "../../Components/request";
import {useRouter} from "next/router";

export default function Retirer() {
    const [data, setData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            await MyRequest('entresorties/retirer', 'GET', {}, { 'Content-Type': 'application/json' })
                .then((response) => {
                    setData(response.data)
                });
        };
        fetchData();
    }, [router.query]);

    return (
        <RetirerTable rows={data}/>
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

