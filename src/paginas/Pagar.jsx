import { useNavigate } from "react-router-dom";
import { useContextoCarrito } from "../contexto/ContextoCarrito";
import { useContextoUsuario } from '../contexto/ContextoUsuario';
import styled from 'styled-components';




export default function Pagar() {
  const { usuario, cerrarSesion } = useContextoUsuario();
  const { carrito, comprar, agregarCantidad, quitarCantidad, total} = useContextoCarrito();
  const navigate = useNavigate();

  return (
        <>
    <div className="container-md rounded-5 mb-3 py-1 bg-light p-5 bg-opacity-75 shadow-lg" id="Carrito-compras">
      <h2 className="text-center text-success fw-bold mb-5">Resumen de tu compra {usuario.nombre}</h2>
          {carrito.map((item) => (
            <div key={item.id}>
            {/*Creacion de fila para separar en 2 columnas*/}
            <div className="row align-items-start g-0 mb-3">
              {/*Columna para imagen */}
              
              <div className="col-md-6">
                  <img src={item.portada} alt={item.titulo} className="img-fluid rounded w-25"/>
              </div>
              {/*Columna para la informacion */}
              <div className="col-md-6" >
                <h5 className="text-primary text-align-start m-1 fw-bold">{item.titulo}</h5>
                <p className="text-success text-align-start m-1 fw-bold">Precio ${Number(item.precio).toFixed(3)}</p>
                <p className="text-success text-align-start m-1 fw-bold">Parcial: ${Number(item.precio).toFixed(3)*(item.cantidad)} </p>
                <p className="text-primary text-align-start m-1 fw-bold">
                <button className="m-2 btn btn-secondary rounded-5 opacity-50 fw-bolder fs-6" onClick={() => quitarCantidad(item.id)}>-</button>
                <span className="m-1">{item.cantidad || 1}</span>
                <button className="m-2 btn btn-secondary rounded-5 opacity-50 fw-bolder fs-6"onClick={() => agregarCantidad(item.id)}>+</button>
                </p>
              </div>  
            </div>
            </div>
          ))}
          <h3 className="text-primary text-align-start m-3 fw-bold">Total: ${(total)}</h3>
          <div>
          <button className="m-2 btn btn-success rounded-3 opacity-75" onClick={comprar}>
            Confimar y Pagar
          </button>
          <button className="m-2 btn btn-danger rounded-3 opacity-75" onClick={() => navigate("/libros")}>
            Cancelar
          </button>
          </div>
    </div>
    </>
  );
}

