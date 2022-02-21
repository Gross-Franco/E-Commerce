import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardItemsHome from './CardItemsHome'
import { useEffect,useState } from 'react';

let limit=0
export default function DisplayItemsHome({items}) {
    const [itemsUsed,setItems]= useState([])
    useEffect(()=>{
        limit=0
        let itemsSelect=[]
        let indexReg=[]
        while(limit<=7){
            let ind=Math.floor(Math.random()*items.length)
            if(!indexReg.includes(ind)){
                indexReg.push(ind)
                itemsSelect.push(items[ind])
                limit++
            }
        }
        setItems(itemsSelect)
    },[items])
    if(itemsUsed.length<1){
        return(<div>
            Items not founds
        </div>)
    }else{
        return (
            <React.Fragment>
                <CssBaseline />
                
                <Container maxWidth='100vw'  sx={{display:'flex',justifyContent:'center',marginTop:'-100px'}}>
                    <Box sx={{ bgcolor: 'transparent', height: 'auto',width:'90%',display:'flex',flexWrap:'wrap',gap:'1em',padding:'1em',justifyContent:'space-around'}}>
                        {itemsUsed.map((e,i)=><CardItemsHome
                         key={i} 
                         image={e.image}
                         name={e.name} 
                         price={e.price}
                         id={e.id}
                         description={e.description}
                         />)}
                    </Box>
                    {console.log(itemsUsed)}
                </Container>
               
            </React.Fragment>
        )
    }
}