import React from 'react';
import './Butaca.css';

/**
 * Componente Butaca:
 * Representa un asiento individual en la sala.
 * 
 * Props:
 * - butaca: objeto con { id, fila, columna, disponible, precio }
 * - seleccionada: boolean (indica si el usuario hizo clic en esta butaca para reservarla)
 * - onSeleccionar: función callback cuando el usuario hace clic
 */
const Butaca = ({ butaca, seleccionada, onSeleccionar }) => {
    // Si disponible es false, la butaca ya está reservada/ocupada
    const estaDisponible = butaca.disponible;

    // Determinamos la clase CSS según el estado de la butaca
    let claseEstado = 'butaca-disponible';
    if (!estaDisponible) {
        claseEstado = 'butaca-ocupada';
    } else if (seleccionada) {
        claseEstado = 'butaca-seleccionada';
    }

    // Manejador del clic: solo permite seleccionar si está disponible
    const manejarClick = () => {
        if (estaDisponible && onSeleccionar) {
            onSeleccionar(butaca);
        }
    };

    return (
        <button
            type="button"
            className={`butaca-item ${claseEstado}`}
            onClick={manejarClick}
            disabled={!estaDisponible}
            title={
                !estaDisponible
                    ? `Butaca ${butaca.id} - Ocupada`
                    : `Butaca ${butaca.id} (Fila ${butaca.fila}, Col ${butaca.columna}) - $${butaca.precio}`
            }
        >
            <span className="butaca-id">B{butaca.id}</span>
            <span className="butaca-pos">F{butaca.fila}-C{butaca.columna}</span>
            <span className="butaca-precio">${butaca.precio}</span>
        </button>
    );
};

export default Butaca;
