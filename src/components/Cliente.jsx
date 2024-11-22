import { Link } from "react-router-dom"
import useClientes from "../hooks/useClientes"

const Cliente = ({cliente}) => {

    const { setEdicion, eliminarCliente } = useClientes()

    const { nombre, email, telefono, empresa, _id } = cliente


  return (
    <>
        <tr>
            <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
            <p className="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold">{nombre}</p>
            <p className="text-sm leading-10 text-gray-700">{email}</p>
            </td>
            <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p className="text-gray-700">{telefono}</p>
            </td>
            <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p className="text-gray-600">{empresa}</p>
            </td>
            <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <button 
                    type="button" 
                    className="text-teal-600 hover:text-teal-900 mr-5"
                    onClick={() => setEdicion(cliente)}
                >Editar</button>
                <button 
                    type="button"
                    className="text-red-600 hover:text-red-900 eliminar"
                    onClick={() => eliminarCliente(_id)} 
                >Eliminar</button>
            </td>
        </tr>
    </>
  )
}

export default Cliente