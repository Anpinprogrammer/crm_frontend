import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "./Alerta";
import useClientes from "../hooks/useClientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [id, setId] = useState(null);
    const [alerta, setAlerta] = useState({});

    const { guardarCliente, setCliente, cliente } = useClientes();

    const navigate = useNavigate();

    useEffect(() => {
        if(cliente?.nombre) {
            setNombre(cliente.nombre)
            setEmail(cliente.email)
            setTelefono(cliente.telefono)
            setEmpresa(cliente.empresa)
            setId(cliente._id)
        }
    }, [cliente])

    const handleSubmit = async e => {
        e.preventDefault();
        if([nombre, email, telefono, empresa].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            setTimeout(() => {
                setAlerta({})
            }, 3000)
            return;
        }

        guardarCliente({nombre, email, telefono, empresa, id})
        setAlerta({
            msg: 'Cliente Guardado Correctamente'
        })
        setTimeout(() => {
            setNombre('')
            setEmail('')
            setTelefono('')
            setEmpresa('')
            setCliente({})
            navigate('/admin/clientes')
        }, 3000)
        
      
    }

    const { msg } = alerta;
  return (
   <>
    <form 
        id="formulario"
        className="bg-white p-3"
        onSubmit={handleSubmit}
    >
        <div className="mb-4">
            <label 
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
            >Nombre</label>
            <input 
                type="text" 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                placeholder="Nombre del Cliente"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-4">
            <label 
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
            >Correo</label>
            <input 
                type="email" 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="Email del Cliente"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>

        <div className="mb-4">
            <label 
                htmlFor="telefono"
                className="block text-gray-700 text-sm font-bold mb-2"
            >Telefono</label>
            <input 
                type="tel" 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                placeholder="Telefono del Cliente"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
            />
        </div>

        <div className="mb-4">
            <label 
                htmlFor="empresa"
                className="block text-gray-700 text-sm font-bold mb-2"
            >Empresa</label>
            <input 
                type="text" 
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="empresa"
                placeholder="Empresa del Cliente"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            className="bg-teal-600 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-teal-900" 
            value={id ? 'Guardar Cambios' : 'Agregar Cliente'}
        />
        <div className="mt-4 mb-0">
            {msg && <Alerta
            alerta={alerta} />    
            }
        </div>
    </form>
    
   </>
    
  )
}

export default Formulario