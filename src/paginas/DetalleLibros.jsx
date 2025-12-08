import { useContextoCarrito } from "../contexto/ContextoCarrito";
import { Link, useParams, useLocation } from "react-router-dom";
import styled from 'styled-components';

const LibroDetalle = () => {

    // Contexto para el carrito
    const { agregarAlCarrito } = useContextoCarrito();
 
    const { isbn } = useParams();
    const location = useLocation();
    const libro = location.state?.libro;
 
if (!libro) {
    return (
      <div>
        <p>No se pudo cargar el libro</p>
        <Link to="/libros">
          <button className="btn btn-primary center-block opacity-75">Volver a Libros</button>
        </Link>
      </div>
    );
  }
 
  return(
    <>
      <div className="container-md rounded-5 mb-3 py-1 bg-light bg-opacity-50 shadow-lg ">
        <TituloPpal>
        <h3 className="text-center fw-bolder mt-3">{libro.titulo}</h3>
        </TituloPpal>
        {/*Creacion de fila para separar en 2 columnas*/}
        <div className="row align-items-start g-0 mb-3">

          {/*Columna para imagen */}
          <div className="col-md-6">
            <div className="card border-0 bg-light bg-opacity-50">
              <div className="card-body text-center p-2">
                <img src={libro.portada} alt={libro.titulo} className="img-fluid rounded w-75" />
              </div>
            </div>
          </div>

          {/*Columna para la informacion */}
          <div className="col-md-6" >
            <div className="card align-middle border-0 bg-light bg-opacity-50">
              <div className="card-body text-start p-1">
                <Titulos>
                <h4 className="mb-2 fw-bolder mb-3">{libro.autor}</h4>
                </Titulos>
                <h6 className="card-title">ISBN: {libro.isbn}</h6>
                <h6 className="card-title">Editorial: {libro.editorial}</h6>
                <h6 className="card-title">Categoria: {libro.categoria}</h6>
                <h6 className="card-title">Paginas: {libro.paginas}</h6>
                <div className="mb-5">
                  <p className="card-text mb-1">{libro.sinopsis}</p>
                </div>
                <div className="mb-3">
                  <Link to={`/libros`} style={{textDecoration:'none'}}><h4 className="text-success d-inline fw-bold" onClick={() => agregarAlCarrito(libro)}>${libro.precio}</h4></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center mb-3">
        <Link to={`/libros`}><button className="btn btn-primary center-block opacity-75">Volver a Libros</button></Link>
        </div>
      </div>
      
  </>      
  );
}; export default LibroDetalle;

// Styled Components actualizados

const TituloPpal = styled.nav`
  color: darkgreen !important;
`;


const Titulos = styled.nav`
  color: darkcyan !important;
`;


