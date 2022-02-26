import React from "react";
import {Row, Col, Card, Container, Border} from "react-bootstrap";
import Holder from "react-holder";
import { useState, useEffect } from "react";
import { Pages } from "@mui/icons-material";

export default function PerfilUser(){

    const [link, setLink] = useState();
    const [text_1, setText_1] = useState("nav-link active");
    const [text_2, setText_2] = useState("nav-link ");
    const [text_3, setText_3] = useState("nav-link ");
    const [text_4, setText_4] = useState("nav-link ");
// let text_1 ="nav-link active";
// let text_2 ="nav-link ";
// let text_3 ="nav-link ";

function ChoiseDir()
{
    setText_1("nav-link")
    setText_2("nav-link")
    setText_3("nav-link")
    setText_4("nav-link")

    if(link === "Acount" )
    setText_1("nav-link active")
    else if(link === "Purchase history")
    setText_2("nav-link active")
    else if(link === "Reviewer")
    setText_3("nav-link active")
    else 
    setText_4("nav-link active")
} 

useEffect(() => {

    ChoiseDir()

  }, [link]);

  
function C(e){
    
    console.log("hola mundo");
    e.preventDefault();

}


// rutas nav user history
const Pages = () => {
    
  if(link === "Acount")
  {
     return <p>
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
  }else if(link === "Reviewer")
  {
    return <div>
     <div class="card border-light mb-3 shadow p-3 mb-5 bg-body rounded" style={{
        // maxWidth:"100rem",
        margin: "auto",
        width: "90%",
        border: "3px solid green",
        padding: "10px"
    }}>
    <div class="card-header">6 personas  aprueban tu reviwer</div>
    <div class="card-body">
      <h5 class="card-title">Ropa deportiva nike {<h7 style={{
          fontSize: "12px"
      }}> 5 days ago</h7>}</h5>
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
      <h5 class="card-title">Zapatos  {<h7 style={{
          fontSize: "12px"
      }}> 5 days ago</h7>}</h5>
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

     <h5 class="card-title">Ropa deportiva Adidas {<h7 style={{
         fontSize: "12px"
     }}> Add 5 days ago</h7>}</h5>
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

     <h5 class="card-title">Ropa deportiva Adidas {<h7 style={{
         fontSize: "12px"
     }}> Add 7 days ago</h7>}</h5>
     <p class="card-text">Conjunto de sudaderas roja con tela hidrofobica</p>
   </div>
 
 </div>
       </div>
}
    
  };


// Main Render

return(
        <div  >
            <br />
          <Container>
  <Row>


      
    <Col><Card
    class="shadow p-3 mb-5 bg-body rounded"
    style={{ 
        width: '20rem',
        position :"relative",
        // right:"30px"
}}> 
   
    
     <div style={{
 
        position : "relative",
        textAlign:"center",
        right:"-20px",
        
        }}  >


<br/>
<br/>            





     <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&usqp=CAU" 
        style={{
            margin: "auto",
            // width: "100%",
            border:"4px solid #666",
            width:"200px",
            height:"200px",
            borderRadius:"200px",
            padding: "5px",
            

      
        }} />


              <br />
    <h6 >   cambiar foto 
              </h6>
              <br />

    <h6 >   Nombre: First name + Last name 
              </h6>
    <h6 >   Usuario: Username  
              </h6>
            <br/>
            <p  style={{
        textAlign: 'left'
      
        }}>
                informacion de Contacto
           <br/> Cellphone: 
           <br/> address1: 
           <br/> address2:
           <br/> pais:
           <br/> codigopostal:
           <br/> Email:
            </p>
            <br/>
                
 <h6> About me. </h6>
 <textarea name="" id="" cols="30" rows="10"></textarea>
 <button type="button" class="btn btn-secondary">Guardar</button>
              </div>
              <br />
              
    </Card >
    
    </Col >   
      
    <Col xs={8}  style={{ 
position:"relative",
top:"20px"
}}><Card class="shadow p-3 mb-5 bg-body rounded">
    <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <h7 class={text_1} 
         type="submit"
         onClick={
             (e)=>{
                 setLink("Acount")
                 e.preventDefault();
             }

         }>Acount</h7>
      </li>
      
      <li class="nav-item">
        <h7 type="button" class={text_2} 
           type="submit"
           onClick={
               (e)=>{
                 
                   setLink("Purchase history")                
                  e.preventDefault();
               }
            }
           
        >Purchase history </h7>
      </li>
      <li class="nav-item">
        <h7 class={text_3} 
         type="submit"
         onClick={
             (e)=>{
               
              
                 setLink("Reviewer")
              
                 e.preventDefault();
             }
          }
            
        >Reviewer</h7>
      </li>

      <li class="nav-item">
        <h7 class={text_4} 
         type="submit"
         onClick={
             (e)=>{
               
              
                 setLink("wishes")
              
                 e.preventDefault();
             }
          }
            
        >Wishes</h7>
      </li>
    </ul>
  </div>

  <br />
<Pages/>


         </Card></Col>
    
  </Row>

 
  
</Container>
<br />

        </div>
    )
}