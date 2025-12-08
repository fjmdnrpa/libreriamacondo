import React, { useState } from 'react'
import styled from 'styled-components';


function Inicio() {
  return(
    <>
      <div className="container-md rounded-5 mt-3 mb-1 py-1 bg-light bg-opacity-50 shadow-lg ">
        <Titulos>
        <h1 className="text-center fw-bolder mt-1">LIBRERIA MACONDO</h1>
        <h3 className="text-center fw-bolder mb-2">Todos los universos del mundo en un solo sitio</h3>
        </Titulos>
        {/*Creacion de fila para separar en 2 columnas*/}
        <div className="row align-items-start g-0 mb-2">
          {/*Columna para imagen */}
          <div className="col-md-6 mx-auto bg-light bg-opacity-50 ">
            <img src="macondo.jpg" alt='Libreria macondo' className="img-fluid rounded-5 w-50 mb-1" />
          </div>
        </div>
      </div>
    </>
  )
 
}; export default Inicio

// Styled Components actualizados
const Titulos = styled.nav`
  color: darkcyan !important;
`;

