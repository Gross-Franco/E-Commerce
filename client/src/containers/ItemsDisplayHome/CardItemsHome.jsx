import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CardItemsHome({name,img,price}) {
  return (
    <Card sx={{ minWidth: 600,}}>
      <CardActionArea>
        <CardMedia
          
          component="img"
          height="240"
          image={img}
          alt="zapatillas"
          sx={{objectFit:'cover',objectPosition:'center'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography variant="subtitle2" color="green"  >
            {price} 🥳
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
