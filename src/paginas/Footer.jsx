import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMailBulk } from 'react-icons/fa';

function Footer() {
    return (
    <>
    
    <div className='container-fluid bg-ligth'>
        <Lista>
        <ul className="list-group list-group-horizontal justify-content-center ">
            <li class="list-group-item mx-md-5 border-0 bg-transparent">
            <NavLink to="https://facebook.com"><FaFacebook/></NavLink>
            </li>
            <li class="list-group-item mx-md-5 border-0 bg-transparent">
            <NavLink to="https://instagram.com"><FaInstagram/></NavLink>
            </li>
            <li class="list-group-item mx-md-5 border-0 bg-transparent">
            <NavLink to="https://whatsapp.com"><FaWhatsapp/></NavLink>
            </li>
            <li class="list-group-item mx-md-5 border-0 bg-transparent">
            <NavLink to="mailto:libreria-macondo@gmail.com"><FaMailBulk/></NavLink>
            </li>
        </ul>
        </Lista>
        <Componentes>
        <p className="fw-bolder">Â© 2025 Libreria Macondo - Todos los derechos reservados</p>    
        </Componentes>
    </div> 
    </>
)} 

export default Footer;

// Styled Components actualizados
const Componentes = styled.nav`
    color: darkcyan !important;
`;

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

const Lista = styled.nav`
  color: darkcyan !important;
`;


