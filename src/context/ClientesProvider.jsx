import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ClientesContext = createContext()

export const ClientesProvider = ({children}) => {

    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState({})
    const { auth } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/clientes', config)

                setClientes(data)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerClientes()
    }, [auth])

    const guardarCliente = async (cliente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(cliente.id) {
            try {
                const { data } = await clienteAxios.put(`/clientes/${cliente.id}`, cliente, config)

                const clientesActualizados = clientes.map( clienteState => clienteState._id === data._id ? data : clienteState)
                setClientes(clientesActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
        
            try {
                const { data } = await clienteAxios.post('/clientes', cliente, config)
    
                //Mostrar solo informacion necesaria
                const { createdAt, updatedAt, __v, ...clienteAlmacenado } = data

                setClientes([clienteAlmacenado, ...clientes])
            } catch (error) {
                console.log(error.response.data.msg) 
            }
        }
    }

    const setEdicion = (cliente) => {
        console.log('Desde setEdicion')
        navigate('/admin')
        setCliente(cliente)
        console.log(cliente)
    }

    const eliminarCliente = async (id) => {

        const confirmar = confirm('¿Deseas eliminar el cliente?')
        if(confirmar) {
    
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/clientes/${id}`, config)
                
                const clientesActualizado = clientes.filter( clientesState => clientesState._id !== id)
                setClientes(clientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
        
        
    }

    return (
        <ClientesContext.Provider
            value={{
                clientes,
                guardarCliente,
                cliente,
                setCliente,
                eliminarCliente,
                setEdicion
            }}
        >
            {children}
        </ClientesContext.Provider>    
    )
}

export default ClientesContext