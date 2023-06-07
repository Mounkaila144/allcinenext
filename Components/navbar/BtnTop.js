import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";


const BtnTop = (props) => {
    let navigate = useNavigate();
    return (
        <MenuItem onClick={() => {navigate(`${props.lien}`)}}>{props.name}</MenuItem>
    );
};

export default BtnTop;
