import React from "react";
import {Row, Col, Card, Container, Border, FormControl, Form} from "react-bootstrap";
import Holder from "react-holder";
import { useState, useEffect } from "react";
import { Pages } from "@mui/icons-material";
import { useSelector ,useDispatch} from "react-redux";
import { useLayoutEffect } from "react";
import { NavBar } from ".";
import ProfileTables from "./ProfileTables";


import { getProductsPublic, createShoppingSession, checkSession } from "../Redux/Actions/actions"; 

export default function PerfilUser(){

  //Desplazamiento
    const [link, setLink] = useState();
    const [text_1, setText_1] = useState("nav-link active");
    const [text_2, setText_2] = useState("nav-link ");
    const [text_3, setText_3] = useState("nav-link ");
    const [text_4, setText_4] = useState("nav-link ");

    const [Editar, setEditar] = useState(false);

    const [changeValues, setChangeValues] = useState({
      "first_name":"",
      "last_name":"",
      "email":"",
      "username":""
    });

//traer informacion del usuario.
let { user } = useSelector((state) => state.session);

let dispatch = useDispatch();

//editar informascion y guardarla.
//parcialmente hecho dejar para despues

// agregar funcionalidades de guardar foto.

const [selectedFile, setSelectedFile] = useState();


const changeHandler = (event) => {
  if (event.target.files && event.target.files[0]) {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  }
  event.preventDefault()
};

// traser se las ordenes 

// agrgar cards  para 

function ChoiseDir()
{
    setText_1("nav-link")
    setText_2("nav-link")
    setText_3("nav-link")
    setText_4("nav-link")



    if(link === "Account" )
    setText_1("nav-link active")
    else if(link === "Purchase history")
    setText_2("nav-link active")
    else if(link === "Reviewer")
    setText_3("nav-link active")
    else 
    setText_4("nav-link active")
} 


useLayoutEffect(()=>{
    
  if(JSON.parse(localStorage.getItem('eCUs'))){
    let {Token}=JSON.parse(localStorage.getItem('eCUs'))
    if(Token!==''){
      dispatch(checkSession(Token))
    }
  }
},[])

useEffect(() => {

  ChoiseDir()
  console.log(user)
  // if(!user.perilImg)
  // setSelectedFile("https://publicidaddigital.ucentral.edu.co/wp-content/uploads/sites/6/2021/08/Sin-perfil.jpg")
  
  }, [link, user]);

  
function  handleSubmit(e)
  {
      console.log(changeValues)
      setEditar(!Editar)   
      e.preventDefault()
  }

// Main Render

return(
  <div  >
          <NavBar isScroll={true} />
            <br /> <br />
            <br /> <br />
          <Container>
  <Row>


      
    <Col><Card
    className="shadow p-3 mb-5 bg-body rounded"
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
{    Editar?<div>
  
    <Card.Img variant="top" src={selectedFile} 
        style={{
          margin: "auto",
          // width: "100%",
          position:"relative",
          right:"30px",
          border:"4px solid #666",
          width:"200px",
          height:"200px",
          borderRadius:"200px",
          padding: "5px",      
        }}        
        />
        <input type="file" onChange={changeHandler} className="filetype" />
  </div>
:<div>
  
<Card.Img variant="top" src={selectedFile} 
    style={{
      margin: "auto",
      // width: "100%",
      position:"relative",
      right:"30px",
      border:"4px solid #666",
      width:"200px",
      height:"200px",
      borderRadius:"200px",
      padding: "5px",      
    }}        
    />   
</div>}
 
              <br />
    <h6 >   Profile photo.
              </h6>
              <br />

    <h6 >   Name: {user.first_name +" "+ user.last_name} 
              </h6>
    <h6 >   Use-name: {user.username} 
              </h6>
            <br/>
      {    Editar? <div> 
        <Form  onSubmit={handleSubmit} > 
         <p  style={{
        textAlign: 'left'
      
        }}>
                informacion de Contacto
           <br/> Cellphone: <FormControl
          type="search"          
          className="me-1"
          aria-label="Search"        
          style={{width:"50%"}} 
        />
            <br/> Address1: <FormControl
          type="search"          
          className="me-1"
          aria-label="Search"
          style={{width:"50%"}} 
        />
           <br/> Address2:
           <FormControl
          type="search"           
          className="me-1"
          aria-label="Search"
          style={{width:"50%"}} 
        />
           <br/> Country:
           <FormControl
          type="search"          
          className="me-1"
          aria-label="Search"
          style={{width:"50%"}} 
        />
           <br/> Postal:
           <FormControl
          type="search"          
          className="me-1"
          aria-label="Search"
          style={{width:"50%"}} 
        />
           <br/> Email: 
           <FormControl
          type="search"           
          className="me-1"
          aria-label="Search"
          style={{width:"50%"}}  

          value={changeValues.email}
          onChange={e=>{  setChangeValues(prevState => ({
            ...prevState,
            ["email"]: e.target.value
          }));
        }}
        />
            </p> 
     <h6> About me. </h6>
     <textarea name="" id="" cols="30" rows="10"></textarea>
     <br />
     <button type="submit"  className="btn btn-secondary">Save</button>        
            
     </Form>
            </div>
            : <div>
 <Form   onSubmit={handleSubmit}> 
<p  style={{
  textAlign: 'left'

  }}>
          informacion de Contacto
         
     <br/> Cellphone: 
     <br/> Address1: 
     <br/> Address2:
     <br/> Country:
     <br/> Postal:
     <br/> Email: {user.email}
      </p>
               
      <h6> About me. </h6>
 <p> Without information  about user.</p>
 <button type="submit" className="btn btn-secondary">Edit</button>
 </Form>
      </div>
}            
 
<br/>
              </div>
              <br />
              
    </Card >
    
    </Col >   
      
    <Col xs={8}  style={{ 
position:"relative",
top:"20px"
}}><Card className="shadow p-3 mb-5 bg-body rounded">
    <div className="card-header">
    <ul className="nav nav-tabs card-header-tabs">
      <li className="nav-item">
        <h6 className={text_1} 
         type="submit"
         onClick={
             (e)=>{
                 setLink("Account")
                 e.preventDefault();
             }

         }>Account</h6>
      </li>
      
      <li className="nav-item">
        <h6 type="button" className={text_2} 
          //  type="submit"
           onClick={
               (e)=>{
                 
                   setLink("Purchase history")                
                  e.preventDefault();
               }
            }
           
        >Purchase history </h6>
      </li>
      <li className="nav-item">
        <h6 className={text_3} 
         type="submit"
         onClick={
             (e)=>{
               
              
                 setLink("Reviews")
              
                 e.preventDefault();
             }
          }
            
        >Reviewer</h6>
      </li>

      <li className="nav-item">
        <h6 className={text_4} 
         type="submit"
         onClick={
             (e)=>{
               
              
                 setLink("Whishlist")
              
                 e.preventDefault();
             }
          }
            
        >Wishes</h6>
      </li>
    </ul>
  </div>

  <br />
<ProfileTables link={link}/>
         </Card></Col> 
  </Row>

 
  
</Container>
<br />

        </div>
    )
}