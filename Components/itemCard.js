import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardHeader, Icon} from "@mui/material";
import {blueGrey, yellow} from "@mui/material/colors";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function ItemCard({number,icon,text}) {
    return (
        <Card sx={{ border:"solid 2px",borderColor:blueGrey[600],maxHeight: 110,maxWidth:330,minHeight: 110,minWidth:330, boxShadow:3,backgroundColor:"white",borderRadius:3 }} variant="outlined" elevation={3} square>
            <CardHeader
                avatar={icon}
                title={<Typography sx={{ fontSize: 25,fontWeight: 'bold' }} color="text.secondary" gutterBottom>{number}</Typography>}
                subheader={text}
            />
        </Card>
    );
}
