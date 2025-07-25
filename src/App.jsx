import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./App.css";
//impotación de componentes
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
  const [pagina, setPagina] = useState(1); 
  const [formato, setFormato] = useState ("");

  //Referencias
  const containerRef = useRef(null);

  const limite= 20;

// agregar paginacion  * agregregue categoria y variable para categoria selecionada
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/?limit=${limite}&skip=${(pagina-1)*limite}`).then((res) => {
      setProductos(res.data.products);
    });
  }, [pagina]);

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
 // Función para exportar productos filtrados
 const handleExport = () => {
    let contenido;
    let nombreArchivo;

    if (formato === "json") {
        contenido = JSON.stringify(productosFiltrados, null, 2);
        nombreArchivo = "productos.json";
    } else if (formato === "csv") {
        contenido = productosFiltrados.map(p => Object.values(p).join(",")).join("\n");
        nombreArchivo = "productos.csv";
    } else if (formato === "excel") {
        contenido = productosFiltrados.map(p => Object.values(p).join("\t")).join("\n");
        nombreArchivo = "productos.xls"; 
    }

    const blob = new Blob([contenido], { type: "application/octet-stream" }); // Tipo genérico
    const url = URL.createObjectURL(blob);
    triggerDownload(url, nombreArchivo);
};

const triggerDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


  return (

    <div ref={containerRef}>

      <div className="p-10"> 
        {/*Componente para encabezado */}
      
        <Encabezado onClick={toggleModoOscuro} textoBoton={modoOscuro ? "Modo Claro" : "Modo Oscuro"} />
  
      
        <b></b> 
            
        {/*Componente para barra de busqueda */}
        <BarraDeBusqueda value={buscador} onChange={(e) => setBuscador(e.target.value)}
        />
      
        
      {/*Se muestran rango de productos segun precio y se agrega filtrado por categoria */}
      <div className = "top-10 mb-4 h-auto bg-gray-500 p-6 shadow-lg rounded-lg" >
        <h2 className="text-2xl font-bold mb-4">Filtrar productos</h2>
         <div id="categorias" className="flex justify-center items-center">
          <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4">
             <option value="">Todas las categorías</option>
              
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
              <option value="furniture">Furniture</option>
              <option value="tops">Tops</option>
              <option value="women's-dresses">Women's Dresses</option>
              <option value="women's-shoes">Women's Shoes</option>
              <option value="men's-shirts">Men's Shirts</option>
      
  
          </select>
        </div>
           <RangoPrecio baja= {rango_precio.bajo.length} media={rango_precio.medio.length} alta={rango_precio.alto.length}/>
      </div>
      {/* boton para paginación antes de productos*/}
      <div className="mb-4">
        <button  className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}> Anterior </button>
        <p className="inline-block mx-2">Página {pagina}</p>      
        <button className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300" disabled={ productos < {limite}}  onClick={() => setPagina(pagina + 1)}> Siguiente </button>
      </div>
      
      {/*Se muestran productos con componente ListaProductos*/}
      
      <ListaProductos  productos={productosFiltrados} />
      
      {/* Renderizacion condicional, búsqueda sin éxito*/}
      {productosFiltrados.length === 0 && <div className="p-4"> No se encontraron productos</div>}

               
      {/*Se muestran estadisticas */}
      <div id="estadisticas" className="top-20 h-auto bg-gray-300 p-6 shadow-lg rounded-lg">

        {/*Boton para mostrar Estadisticas */}

        <button  onClick={()=>setMostrar(!mostrar)}>{mostrar ? 'Ocultar info':'Mostrar info'}</button>

        {mostrar && (
        <InfoEstadisticas total={totalProductos} title={productoMasCaro} max={precioMasAlto} title_bis={productoMasBarato} min={precioMasBajo}
        prom={precioPromedio} suma={sumaPrecios}/>
               
      )}
      </div>


       <div id="descargas"  className="top-20 h-auto bg-gray-500 p-6 shadow-lg rounded-lg">
        <h5>Descargas- </h5>
        <select onChange={(e) => setFormato(e.target.value)} value={formato}>
        
          <option value="">Seleccione un formato</option>
          <option value="json">JSON</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
        <button onClick={handleExport} className="px-4 py-2 bg-gray-500 text-black rounded disabled:bg-gray-300" disabled={!formato}>Exportar</button>
        </div> 
       

      </div>
    </div>
  
    
  );
}

export default App;