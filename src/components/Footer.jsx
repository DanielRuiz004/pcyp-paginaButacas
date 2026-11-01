import React from 'react';

/**
 * Componente Footer: Pie de página básico de la demostración.
 */
const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.texto}>
                Trabajo Final: Programación Concurrente y Paralela — Grupo 06
            </p>
            <p style={styles.subtexto}>
                Facultad de Ingeniería - UNJu | Exclusión Mutua con Semáforos en Spring Boot
            </p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#f1f1f1',
        borderTop: '1px solid #ddd',
        marginTop: '30px',
        color: '#666',
        fontSize: '12px',
    },
    texto: {
        margin: '0 0 4px 0',
        fontWeight: 'bold',
    },
    subtexto: {
        margin: 0,
    },
};

export default Footer;
