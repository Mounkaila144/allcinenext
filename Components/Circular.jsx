import {Backdrop, CircularProgress} from "@mui/material";
import {alpha} from "@mui/material/styles";

export default function Circular() {
    return (
        <Backdrop open={true}
                  sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
            <CircularProgress size="20vh" sx={{color:"black"}} disableShrink />
        </Backdrop>
    );
}
