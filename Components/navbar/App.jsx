import * as React from 'react';
import HeaderDesing from "./HederDesing";
import Button from '@mui/material/Button';
import { pink} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Image from "next/image";



export default function HeaderPhone() {

    return (<HeaderDesing
        logo={<Image src="/images/hh.png" width={50} height={50}/>}
        btnflexsm={
        <Button> bonjour</Button>

    }
        search={
            <Button> bonjour</Button>
        }

    />);
}
