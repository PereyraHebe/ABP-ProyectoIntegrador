import TarjetaProducto from "./TarjetaProducto";

function ListaProductos({productos}){
    return (
        <div id="productos" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
        ))}
        </div>
    );
}

export default ListaProductos;