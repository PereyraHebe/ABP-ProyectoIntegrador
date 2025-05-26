function Categorías(props){
    return(
    <div className="p-5">
       <h3 className="text-xl font-semibold mb-2">Categorias de Productos </h3>
        <p>Productos de precio bajo: {props.baja} productos.</p>
            <p>Productos de precio medio: {props.media} productos.</p>
            <p>Productos de precio alto: {props.alta} productos.</p>
            
    </div>);

}
export default Categorías;           