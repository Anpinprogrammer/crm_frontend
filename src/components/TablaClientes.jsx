import useClientes from "../hooks/useClientes"
import Cliente from "./Cliente"

const TablaClientes = () => {
  const { clientes } = useClientes()
  
  return (
    <>
        {clientes.length ? 
          (
            <>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Nombre Cliente</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Telefono</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Empresa</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white" id="listado-clientes">
                  {clientes.map( cliente => (
                      <Cliente
                        key={cliente._id}
                        cliente={cliente}
                      />
                  ))} 
                </tbody>
              </table>
            </>
            
          ) :
          (
            <>
              <h1>No tienes ningun cliente aun, agregalos desde <span>Aqui</span></h1>
            </>
          )}
          
    </>     
    
  )
}

export default TablaClientes