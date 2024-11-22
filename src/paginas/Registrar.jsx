import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [registrado, setRegistrado] = useState(false);

    useEffect(() => {
        setNombre('');
        setEmail('');
        setPassword('');
        setRepPassword('');
    }, [registrado]);

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repPassword].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        if(password !== repPassword) {
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error: true
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post('admin', {nombre, email, password});
            setRegistrado(true);
            setAlerta({
                msg: data.msg
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;
  return (
    <>
        <div>
            <h1 className="text-teal-600 font-black text-6xl">Crea tu Cuenta y Administra<span className="text-black">tus Clientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alerta
                alerta={alerta} />    
            }
                
            <form 
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label 
                        htmlFor=""
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        placeholder="Tu Nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label 
                        htmlFor=""
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label 
                        htmlFor=""
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label 
                        htmlFor=""
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Confirmar Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Repite Tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repPassword}
                        onChange={e => setRepPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-teal-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-800 md:w-auto " 
                />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/">¿Ya tienes una cuenta? Iniciar Sesion</Link>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar