import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLibros } from '../contexto/ContextoLibros';
import { toast } from "react-toastify";

function FormularioLibros() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarLibro, editarLibro, validar } = useLibros();
 
  // Obtener el libro pasado por el state
  const libroRecibido = location.state?.libro;
 
  // Determina el modo
  const modo = libroRecibido ? "editar" : "agregar";
 
  // Estados del componente
  const [libro, setLibro] = useState({
        isbn: '',
        categoria: '',
        titulo: '',
        autor: '',
        editorial: '',
        paginas: '',
        sinopsis: '',
        precio: '',
        portada: ''
});
 
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  // Cargar datos del libro si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && libroRecibido) {
      setLibro({
        id: libroRecibido.id || '',
        isbn: libroRecibido.isbn || '',
        categoria: libroRecibido.categoria || '',
        titulo: libroRecibido.titulo || '',
        autor: libroRecibido.autor || '',
        editorial: libroRecibido.editorial || '',
        paginas: libroRecibido.paginas || 0,
        sinopsis: libroRecibido.sinopsis || '',
        precio: libroRecibido.precio || 0,
        portada: libroRecibido.portada || ''
      });
    }
  }, [modo, libroRecibido]);

  // f(x) manejarCambios | inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
   
    // Valida longitud max. descripción
    if (name === 'sinopsis' && value.length > 400) return;
   
    setLibro(prev => ({ ...prev, [name]: value }));
   
    // Limpiar error del campo si existe
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  // f(x) validarFormulario - ahora usa la validación del contexto
  const validarLibro = () => {
    const resultado = validar(libro);
    setErrores(resultado.errores);
    return resultado.esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
   
    // Valida antes de enviar usando el contexto
    if (!validarLibro()) return;

    setCargando(true);
    try {
      const libroEnviar = {
        ...libro
        // precio: producto.precio.toString().replace(',', '.')
      };

      if (modo === "agregar") {
        // Usar el contexto para agregar libro
        const nuevoLibro = await agregarLibro(libroEnviar);
        toast(`El libro "${nuevoLibro.titulo}" fue agregado correctamente con ID: ${nuevoLibro.id}`);
       
        // Limpiar formulario después del éxito
        setLibro({
          id: '',
          isbn: '',
          categoria: '',
          titulo: '',
          autor: '',
          editorial: '',
          paginas: '',
          sinopsis: '',
          precio: '',
          portada: ''
        });

        setTimeout(() => {
          navigate('/libros');
        }, 100);

      } else {
        // Usar el contexto para editar libro
        await editarLibro(libroEnviar);
        toast('Libro actualizado correctamente');

        setTimeout(() => {
          navigate('/libros');
        }, 100);
      }
     
      setErrores({});
     
    } catch (error) {
      toast(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el libro`);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    if (modo === "editar") {
      toast('Edición cancelada');
      navigate('/libros');
    }
  };

  // Renderizado del componente
  return (
    <div className="container-md rounded-5 mb-5 py-3 bg-light bg-opacity-75 w-50 shadow-lg" >
    <form className="form-group" onSubmit={manejarEnvio}>
      <h3 className="text-center text-success fw-bolder mb-3">{modo === "editar" ? 'Editar' : 'Agregar'} Libro</h3>
      {modo === "editar" && libroRecibido && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Editando: {libroRecibido.titulo} (ID: {libroRecibido.id})
        </p>
      )}
      {/* Campo ISBN */}
      <div>
        <input className="form-control mb-3"
          type="text"
          name="isbn"
          value={libro.isbn}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            border: `1px solid ${errores.isbn ? 'red' : '#ccc'}`,
          }}
          placeholder="Ingrese el ISBN del libro (*)"
        />
        {errores.isbn && <p className="text-center text-danger fw-medium fs-6" >{errores.isbn}</p>}
      </div>

      {/* Campo categoria */}
      <div>
        <input className="form-control mb-3"
          type="text"
          name="categoria"
          value={libro.categoria}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            border: `1px solid ${errores.categoria ? 'red' : '#ccc'}`,
          }}
          placeholder="Ingrese la categoria del libro, Noveddades o Mas Vendidos"
        />
        {errores.categoria && <p className="text-center text-danger fw-medium fs-6">{errores.categoria}</p>}
      </div>

      {/* Campo Titulo */}
      <div>
        <input className="form-control mb-3"
          type="text"
          name="titulo"
          value={libro.titulo}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            border: `1px solid ${errores.titulo ? 'red' : '#ccc'}`,
          }}
          placeholder="Ingrese el titulo del libro (*)"
        />
        {errores.titulo && <p className="text-center text-danger fw-medium fs-6">{errores.titulo}</p>}
      </div>

      {/* Campo Autor */}
      <div>
        <input className="form-control mb-3"
          type="text"
          name="autor"
          value={libro.autor}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            border: `1px solid ${errores.autor ? 'red' : '#ccc'}`,
          }}
          placeholder="Ingrese el autor del libro (*)"
        />
        {errores.autor && <p className="text-center text-danger fw-medium fs-6">{errores.autor}</p>}
      </div>

      {/* Campo Editorial */}
      <div>
        <input className="form-control mb-3"
          type="text"
          name="editorial"
          value={libro.editorial}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            border: `1px solid ${errores.editorial ? 'red' : '#ccc'}`,
          }}
          placeholder="Ingrese el editorial del libro (*)"
        />
        {errores.editorial && <p className="text-center text-danger fw-medium fs-6">{errores.editorial}</p>}
      </div>

      {/* Campo Paginas */}
      <div>
        <input className="form-control mb-3"
          type="number"
          name="paginas"
          inputMode="numeric"
          value={libro.paginas}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            border: `1px solid ${errores.paginas ? 'red' : '#ccc'}`,
            }}
          placeholder="Ingrese la cantidad de paginas del libro (*)"
        />
        {errores.paginas && <p className="text-center text-danger fw-medium fs-6">{errores.paginas}</p>}
      </div>

      {/* Campo Sinopsis */}
      <div>
        <textarea className="form-control mb-1"
          name="sinopsis"
          value={libro.sinopsis}
          onChange={manejarCambio}
          rows="5"
          disabled={cargando}
          maxLength="400"
          placeholder="Ingrese una breve sinopsis, máximo 400 caracteres"
          style={{
            border: `1px solid ${errores.sinopsis ? 'red' : '#ccc'}`,
            resize: 'vertical'
          }}
        />
        {libro.sinopsis.length}/400 caracteres
        {errores.sinopsis && (
        <p className="text-center text-danger fw-medium fs-6">{errores.sinopsis}</p>
        )}
      </div>

      {/* Campo Precio */}
      <div>
        <input className="form-control mb-3"
          type="number"
          name="precio"
          value={libro.precio}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ingrese el precio del libro (*)"
          inputMode="decimal"
          style={{
            border: `1px solid ${errores.precio ? 'red' : '#ccc'}`,
          }}
        />
        {errores.precio && <p className="text-center text-danger fw-medium fs-6">{errores.precio}</p>}
      </div>

      {/* Campo Portada URL */}
      <div>
        <input className="form-control mb-3"
          type="text"
          name="portada"
          value={libro.portada}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ingrese URL de imagen portada"
        />
      </div>
      <p className="text-center text-secondary fw-medium fs-6">(*) Campos obligatorios</p>
      <div>
        <button className="btn btn-success center-block m-3 opacity-75"
          type="submit"
          disabled={cargando}
          style={{
            cursor: cargando ? 'not-allowed' : 'pointer'
          }}
        >
          {cargando
            ? (modo === "editar" ? 'Actualizando...' : 'Agregando...')
            : (modo === "editar" ? 'Confirmar Cambios' : 'Agregar Libro')
          }
        </button>
       
        {modo === "editar" && (
          <button className="btn btn-danger center-block m-3 opacity-75"
            type="button"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        )}
        <button className="btn btn-danger center-block m-3 opacity-75" type="button" onClick={() => navigate('/tablero')}>Volver a Administracion</button>
     
      </div>
     
     
    </form>
    </div>
  );
} export default FormularioLibros;
