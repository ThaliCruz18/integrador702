import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Grafica({ clientesPorGenero }) {
    // Asegurarse de que los valores de los géneros estén definidos
    const conteoGenero = clientesPorGenero || { hombre: 0, mujer: 0, indefinido: 0 };

    // Datos para la gráfica de pastel
    const chartData = {
        labels: ['Hombre', 'Mujer', 'Indefinido'], // Etiquetas de los géneros
        datasets: [
            {
                label: 'Número de Clientes',
                data: [conteoGenero.hombre, conteoGenero.mujer, conteoGenero.indefinido],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56'], // Colores para cada género
                borderColor: ['#36A2EB', '#FF6384', '#FFCD56'],
                borderWidth: 1,
            },
        ],
    };

    // Opciones para la gráfica
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.raw + ' clientes';
                    },
                },
            },
        },
    };

    return (
        <div>
            <h2>Distribución de Clientes por Género</h2>
            <Pie data={chartData} options={options} />  {/* Renderizamos la gráfica */}
        </div>
    );
}

export default Grafica;
