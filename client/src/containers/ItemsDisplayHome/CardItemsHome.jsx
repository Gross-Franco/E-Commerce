import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Box} from '@mui/material';
import {Link} from 'react-router-dom'
export default function CardItemsHome({name,image,price,id}) {
  return (
    <Link to={`/productDetail/${id}`} style={{textDecoration:'none'}}>
    <Card sx={{ width: 300,}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="zapatillas"
          sx={{objectFit:'cover',objectPosition:'center'}}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" sx={{borderBottom:'1px lightgray solid'}}>
            {name}
          </Typography>
          <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h5" color="brown" sx={{fontWeight:400}}>
            {price} 
          </Typography>
          <Typography variant="subtitle1" color="green"  >
             {getRandomInt(5,40)}%OFF 
          </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
