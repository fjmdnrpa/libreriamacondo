import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


// Crear el contexto de autenticación
export const ContextoCarrito = createContext();

// Proveedor de autenticación
export function CarProvider({ children }) {

    // Estado del carrito
    const [carrito, setCarrito] = useState([]);
    const [cargaCompleta,setCargaCompleta] = useState(false); //Estado de carga
    const navigate = useNavigate();

    //Se usa para la carga inicial
    useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito"); 
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargaCompleta(true); // Marca que la carga inicial ha terminado
    }, []);       
        
    //Se usa cada vez que el carrito cambie
      useEffect(() => {
        if (cargaCompleta) { // Solo guarda en localStorage si la carga inicial ha terminado
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    }, [carrito, cargaCompleta]);

    // Funciones para el carrito
    //Agregar libro al carrito
    const agregarAlCarrito = (libro) => {
        setCarrito(prevCarrito => {
        const libroExistente = prevCarrito.find(item => item.id === libro.id);
        if (libroExistente) {
            return prevCarrito.map(item =>
            item.id === libro.id ?
            {...item, cantidad: (item.cantidad || 1) +1}
            :item
            );
        } else {
            return [...prevCarrito, {...libro, cantidad: 1}]
        }
        });
        toast(`Producto ${libro.titulo} agregado.`);
        };
    
        //Vaciar carrito
        const vaciarCarrito = () => {
        setCarrito([]);
        };
        //Eliminar libro del carrito
        const eliminarDelCarrito = (productoId) => {
        setCarrito(carrito.filter(item => item.id !== productoId));
        };
        //Quitar una unidad
        const quitarCantidad = (idLibro) => {
        const carritoActualizado = carrito.map(libro => {
        if (libro.id === idLibro) {
            const cantidadActual = libro.cantidad || 1;
            if (cantidadActual === 1) {
                return null;
            }
            return { ...libro, cantidad: cantidadActual - 1 };
            }
            return libro;
        }).filter(libro => libro !== null);
    
        setCarrito(carritoActualizado);
        };
        //Agregar una unidad
        const agregarCantidad = (idLibro) => {
        const nuevoCarrito = carrito.map(libro => {
            if (libro.id === idLibro) {
            return {
                ...libro,
                cantidad: (libro.cantidad || 1) + 1
            };
            
            }
            return libro;
        });
        setCarrito(nuevoCarrito);
        };
    
    // Función para finalizar compra
    const comprar = () => {
        toast("¡Compra realizada con éxito!");
        vaciarCarrito(); // Limpiar carrito después de comprar
        navigate("/");
    };

    const total = carrito.reduce((sum, item) => {
    const cantidad = item.cantidad || 1;
    return sum + (Number(item.precio * cantidad));
  },0);

// Valor que se provee a todos los componentes
  const value = {
    // Carrito
    total,
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    agregarCantidad,
    quitarCantidad,
    comprar
};

return (
    <ContextoCarrito.Provider value={value}>
        {children}
    </ContextoCarrito.Provider>
    );
}

    
export function useContextoCarrito() {
  const context = useContext(ContextoCarrito);
  if (!context) {
    throw new Error("useContextoCarrito debe usarse dentro de CartProvider");
  }
  return context;
}