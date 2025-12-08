import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContextoUsuario } from '../contexto/ContextoUsuario'
import { toast } from "react-toastify";


export default function IniciarSesion() {
  const { iniciarSesion } = useContextoUsuario();
  const navigate = useNavigate();
  const ubicacion = useLocation();
 
  const [formulario, setFormulario] = useState({ nombre: '', email: '' });

  /*const { setIsAuthenticated, setUsuario } = useContextoUsuario();*/

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Verificar credenciales (admin/1234@admin)
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/tablero");
    }
    // Lógica para usuarios normales - si NO es admin
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
  // Guarda el email ingresado y pasa nombre para el token user
  localStorage.setItem("authEmail", formulario.email);
  iniciarSesion(formulario.nombre, formulario.email);

      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/libros");
      }
    } else {
      toast(
        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"
      );
    }
  };


  return (
    <div className="container-md rounded-5 mb-5 py-3 bg-light bg-opacity-75 w-50 shadow-lg" >
      <h3 className="text-center text-success fw-bolder mb-3">Inicia sesión para continuar</h3>
      <form className="form-group" onSubmit={manejarEnvio}>
        <input className="form-control mb-3"
          type="text"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={(e) => setFormulario({...formulario, nombre: e.target.value.toLowerCase()})}
          required
        />
        <input className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) => setFormulario({...formulario, email: e.target.value.toLowerCase()})}
          required
        />
        <button className="btn btn-success center-block m-3 opacity-75" type="submit">Iniciar Sesión</button>
        <button className="btn btn-danger center-block m-3 opacity-75" type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  );
}
