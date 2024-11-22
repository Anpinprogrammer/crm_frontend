const Alerta = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'from-red-600 to-red-700' : 'from-teal-400 to-teal-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
          {alerta.msg}
      </div>
    )
  }
  
  export default Alerta