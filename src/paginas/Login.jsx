import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

import useAuth from "../hooks/useAuth";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true);

    const { setAuth } = useAuth();

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [cargando])

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({ 
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        try {
            const { data } = await clienteAxios.post('/admin/login', { email, password });
            
            //Guarda el token en el LS
            localStorage.setItem('token', data.token);

            setAuth(data);
            navigate('/admin');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            console.log(error);
        }

        setCargando(false);
    }

    const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-teal-600 font-black text-6xl">Inicia Sesion y Administra <span className="text-black">tus Recolecciones</span></h1>
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

                <input 
                    type="submit"
                    value="Iniciar Sesion"
                    className="bg-teal-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-800 md:w-auto " 
                    />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/registrar">¿No tienes una cuenta? Registrate</Link>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
        
    </>
  )
}

export default Login
