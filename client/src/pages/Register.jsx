import React, { useEffect, useState } from "react";
import { createUser } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isFullfilled } from "../services";
import { validator } from "../helpers/formValidation/register";
import { Button, FormHandler, Header, Hero, Notification } from "../components";
import PhoneInput from 'react-phone-input-2';


const colorGRis= {
  color: "#848484"
}

export default function Registro() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    //  verificatePassword: "",
    paymentMethod:"", 
    username: "",
    address:"",
    phoneNumber:"",
    postalNumber:""

  });
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,    
    // verificatePassword: false,  
    paymentMethod:false, 
    username: false,
    address:false,
    phoneNumber:false,
    postalNumber:false
  });
  const { response } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validate = async (e) => {
    console.log("test");
    setErrors({
      ...errors,
      [e.target.name]: await validator(e.target.name, e.target.value),
    });
  };

  const handleChange = (e) => {
  
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
   
    e.preventDefault();
    if (!isFullfilled(form, errors)) {
      console.log("Hola mundo")
      dispatch(createUser(form));
    }
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      // verificatePassword: "",
      paymentMethod:"", 
      username: "",
      address:"",
      phoneNumber:"",
      postalNumber:""
      
    });
  };

  useEffect(() => {
    if (response) {
      setShow(true);
    }
  }, [response]);

  let disable = isFullfilled(form, errors);
  return (
    <div className="register--container">
      <Header />
      {response && (
        <Notification
          success={response.success}
          message={response.message}
          show={show}
          setShow={setShow}
        />
      )}
      <div className="register--main--container">
        <Hero
          title="Crea tu cuenta"
          subtitle="Y empieza a comprar productos, con envío a toda Latinoamérica!
            Encontrá miles de marcas y productos."
        />
        <form className="register--main--form">
          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={form.first_name}
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.first_name && <FormHandler error={errors.first_name} />}
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            placeholder="Apellido"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.last_name && <FormHandler error={errors.last_name} />}
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Nombre de usuario"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.username && <FormHandler error={errors.username} />}
          <input
            type="text"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {errors.email && <FormHandler error={errors.email} />}
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Contraseña"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />
          {/* Verificate pass // sin validacion */}
          {/* {errors.verificatePassword && <FormHandler error={errors.verificatePassword} />}
          <input
            type="password"
            name="verificatePassword"
            value={form.verificatePassword}
            placeholder="Verificación de Contraseña"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          /> */}

          {/* Metodo de pago */}
          {errors.paymentMethod && <FormHandler error={errors.paymentMethod} />}
          <select 
           className="register--main--form-input"
           name="paymentMethod"
           style={colorGRis}
           onChange={async e=>{            
            setErrors({
              ...errors,
              [e.target.name]: await validator(e.target.name, e.target.value),
            });
            setForm({ ...form, [e.target.name]: e.target.value });

            }
            }        
          >         
          <option>Metodo de pago</option>
          <option value="debito" >Targeta debito</option>
          <option value="credito">Targeta de credito</option>
          <option value="PayPal">PayPal </option>          
          </select>

          {/* Direccion */}
          {errors.address && <FormHandler error={errors.address} />}
          <input
            type="text"
            name="address"
            value={form.address}
            placeholder="Direccion "
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />

            {/* Telefono de contacto */}
            {errors.phoneNumber && <FormHandler error={errors.phoneNumber} />}
          <input
            type="number"
            name="phoneNumber"
            value={form.phoneNumber}
            placeholder="Telefono de contacto"
            onChange={handleChange}
            onBlur={validate}
            className="register--main--form-input"
          />  

          
          

              {/* Codigo postal */}
              {errors.postalNumber && <FormHandler error={errors.postalNumber} />}
            <input
              type="number"
              name="postalNumber"
              value={form.postalNumber}
              placeholder="codigo postal"
              onChange={handleChange}
              onBlur={validate}             
              className="register--main--form-input"
              max="9999"
            />

          {/* terminos y condiciones */}
          {errors.password && <FormHandler error={errors.password} />}
          <span className="register--main--form-span tyc">
            Al crear una cuenta aceptas nuestros{" "}
            <Link
              to="/terminos-y-condiciones"
              className="register--main--form-link"
            >
              términos y condiciones
            </Link>
          </span>
          <Button
            placeholder="Crear cuenta"
            action={handleSubmit}
            disable={disable}
          />
          <span className="register--main--form-span">
            Ya tienes una cuenta?{" "}
            <Link to="/login" className="register--main--form-link">
              Inicia sesión
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
