function BarraDeBusqueda({ value, onChange }) {
  return (
    <div className="text-center mb-4 p-10 mt-20 ">
      <input
        type="text"
        className="w-full md:w-96 ml-2 p-2 border rounded"
        placeholder="Busca tu producto aquí"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


export default BarraDeBusqueda;