import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, IconButton, CardActions } from '@mui/material';
import { AddShoppingCart,Description} from '@mui/icons-material'

import { Link } from 'react-router-dom'
export default function CardItemsHome({ name, image, price, id, section, description }) {
  function visibility(e){
    console.log(e.target.className.includes(name))
    if(e.target.className===name){
      document.getElementById(e.target.className).hidden=false
    }
   
  }
  function hiddenDesc(e){
    console.log(e.target.className.includes(name))
    if(e.target.className===name){
      document.getElementById(e.target.className).hidden=true
    }
   
 
  }



  if (section && section === "catalogo") {
    return (
      <Card sx={{ width: 300, }} >
        <CardActionArea  className={name} onMouseOver={visibility} onMouseOut={hiddenDesc}>
          <CardMedia
            component="img"
            height="180"
            image={image}
            alt={name}
            sx={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <CardContent >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between',borderBottom: '1px lightgray solid' }}>
              <Typography 
              gutterBottom variant="h6" 
              component="div" 
              >
              {name}
              </Typography>
              <Typography variant="h5" color="brown" sx={{ fontWeight: 400 }}>
                {price}
              </Typography>
            </Box>
            <Typography  id={name} variant="body2" color="textSecondary" hidden>
              {description}
            </Typography>
            <CardActions sx={{display:'flex',justifyContent: 'space-between'}}>
              <IconButton aria-label="Add to cart">
                <Description sx={{color:'blue'}}/>
              </IconButton>
              <IconButton aria-label="Add to cart">
                <AddShoppingCart sx={{color:'green'}} />
              </IconButton>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>

    )
  } else {


    return (
      <Link to={`/productDetail/${id}`} style={{ textDecoration: 'none' }}>
        <Card sx={{ width: 300, }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={image}
              alt="zapatillas"
              sx={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="div" sx={{ borderBottom: '1px lightgray solid' }}>
                {name}
              </Typography>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" color="brown" sx={{ fontWeight: 400 }}>
                  {price}
                </Typography>
                <Typography variant="subtitle1" color="green"  >
                  {getRandomInt(5, 40)}%OFF
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    );
  }
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
