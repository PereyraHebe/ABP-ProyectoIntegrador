function Encabezado({onClick, textoBoton}){
   
  return (
    <header className="text-gray-600 body-font relative top-0  w-full bg-gray-300 shadow-md z-50" >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
            aria-label="Logo Tienda Nube"
        >
           {/* Forma de nube */}
           <path d="M5 16a4 4 0 0 1 0-8 5 5 0 0 1 9.9-1A4 4 0 1 1 17 16H5z" />
           {/* Contorno de la bolsa */}
           <rect x="8" y="12" width="8" height="6" rx="1" ry="1" />
           {/* Asa de la bolsa */}
           <path d="M10 12V10a2 2 0 0 1 4 0v2" />
          </svg>

          <span className="ml-3 text-xl">Productos de Dummyjson.com</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900" href="#productos">Todos los productos</a>
          <a className="mr-5 hover:text-gray-900" href="#categorias">Productos por categoría</a>
          <a className="mr-5 hover:text-gray-900" href="#estadisticas">Panel de estadísticas</a>
          <a className="mr-5 hover:text-gray-900" href="#opiniones">Opiniones </a>
          <a className="mr-5 hover:text-gray-900" href="#contacto">Contactanos</a>
        </nav>
        <button onClick={onClick} className="px-4 py-2 rounded-md bg-indigo-500 text-white">
          {textoBoton}
        </button>
        
      </div>
    </header>
  );

}

export default Encabezado;