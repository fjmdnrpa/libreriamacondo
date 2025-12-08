import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContextoUsuario } from '../contexto/ContextoUsuario';
import { useContextoCarrito } from '../contexto/ContextoCarrito';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useContextoUsuario();
  const { vaciarCarrito, carrito } = useContextoCarrito();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    navigate("/libros");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  
  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top p-3">
        <div className="container-fluid">
          <Logo to="/" className="navbar-brand"> LIBRERIA<br></br> MACONDO</Logo>
          <button style={{color:"darkcyan",backgroundColor:"darkcyan"}}
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/libros" className="nav-link">Libros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/novedades" className="nav-link">Novedades</NavLink>
              </li>
                            <li className="nav-item">
                <NavLink to="/masvendidos" className="nav-link">Mas Vendidos</NavLink>
              </li>
                {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <NavLink to="/tablero" className="nav-link">Administracion</NavLink>
                </li>
                 )}         
            </ul>
            <SeccionUsuario className="d-flex align-items-center gap-3">
              <ContenedorCarrito> 
                <IconoCarrito to="/carrito" className="nav-link d-flex align-items-center">
                  <FaShoppingCart />  
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito>
                      {totalItemsCarrito}
                    </ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>
              {isAuthenticated ? (
                <ContenedorUsuario className="d-flex align-items-center gap-3">
                  <Bienvenida>Hola, {usuario.nombre}</Bienvenida>
                  <BotonCerrarSesion onClick={manejarCerrarSesion} className="btn btn-outline-light btn-sm">
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </ContenedorUsuario>
              ) : (
                <NavLink to="/iniciar-sesion" className="nav-link">Iniciar Sesión</NavLink>
              )}
            </SeccionUsuario>
            
          </div>
        </div>
      </NavbarContainer>
      <NavbarSpacer />
    </>
  )
} 

export default Navbar;

// Styled Components actualizados
const NavbarContainer = styled.nav`
  background-color: #eeee !important;
  padding: 0.8 rem 1rem;
`;

const NavbarSpacer = styled.div`
  height: 80px;

  @media (max-width: 991.98px) {
    height: 76px;
  }
`;

const Logo = styled(Link)`
  color: darkcyan !important; 
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
 
  &:hover {
    color: darkgreen !important;
  }
`;


// NavLink normal (para usuarios)
const NavLink = styled(Link)`
  color: darkcyan !important; 
  text-decoration: none;
  padding: 0.8rem 2rem;
  font-size: 1.3rem;
  font-weight: bold;
 
  &:hover {
    color: darkgreen !important;
    text-decoration: none;
    background-color: white;
    border-radius: 20px;
  }
`;

const Bienvenida = styled.span`
  color: darkcyan !important; 
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 991.98px) {
    margin-bottom: 0.5rem;
  }
`;

const BotonCerrarSesion = styled.button`
  background: transparent;
  color: darkcyan !important;  
  font-weight: bold;
  border: 2px solid darkcyan ;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;
 
  &:hover {
    background: white;
    color: darkgreen !important;
    border: 2px solid darkgreen ;
  }

  @media (max-width: 991.98px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconoCarrito = styled(Link)`
  color: darkcyan !important;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 2rem;
  gap: 5px;
 
  &:hover {
    color: darkgreen !important;
    background-color: white;
    border-radius: 20px;
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const SeccionUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;
