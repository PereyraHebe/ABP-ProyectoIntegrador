import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./App.css";
//impotacion de componentes
import ListaProductos from "./assets/componentes/ListaProductos";
import InfoEstadisticas from "./assets/componentes/InfoEstadisticas";
import RangoPrecio from "./assets/componentes/RangoPrecio";
import Encabezado from "./assets/componentes/Encabezado";
import BarraDeBusqueda from "./assets/componentes/BarraDeBusqueda";

function App() {
  //Estados
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [buscador, setBuscador] = useState("");
  const [mostrar, setMostrar] = useState(false)
  const [modoOscuro, setModoOscuro] = useState(false);

  //Referencias
  const containerRef = useRef(null);

// agregar paginacion  * agregregue categoria y variable para categoria selecionada
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setProductos(res.data.products);
    });
  }, []);

  //filtracion de productos * agregue filtrado por categoria seleccionada
  const productosFiltrados= productos
    .filter((p) => categoriaSeleccionada ? p.category === categoriaSeleccionada : true)
    .filter((p)=>p.title.toLowerCase().includes(buscador.toLowerCase()))
    .sort((a, b) => a.price - b.price); // agregue sort para ordenar los productos de mas barato a mas caro;
  
  // calcular total de productos, precio mas alto, precio mas bajo (con nombre y precio), summar todos los precios y asi calcular precio promedio
  const totalProductos = productosFiltrados.length;
  const precioMasAlto = Math.max(...productosFiltrados.map((p)=>p.price));
  const precioMasBajo = Math.min(...productosFiltrados.map((p)=>p.price));
  const productoMasCaro = productosFiltrados.find((p) => p.price === precioMasAlto)?.title;
  const productoMasBarato = productosFiltrados.find((p) => p.price === precioMasBajo)?.title;
  const sumaPrecios = productosFiltrados.reduce((total, p) => total + p.price, 0);
  const precioPromedio = totalProductos > 0 ? sumaPrecios / totalProductos : 0;

  // Rango de productos segun precio 
  const rango_precio = {
    bajo: [],
    medio: [],
    alto: []
};
// el forEach recorre la lista de productos y los clasifica segun rango designadas anteriormente. El push agrega el producto a la categoria.
productosFiltrados.forEach(p => {
    if (p.price < 5000) {
        rango_precio.bajo.push(p);
    } else if (p.price >= 5000 && p.price < 15000) {
        rango_precio.medio.push(p);
    } else {
        rango_precio.alto.push(p);
    }
});
  {/*Modo oscuro */}
   const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    containerRef.current.classList.toggle("modo-oscuro");
   };

  return (

    <div ref={containerRef}>

      <div className="p-10"> 
        {/*Componente para encabezado */}
      
        <Encabezado onClick={toggleModoOscuro} textoBoton={modoOscuro ? "Mostrar Modo Claro" : "Mostrar Modo Oscuro"} />
  
      
        <b></b> 
            
        {/*Componente para barra de busqueda */}
        <BarraDeBusqueda value={buscador} onChange={(e) => setBuscador(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <select
  value={categoriaSeleccionada}
  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
  className="p-2 border border-gray-300 rounded"
>
  <option value="">Todas las categorías</option>
  <option value="fragrances">Fragrances</option>
  <option value="groceries">Groceries</option>
  <option value="furniture">Furniture</option>
</select>

        </div>
        
      {/*Se muestran rango de productos segun precio */}
      <div className = "top-10 mb-4 h-auto bg-gray-500 p-6 shadow-lg rounded-lg" >
        <RangoPrecio baja= {rango_precio.bajo.length} media={rango_precio.medio.length} alta={rango_precio.alto.length}/>
      </div>
      
      {/*Se muestran productos con componente ListaProductos*/}
      
      <ListaProductos  productos={productosFiltrados} />
   
      {/* Renderizacion condicional, búsqueda sin éxito*/}
      {productosFiltrados.length === 0 && <div className="p-4"> No se encontraron productos</div>}

      {/*Se muestran estadisticas */}
      <div id="estadisticas" className="top-20 h-auto bg-gray-500 p-6 shadow-lg rounded-lg">

        {/*Boton para mostrar Estadisticas */}

        <button  onClick={()=>setMostrar(!mostrar)}>{mostrar ? 'Ocultar info':'Mostrar info'}</button>

        {mostrar && (
        <InfoEstadisticas total={totalProductos} title={productoMasCaro} max={precioMasAlto} title_bis={productoMasBarato} min={precioMasBajo}
        prom={precioPromedio} suma={sumaPrecios}/>
               
      )}
      </div>


       <div id="opiniones"> <h5>Opiniones</h5></div> 
       <div id="contacto"> <h5>contacto</h5></div>   

      </div>
    </div>
  
    
  );
}

export default App;