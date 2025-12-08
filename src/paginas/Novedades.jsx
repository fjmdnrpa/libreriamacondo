import { Link, useNavigate } from "react-router-dom";
import { useContextoCarrito } from "../contexto/ContextoCarrito";
import { useContextoUsuario } from "../contexto/ContextoUsuario";
import { useLibros } from "../contexto/ContextoLibros";
import { useEffect, useState } from "react";
import styled from 'styled-components';

export default function Libros() {
  const { libros, cargando, error } = useLibros();
  const { agregarAlCarrito } = useContextoCarrito();
  const { esAdmin } = useContextoUsuario();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const manejarEliminar = (libro) => {
    // Navegar a la página de confirmación de eliminación
    navigate('/eliminar-libros', { state: { libro } });
  };

  const manejarEditar = (libro) => {
    // Navegar al formulario de edición
    navigate('/formulario-libros', { state: { libro } });
  };

  const librosPorPagina = 6;

  const librosNovedades = libros.filter((libro) => libro.categoria === "Novedades" );


  const librosFiltrados = librosNovedades.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      (libro.autor &&
        libro.autor.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoLibro = paginaActual * librosPorPagina;
  const indicePrimerLibro = indiceUltimoLibro - librosPorPagina;
  const librosActuales = librosFiltrados.slice(indicePrimerLibro, indiceUltimoLibro);
 
  // Cambiar de página
  const totalPaginas = Math.ceil(librosFiltrados.length / librosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  if (cargando) return <p>Cargando libros...</p>;
  if (error) return <p>{error}</p>;

   return (
    <>
      <div className="container mt-4">
        {/* Barra de búsqueda */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 mx-auto">
            <input
              type="text"
              placeholder="Buscar libro por titulo o autor..."
              className="form-control"
              value={busqueda}
              onChange={manejarBusqueda}
            />
            {busqueda && (
              <small className="text-muted">
                Mostrando {librosFiltrados.length} de {librosNovedades.length} Libros
              </small>
            )}
          </div>
        </div>

        {/* Grilla de libros */}
        <div className="row">
          {librosActuales.map((libro) => (
            <div key={libro.id} className="col-12 col-md-6 col-lg-4 mb-4 ">
              <div className="card h-100 bg-light bg-opacity-75 shadow-sm rounded-4">
                <Link to={`/libros/${libro.categoria}/${libro.isbn}`} state={{libro}}>
                <img
                  src={libro.portada}
                  alt={libro.titulo}
                  className="card-img-top rounded-4"
                  style={{ height: "auto", objectFit: "cover" }}
                />
                </Link>
                <div className="card-body d-flex flex-column">
                  <Titulos>
                  <h5 className="card-title fw-bolder">{libro.titulo}</h5>
                  <h5 className="card-title fw-bolder">{libro.autor}</h5>
                  <h5 className="d-inline fw-bold">${libro.precio}</h5>
                  </Titulos>
                  <div className="mt-auto ">
                    {!esAdmin && (
                    <div className="d-grid gap-2">
                      <Link
                        to={`/libros/${libro.categoria}/${libro.isbn}`}
                        state={{libro}}
                        className="btn btn-primary btn-sm w-75 mx-auto"
                      >
                        Ver detalles
                      </Link>
                      <button className="btn btn-sm btn-success w-75 mx-auto"
                        onClick={() => agregarAlCarrito(libro)}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                    )}

                    {/* Botones de admin */}
                    {esAdmin && (
                      <div className="mt-3 pt-3 border-top">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => manejarEditar(libro)}
                            className="btn btn-success btn-sm flex-fill"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => manejarEliminar(libro)}
                            className="btn btn-danger btn-sm flex-fill"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Paginador - Estilo simplificado */}
        {librosFiltrados.length > librosPorPagina && (
          <div className="d-flex justify-content-center my-2">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}


        {/* Información de la página actual */}
        {librosFiltrados.length > 0 && (
          <div className="text-center text-primary my-2">
            <small>
              Mostrando {librosActuales.length} libros
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}
      </div>
    </>
  );
}

// Styled Components actualizados
const Titulos = styled.nav`
  color: darkgreen !important;

`;