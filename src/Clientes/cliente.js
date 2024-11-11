import React, { useEffect, useState } from 'react';
import '../App.css';
import Grafica from './grafica';  // Asegúrate de que el archivo Grafica.js esté correctamente importado

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [clientesPorGenero, setClientesPorGenero] = useState({ hombre: 0, mujer: 0, indefinido: 0 });

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await fetch('https://alex.starcode.com.mx/apiBD.php'); // Ajusta la URL de la API si es necesario
            const data = await response.json();
            setClientes(data);

            // Contamos los clientes por género
            const conteoGenero = data.reduce(
                (acc, cliente) => {
                    if (cliente.sexo === 'M') acc.hombre++;
                    if (cliente.sexo === 'F') acc.mujer++;
                    if (cliente.sexo === 'I') acc.indefinido++;
                    return acc;
                },
                { hombre: 0, mujer: 0, indefinido: 0 }
            );

            setClientesPorGenero(conteoGenero);
        };

        fetchClientes();

        // Actualizamos los datos cada 2 segundos
        const interval = setInterval(fetchClientes, 2000);

        return () => clearInterval(interval);
    }, []);

    // El total de clientes es simplemente el número de clientes en el array
    const totalClientes = clientes.length;

    return (
        <div className="clientes-container">
            <h1 className="titulo">Lista de Clientes</h1>
            <div className="clientes-grid">
                {clientes.map((cliente) => (
                    <div key={cliente.id} className="cliente-card">
                        <h2 className="cliente-id">ID: {cliente.id}</h2>
                        <div className="cliente-info">
                            <span className="label">Nombre:</span>
                            <span>{cliente.nombre}</span>
                        </div>
                        <div className="cliente-info">
                            <span className="label">Teléfono:</span>
                            <span>{cliente.telefono}</span>
                        </div>
                        <div className="cliente-info">
                            <span className="label">Sexo:</span>
                            <span>{cliente.sexo}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Agregar la gráfica de pastel debajo de la lista */}
            <Grafica clientesPorGenero={clientesPorGenero} />
        </div>
    );
};

export default ListaClientes;
