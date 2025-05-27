import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
//impotacion de componentes
import TarjetaProducto from "./assets/componentes/TarjetaProducto";
import InfoEstadisticas from "./assets/componentes/InfoEstadisticas";
import RangoPrecio from "./assets/componentes/RangoPrecio";
import Encabezado from "./assets/componentes/Encabezado";
import BarraDeBusqueda from "./assets/componentes/BarraDeBusqueda";

function App() {
  const [productos, setProductos] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=180").then((res) => {
      setProductos(res.data.products);
    });
  }, []);

  //filtracion de productos 
  const productosFiltrados= productos.filter((p)=>p.title.toLowerCase().includes(buscador.toLowerCase()))
  
  // calcular total de productos, precio mas alto, precio mas bajo, precio promedio
  const totalProductos = productosFiltrados.length;
  const precioMasAlto = Math.max(...productosFiltrados.map((p)=>p.price));
  const precioMasBajo = Math.min(...productosFiltrados.map((p)=>p.price));
  const sumaPrecios = productosFiltrados.reduce((total, p) => total + p.price, 0);
  const precioPromedio = totalProductos > 0 ? sumaPrecios / totalProductos : 0;
  

  // Categorizar productos segun precio 
  const rango_precio = {
    bajo: [],
    medio: [],
    alto: []
};
// el forEach recorre la lista de productos y los clasifica seun categorias designadas anteriormente. El push agrega el producto a la categoria.
productosFiltrados.forEach(p => {
    if (p.price < 5000) {
        rango_precio.bajo.push(p);
    } else if (p.price >= 5000 && p.price < 15000) {
        rango_precio.medio.push(p);
    } else {
        rango_precio.alto.push(p);
    }
});



  return (
    
    < div className="p-10">

      {/*Componente para encabezado */}
      
       <Encabezado/>    
            
    {/*Componente para barra de busqueda */}
         <BarraDeBusqueda
        value={buscador}
        onChange={(e) => setBuscador(e.target.value)}
        
      />
        
      <div className = "top-20 h-65 bg-green-100 p-6 shadow-lg rounded-lg" >
        
            {/*Se muestran categorias de productos */}
            <RangoPrecio baja= {rango_precio.bajo.length} media={rango_precio.medio.length} alta={rango_precio.alto.length}/>
          
          </div>
      
      <div className="fixed right-20 top-86 w-[400px] h-auto bg-green-200 p-6 shadow-lg rounded-lg">
        {/*Boton para mostrar Estadisticas */}

        <button  onClick={()=>setMostrar(!mostrar)}>{mostrar ? 'Ocultar info':'Mostrar info'}</button>

        {mostrar && (
        <InfoEstadisticas total={totalProductos} max={precioMasAlto} min={precioMasBajo}
        prom={precioPromedio} suma={sumaPrecios}/>
               
      )}
      </div>

      {/*Se muestran productos con componente TarjetasProductos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-10"> {productosFiltrados.map((p) => ( <TarjetaProducto key={p.id} producto={p} /> ))}
      </div>
   
      {/* Renderizacion condicional, búsqueda sin éxito*/}
      {productosFiltrados.length === 0 && <div className="p-4"> No se encontraron productos</div>}
         
    </div>
    
  );
}

export default App;