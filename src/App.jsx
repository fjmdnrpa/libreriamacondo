import React, { useState } from 'react'
import Novedades from './paginas/Novedades'
import MasVendidos from './paginas/MasVendidos'
import Libros from './paginas/libros'
import Carrito from './paginas/Carrito'
import LibroDetalle from './paginas/DetalleLibros'
import Pagar from "./paginas/Pagar"
import Tablero from "./paginas/Tablero"
import Inicio from "./paginas/Inicio"
import RutaProtegida from "./paginas/RutaProtegida"
import IniciarSesion from "./paginas/IniciarSesion"
import { Routes, Route } from 'react-router-dom'
import { CarProvider } from './contexto/ContextoCarrito'
import { UsrProvider } from './contexto/ContextoUsuario'
import { LibrosProvider } from "./contexto/ContextoLibros";
import FormularioLibros from './componentes/FormularioLibros';
import EliminarLibros from "./componentes/EliminarLibros";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './componentes/Layout';
import './App.css'

function App() {

  return (
    <div class='bg-image-custom'>
      <UsrProvider>
        <CarProvider>
          <LibrosProvider>
            <Layout>
              <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/libros' element={<Libros />} />
                <Route path='/novedades' element={<Novedades />} />
                <Route path='/masvendidos' element={<MasVendidos />} />
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/libros/:categoria/:isbn' element={<LibroDetalle />} />
                <Route path="/iniciar-sesion" element={<IniciarSesion />}/>
                <Route path="/pagar" element={<RutaProtegida>
                  <Pagar  />
                </RutaProtegida>}/>
                <Route path="/tablero" element={<RutaProtegida soloAdmin={true} >
                  <Tablero />
                </RutaProtegida>}/>
                <Route path="/formulario-libros" element={<RutaProtegida soloAdmin={true}><FormularioLibros />
                </RutaProtegida>}/>
                <Route path="/eliminar-libros" element={<RutaProtegida soloAdmin={true}><EliminarLibros />
                </RutaProtegida>}/>
              </Routes>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
              />
            </Layout>
          </LibrosProvider>
        </CarProvider>
      </UsrProvider>
    </div>
  )
}

export default App

