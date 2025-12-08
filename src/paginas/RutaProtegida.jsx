import React from 'react';
import { useContextoUsuario } from '../contexto/ContextoUsuario';
import { Navigate, useLocation } from 'react-router-dom';

function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, cargando } = useContextoUsuario();
  const location = useLocation();

  if (cargando) {
    return <div>Cargando...</div>;
  }
 
  if (!usuario) {
    // Pasa el state actual (que contiene el carrito) a /login
    return <Navigate to="/iniciar-sesion" state={location.state} replace />;
  }

  if (soloAdmin && usuario.nombre !== "admin") {
    return <Navigate to="/libros" replace />;
  }
  return children;
} export default RutaProtegida;

