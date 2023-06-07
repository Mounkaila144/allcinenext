import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import {blue} from "@mui/material/colors";
import * as React from "react";

export const IconClose = ({action}) => {
    return (
        <span

            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "end",
                margin:1,
                color:"white",


            }}
        >
            <Tooltip title="fermer">

      <CloseIcon sx={{fontSize:20,backgroundColor:"red",borderRadius:2,boxShadow:3,'&:hover':{
              backgroundColor:blue[700]
          }}}  onClick={action}/>
            </Tooltip>
    </span>
    );
};
