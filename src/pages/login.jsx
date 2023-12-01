import "../styles/login.css";
import AuthService from "../services/AuthService";
import React, { useState } from "react";

import { useNavigate  } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export function Login() {
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await AuthService.authenticate(formData.email, formData.password);
        
        const accessToken = data.access_token;
        
        // Almacena el token de acceso en el estado o en algún almacenamiento seguro
        // Ejemplo usando el estado del componente:
        setFormData({ ...formData, accessToken });
        
        
         // Verifica si hay un token de acceso antes de redirigir
      if (accessToken) {
        setAuth({ email: formData.email, accessToken });
        console.log("Inicio de sesión exitoso. Redirigiendo a /inicio");
        navigate("/inicio");
      

      } else {
        console.log("Inicio de sesión fallido. No se redirige.");
        // Aquí puedes manejar lógica adicional para mostrar un mensaje de error, etc.
      }
         // Maneja los datos de respuesta según sea necesario
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
  };




  return (
    <>
      <div className="wrapper">
      <div className="container main-login">
        <div className="row">
          <div className="col-md-6 side-image">
            <div className="text">
              <p className="bg-black">Santa Rosa</p>
            </div>
          </div>
          <div className="col-md-6 right">
            <div className="input-box">
              <header>Create account</header>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required=""
                    autoComplete="off"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required=""
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Entrar" />
                  
                </div>
                <div className="signin">
                  <span>
                    Already have an account? <a href="#">Log in here</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
