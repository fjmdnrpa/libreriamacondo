import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "react-toastify";

export const ContextoLibros = createContext();

export const LibrosProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función de validación en el contexto
  const validarLibro = (libro) => {
    const errores = {};

    // ISBN
    if (!libro.isbn?.trim()) {
      errores.isbn = 'El ISBN es obligatorio.'}
    else if (libro.isbn.length != 13) {
      errores.isbn = 'La cantidad de caracteres del ISBN son 13';
     }

    // Titulo
    if (!libro.titulo?.trim()) {
      errores.titulo = 'El titulo es obligatorio.';
    } 
    //    else {
    //  const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
    //  const precioNumerico = parseFloat(precioLimpio);
     
    //  if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
    //    errores.precio = 'Solo números, puntos o comas.';
    //  } else if (isNaN(precioNumerico)) {
    //    errores.precio = 'Precio no válido.';
    //  } else if (precioNumerico <= 0) {
    //    errores.precio = 'Debe ser mayor a 0.';
    //  }
    //}

    // Autor
    if (!libro.autor?.trim()) {
      errores.autor = 'El autor es obligatorio.';
    } 

    // Editorial
    if (!libro.editorial?.trim()) {
      errores.editorial = 'El editorial es obligatorio.';
    } 

    // Paginas
    if (libro.paginas < 0) {
      errores.paginas = 'La cantidad de paginas debe ser mayor o igual a 0';
    } 
    
    // Precio
    if (libro.precio <= 0) {
      errores.precio = 'El precio debe ser mayor a 0';
    } 

    // Sinopsis
    if (!libro.sinopsis?.trim()) {
      errores.sinopsis = 'La sinopsis es obligatoria.';
    } else if (libro.sinopsis.length < 30) {
      errores.sinopsis = 'Mínimo 30 caracteres.';
    } else if (libro.sinopsis.length > 400) {
      errores.sinopsis = 'Máximo 400 caracteres.';
    }

    return errores;
  };

  // Función para validar si el formulario es válido - nombre simplificado
  const validar = (libro) => {
    const errores = validarLibro(libro);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        const respuesta = await fetch('https://68e1486a8943bf6bb3c3d07d.mockapi.io/api/libros');
        if (!respuesta.ok) throw new Error('Error al cargar libros');
        const datos = await respuesta.json();
        setLibros(datos);
      } catch (error) {
        console.error('Error al cargar los libros:', error);
        setError("Hubo un problema al cargar los libros.");
      } finally {
        setCargando(false);
      }
    };
    cargarLibros();
  }, []);

  const agregarLibro = async (nuevoLibro) => {
    try {
      const respuesta = await fetch('https://68e1486a8943bf6bb3c3d07d.mockapi.io/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoLibro),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el libro');

      const data = await respuesta.json();
      setLibros(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error al agregar libro:', error);
      throw error;
    }
  };

  const editarLibro = async (libroActualizado) => {
    try {
      const respuesta = await fetch(`https://68e1486a8943bf6bb3c3d07d.mockapi.io/api/libros/${libroActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libroActualizado),
      });

      if (!respuesta.ok) throw new Error('Error al editar el libro');

      const data = await respuesta.json();
      setLibros(prev =>
        prev.map(libro =>
          libro.id === libroActualizado.id ? data : libro
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar libro:', error);
      throw error;
    }
  };

  return (
    <ContextoLibros.Provider
      value={{
        libros,
        cargando,
        error,
        agregarLibro,
        editarLibro,
        validarLibro,
        validar
      }}>
      {children}
    </ContextoLibros.Provider>
  );
};

// Hook personalizado para el contexto
export const useLibros = () => {
  const context = useContext(ContextoLibros);
  if (!context) {
    throw new Error('useLibros debe ser usado dentro de un LibrosProvider');
  }
  return context;
};

