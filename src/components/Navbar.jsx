import React from 'react';

/**
 * Componente Navbar: Barra superior sencilla de navegación y título.
 * Estilo clásico con fondo sólido y texto claro.
 */
const Navbar = () => {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <h1 style={styles.title}>Sistema de Reserva de Butacas</h1>
                <span style={styles.badge}>Demo PCyP - Semáforos</span>
            </div>
        </header>
    );
};

// Estilos básicos en línea para no depender de frameworks pesados
const styles = {
    header: {
        backgroundColor: '#2c3e50',
        color: '#ffffff',
        padding: '12px 20px',
        borderBottom: '3px solid #1a252f',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: '#34495e',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '13px',
        border: '1px solid #4a627a',
    },
};

export default Navbar;
