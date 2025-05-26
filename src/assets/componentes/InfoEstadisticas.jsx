function InfoEstadisticas(props){
    return(<div className="p-5">
            <h2 className="text-xl font-semibold mb-2">Estadísticas de productos</h2>
            <p>Productos Totales: {props.total}</p>
            <p>Producto de mayor precio: $ {props.max}</p>
            <p>Producto de menor precio: $ {props.min}</p>
            <p>Promedio de precio: $ {props.prom} </p>
            <p>Suma total de precios:${props.suma}</p>
           
          </div>);

}
export default InfoEstadisticas;