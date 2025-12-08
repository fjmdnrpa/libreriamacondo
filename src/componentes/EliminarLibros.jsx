import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EliminarLibros() {
  const location = useLocation();
  const navigate = useNavigate();
  const libro = location.state?.libro;
 
  const [cargando, setCargando] = useState(false);

  // Función para eliminar libro
  const eliminarLibro = async () => {
    if (!libro) return;
   
    setCargando(true);
    try {
      const respuesta = await
      fetch(`https://68e1486a8943bf6bb3c3d07d.mockapi.io/api/libros/${libro.id}`, {
        method: 'DELETE',
      });
     
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el libro.');
      }


      alert('Libro eliminado correctamente.');
     
     navigate('/libros');
     setTimeout(() => {
      window.location.reload();
    }, 100);
     
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al eliminar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el libro "${libro.titulo}"?\n\nEsta acción no se puede deshacer.`
    );
   
    if (confirmar) {
      eliminarLibro();
    }
  };


  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Eliminar Libro</h2>
      <div style={{ display:'flex', flexDirection:"column", justifyContent:"center", alignItems:"center",
        
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ color: '#dc3545' }}>¿Estás seguro de que deseas eliminar este libro?</h3>
       
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>ISBN:</strong> {libro.isbn}</p>
          <p><strong>Titulo:</strong> {libro.titulo}</p>
          <p><strong>Autor:</strong> {libro.autor}</p>
          <p><strong>Editorial:</strong> {libro.editorial}</p>
          {libro.portada && (
            <img
              src={libro.portada}
              alt="Libro a eliminar"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}
        </div>


        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Esta acción no se puede deshacer. El libro será eliminado permanentemente.
        </p>
      </div>


      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={manejarEliminar}
          disabled={cargando}
          style={{
            padding: '12px 24px',
            backgroundColor: cargando ? '#ccc' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {cargando ? 'Eliminando...' : 'Sí, Eliminar'}
        </button>
       
        <button
          onClick={() => navigate('/libros')}
          disabled={cargando}
          style={{
            padding: '12px 24px',
            backgroundColor: cargando ? '#ccc' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
} export default EliminarLibros;
