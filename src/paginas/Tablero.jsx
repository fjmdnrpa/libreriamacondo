import React from 'react';
import { useContextoUsuario } from '../contexto/ContextoUsuario';
import { Link, useNavigate } from "react-router-dom";




export default function Tablero() {
  const { usuario, cerrarSesion } = useContextoUsuario();
  const navigate = useNavigate();

  // Función para navegar al formulario de agregar libro
  const manejarAgregarLibro = () => {
    navigate('/formulario-libros');
  };

  // Obtener el token actual
  const tokenActual = localStorage.getItem('authToken');


  return (
  <>    
    <div className="container-md rounded-5 mt-5 mb-5 py-1 bg-light bg-opacity-75 shadow-lg w-50 ">
      <h3 className="text-center text-success fw-bolder">Tablero Administrativo</h3>
    </div>
    {/* SECCIÓN DE IDENTIFICACION */}
    <div className="container-md rounded-5 mb-5 py-1 bg-light bg-opacity-75 shadow-lg w-50">
      <h5 className="text-primary mb-1 fw-bolder" >Sesión iniciada como: {usuario.nombre}</h5>
      <h5 className="text-success mb-2 fw-bolder">Token de autenticación: {tokenActual}</h5>
    </div>  
       {/* SECCIÓN DE ACCIONES ADMIN */}
    <div className="container-md rounded-5 mb-5 py-1 bg-light bg-opacity-75 shadow-lg w-50">    
      <h4 className="text-primary mb-2 fw-bolder">Acciones:</h4>
      <button className="m-2 btn btn-success rounded-5 opacity-75 fw-medium" onClick={manejarAgregarLibro}>Agregar Libros</button>
      <Link to={`/libros`}><button className="m-2 btn btn-info opacity-75 fw-mediuem rounded-5"> Ver / Editar /Eliminar</button></Link>
      <button className="m-2 btn btn-danger rounded-5 opacity-75 fw-medium" onClick={cerrarSesion}>Cerrar Sesion</button>
    </div>
  </>
  );
}
