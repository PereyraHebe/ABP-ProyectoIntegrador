import React from "react";

const TarjetaProducto = ({ producto, categoria }) => {
  return (
    <div className="border p-4 m-2 rounded-lg shadow-md bg-green-100">
      <h2 className="text-lg font-bold">{producto.title} </h2>
      <p className="text-gray-600">{producto.description}</p>
      <p className="text-green-600 font-semibold"> ${producto.price}</p>
      <p className="text-sm font-bold">Categoría: {categoria}</p>
    </div>
  );
};

export default TarjetaProducto;