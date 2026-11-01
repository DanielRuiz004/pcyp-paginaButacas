import React from 'react';
import Butaca from './Butaca';
import './Sala.css';

/**
 * Props:
 * - butacas: array con la lista de butacas recibidas del backend
 * - butacaSeleccionada: butaca actualmente seleccionada por el usuario (o null)
 * - onSeleccionarButaca: callback para actualizar la selección
 */
const Sala = ({ butacas, butacaSeleccionada, onSeleccionarButaca }) => {
    return (
        <div className="sala-contenedor">
            <div className="pantalla-cine">
                <span> PANTALLA / ESCENARIO </span>
            </div>

            <div className="grilla-butacas">
                {butacas && butacas.length > 0 ? (
                    butacas.map((b) => (
                        <Butaca
                            key={b.id}
                            butaca={b}
                            seleccionada={butacaSeleccionada && butacaSeleccionada.id === b.id}
                            onSeleccionar={onSeleccionarButaca}
                        />
                    ))
                ) : (
                    <p className="mensaje-vacio">No hay butacas cargadas</p>
                )}
            </div>

            <div className="info-sala">
                <div className="disponible">
                    <span className="muestraDispo ico"></span>
                    <span>Disponible</span>
                </div>
                <div className="seleccionada">
                    <span className="muestraSel ico"></span>
                    <span>Seleccionada</span>
                </div>
                <div className="ocupada">
                    <span className="muestraOcup ico"></span>
                    <span>Ocupada</span>
                </div>
            </div>
        </div>
    );
};

export default Sala;
