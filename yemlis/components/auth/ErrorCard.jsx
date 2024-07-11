import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ErrorCard = ({text,redirectPage}) =>{
    return (
    <Card sx={{ minWidth: 275, display:"flex", flexDirection:"column", alignItems:"center",textAlign:"center",justifyContent:"center" }}  >
        <CardContent >
          <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
           {text} 
          </Typography>
      
        </CardContent>
        <CardActions>
          <Button href={redirectPage}>Giriş Sayfasına Dön</Button>
        </CardActions>
      </Card>
      )
}