import React, { useEffect } from "react";
import {Card,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userOrders, userReviews } from "../Redux/Actions/actions";


export default function ProfileTables({link, userid}) {
    
  const {orders, reviews, whishlist} = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if(link === "Purchase history") {
      dispatch(userOrders(userid))
    }

    if(link === "Reviews") {
      dispatch(userReviews(userid))
    }

    if(link === "Whishlist") {
      // dispatch(whishlist(userid))
    }

  }, [])


    if(link === "Account")
    {
       return <p style={{
         position:"relative",
         right:"-20px"
       }}>
  preferencia    <br />
  metodo de pago <br />
  cambiar contraseña <br />
  borrar cuenta  <br />
  
       </p>
  
    }
    else if(link === "Purchase history")
    {
      return <p>
           Historial de compras
           <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Product</th>
        <th scope="col">Date</th>
        <th scope="col">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Zapatos</td>
        <td>10/10/22</td>
        <td>30$</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Camisas</td>
        <td>10/04/10</td>
        <td>70$</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Hugo voz</td>
        <td>11/06/11</td>
        <td>140$</td>
      </tr>
    </tbody>
  </table>
           </p>
    }else if(link === "Reviews")
    {
      return <div>
       <div class="card border-light mb-3 shadow p-3 mb-5 bg-body rounded" style={{
          // maxFdth:"100rem",
          margin: "auto",
          width: "90%",
          border: "3px solid green",
          padding: "10px"
      }}>
      <div class="card-header">6 personas  aprueban tu reviwer</div>
      <div class="card-body">
        <h5 class="card-title">Ropa deportiva nike {<h6 style={{
            fontSize: "12px"
        }}> 5 days ago</h6>}</h5>
        <p class="card-text">Ropa de  excelente  calidad, muy recomendable.</p>
      </div>
    
    </div>
      
      <div class="card border-light mb-3 shadow p-3 mb-5 bg-body rounded"   style={{
          // maxWidth:"100rem",
          margin: "auto",
          width: "90%",
          border: "3px solid green",
          padding: "10px"
      }}>
      <div class="card-header">20 personas  aprueban tu reviwer</div>
      <div class="card-body">
        <h5 class="card-title">Zapatos  {<h6 style={{
            fontSize: "12px"
        }}> 5 days ago</h6>}</h5>
        <p class="card-text">Muy buena marca de zapatos, inmejorable calidad precio</p>
      </div>
    
    </div>
  
    </div>
    
      
  
  }else 
  {
      return <div>
  
  
      <div class="card border-light mb-3 shadow p-3 mb-5 bg-body rounded" style={{
         // maxWidth:"100rem",
         margin: "auto",
         width: "70%",
         border: "3px solid green",
         padding: "10px"
     }}>
     <div class="card-header">Precio actual : 30$</div>
     <div class="card-body">
  
     <Card.Img variant="top" src="https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4ba44497e9484b268bc0ac4700ee0b8a_9366/buzo-corto-con-capucha-essentials-3-tiras.jpg" 
          style={{
              margin: "auto",
              // width: "100%",
              border:"4px solid green",
              width:"200px",
              height:"200px",
              borderRadius:"50px",
              padding: "5px",     
          }} />
  
       <h5 class="card-title">Ropa deportiva Adidas {<h6 style={{
           fontSize: "12px"
       }}> Add 5 days ago</h6>}</h5>
       <p class="card-text">Ropa negra Adidas de tele de seda humedad.</p>
     </div>
   
   </div>
  
   <div class="card border-light mb-3 shadow p-3 mb-5 bg-body rounded" style={{
         // maxWidth:"100rem",
         margin: "auto",
         width: "70%",
         border: "3px solid green",
         padding: "10px"
     }}>
     <div class="card-header">Precio actual : 35$</div>
     <div class="card-body">
  
     <Card.Img variant="top" src="https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/dafce863061a4f63b041ad2600716dcb_9366/sudadera-essentials-3-rayas.jpg" 
          style={{
              margin: "auto",
              // width: "100%",
              border:"4px solid green",
              width:"200px",
              height:"200px",
              borderRadius:"50px",
              padding: "5px",     
          }} />
  
       <h5 class="card-title">Ropa deportiva Adidas {<h6 style={{
           fontSize: "12px"
       }}> Add 7 days ago</h6>}</h5>
       <p class="card-text">Conjunto de sudaderas roja con tela hidrofobica</p>
     </div>
   
   </div>
         </div>
  }
      
    };