import React from 'react';
import './Butaca.css';
import butacaDisp from "../assets/butacaDisponible.png"
import butacaOcup from "../assets/butacaOcupada.png"

/**
 *butaca: objeto con { id, fila, columna, disponible, precio }
 */
const Butaca = ({ butaca, seleccionada, onSeleccionar }) => {
    // si disponible es false la butaca ya esta reservada/ocupada
    const estaDisponible = butaca.disponible;

    //CSS segun el estado de la butaca
    let claseEstado = 'butaca-disponible';
    if (!estaDisponible) {
        claseEstado = 'butaca-ocupada';
    } else if (seleccionada) {
        claseEstado = 'butaca-seleccionada';
    }

    //  solo permite seleccionar si está disponible
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
            <img className="img-butaca" src={estaDisponible ? butacaDisp : butacaOcup} />
            <span className="butaca-id">B{butaca.id}</span>
            <span className="butaca-pos">F{butaca.fila}-C{butaca.columna}</span>
        </button>
    );
};

export default Butaca;
