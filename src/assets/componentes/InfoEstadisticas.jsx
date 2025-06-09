import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function InfoEstadisticas(props) {
  const data = {
    labels: ["Producto más caro", "Producto más barato", "Precio promedio", "Suma total"],
    datasets: [
      {
        label: "Precios en USD",
        data: [props.max, props.min, props.prom, props.suma],
        backgroundColor: ["#FFD700", "#FFA500", "#FF4500", "#F0E68C"],
        borderColor: ["#FFC107", "#FF8C00", "#FF6347", "#DAA520"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Estadísticas de Productos" },
    },
    scales: {
      x: {
        grid: { color: "#555555" },
        ticks: { color: "#444444" },
      },
      y: {
        grid: { color: "#555555" },
        ticks: {
          color: "#444444",
          stepSize: 30,
          min: 0,
          max: 300,
        },
      },
    },
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">Estadísticas de productos</h2>
      <p>Productos Totales: {props.total}</p>
      <p>Producto de mayor precio: {props.title} $ {props.max}</p>
      <p>Producto de menor precio: {props.title_bis} $ {props.min}</p>
      <p>Promedio de precio: $ {props.prom}</p>
      <p>Suma total de precios: $ {props.suma}</p>

      {/* Gráfico de barras */}
      <div className="mt-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default InfoEstadisticas;
