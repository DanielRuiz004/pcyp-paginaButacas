import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sala from './components/Sala';
import Footer from './components/Footer';
import './App.css';


function App() {
    //url base de la api rest
    const API_URL = 'https://pcyp-trabajofinal-semaforos-1.onrender.com/api/butacas';

    const [butacas, setButacas] = useState([]);
    const [butacaSeleccionada, setButacaSeleccionada] = useState(null);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    const [cargando, setCargando] = useState(false);


    //obtener todas las butacas desde el Backend
    const cargarButacas = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) {
                throw new Error('Error al consultar butacas.');
            }
            const datos = await respuesta.json();
            setButacas(datos);
            //setMensaje({ texto: 'Sala actualizada correctamente.', tipo: 'info' });
        } catch (error) {
            console.error(error);
            setMensaje({
                texto: 'No se pudo conectar con el backend',
                tipo: 'error',
            });
        } finally {
            setCargando(false);
        }
    };

    // al montar el componente cargamos las butacas iniciales
    useEffect(() => {
        cargarButacas();
    }, []);

    const manejarSeleccionarButaca = (butaca) => {
        // si hace clic en la misma que ya tenia seleccionada la deselecciona
        if (butacaSeleccionada && butacaSeleccionada.id === butaca.id) {
            setButacaSeleccionada(null);
        } else {
            setButacaSeleccionada(butaca);
            setMensaje({ texto: `Seleccionaste la Butaca ${butaca.id}.`, tipo: 'info' });
        }
    };

    /**
     * confirmar reserva de la butaca (POST /api/butacas/{id}/reservar)
     * ejecuta la exclusión mutua.
     */
    const reservarButaca = async () => {
        if (!butacaSeleccionada) return;

        setCargando(true);
        const id = butacaSeleccionada.id;

        try {
            const respuesta = await fetch(`${API_URL}/${id}/reservar`, {
                method: 'POST',
            });

            const textoRespuesta = await respuesta.text();

            if (respuesta.ok) {
                setMensaje({
                    texto: `${textoRespuesta}`,
                    tipo: 'exito',
                });
                setButacaSeleccionada(null); //
                await cargarButacas(); // refrescamos el estado de la sala
            } else {
                setMensaje({
                    texto: `RECHAZADO: ${textoRespuesta}`,
                    tipo: 'error',
                });
                await cargarButacas(); // Si fallo porque otro la reserv refrescamos para mostrarla en rojo
            }
        } catch (error) {
            console.error(error);
            setMensaje({
                texto: 'Error al intentar reservar la butaca',
                tipo: 'error',
            });
        } finally {
            setCargando(false);
        }
    };

    const generarButacasPrueba = async () => {
        setCargando(true);
        try {
            for (let i = 1; i <= 20; i++) {
                const fila = Math.ceil(i / 5);
                const columna = ((i - 1) % 5) + 1;

                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fila: fila,
                        columna: columna,
                        disponible: true,
                        precio: 500.0,
                    }),
                });
            }
            setMensaje({ texto: 'Se crearon 20 butacas de prueba', tipo: 'exito' });
            await cargarButacas();
        } catch (error) {
            console.error(error);
            setMensaje({ texto: 'No se pudieron crear las butacas de prueba.', tipo: 'error' });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="contenedor">
            <Navbar />

            <main className="cuerpo">
                <section className="prueba">
                    <button className="boton boton-secundario" onClick={cargarButacas} disabled={cargando} >
                        {cargando ? 'Cargando...' : 'Actualizar Estado de la Sala'}
                    </button>

                    {butacas.length === 0 && (
                        <button className="boton boton-auxiliar" onClick={generarButacasPrueba} disabled={cargando}>
                            Crear 20 Butacas de prueba
                        </button>
                    )}
                </section>

                {/*mensaje de alertadel backend */}
                {mensaje.texto && (
                    <div className={`alerta alerta-${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}

                <Sala
                    butacas={butacas}
                    butacaSeleccionada={butacaSeleccionada}
                    onSeleccionarButaca={manejarSeleccionarButaca}
                />

                <section className="panel-reserva">
                    <h3 className="subtitulo-reserva">Detalle de Seleccion</h3>
                    {butacaSeleccionada ? (
                        <div className="info-seleccion">
                            <p><strong>Butaca seleccionada:</strong> Numero {butacaSeleccionada.id}</p>
                            <p><strong>Ubicación:</strong> Fila {butacaSeleccionada.fila}, Columna {butacaSeleccionada.columna}</p>
                            <p><strong>Precio:</strong> ${butacaSeleccionada.precio}</p>
                            <button
                                className="boton boton-primario"
                                onClick={reservarButaca}
                                disabled={cargando}
                            >
                                {cargando ? 'Procesando...' : 'Confirmar Reserva (Prueba de Semaforo)'}
                            </button>
                        </div>
                    ) : (
                        <p className="texto-ayuda">
                            Haga clic sobre una butaca para seleccionarla.
                        </p>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;
