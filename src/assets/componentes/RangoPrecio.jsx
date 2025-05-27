function Rangoprecio(props){
    return(
    <div className="p-5">
       <h3 className="text-xl font-semibold mb-2">Productos segun rango de precio</h3>
        <p>Productos hasta $5000: {props.baja} productos.</p>
            <p>Productos hasta $15000: {props.media} productos.</p>
            <p>Productos desde $15000: {props.alta} productos.</p>
            
    </div>);

}
export default Rangoprecio;           