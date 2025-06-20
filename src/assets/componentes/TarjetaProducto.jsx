function TarjetaProducto({ producto }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {producto.images && producto.images[0] && (
        <img
          className="w-full h-48 object-cover"src={producto.images[0]}alt={producto.title}
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{producto.title}</h3>
        <p className="text-gray-700 text-base">{producto.description}</p>
        <div className="flex justify-between items-center mt-4">
          
          <span className="text-lg font-bold">${producto.price}</span>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;