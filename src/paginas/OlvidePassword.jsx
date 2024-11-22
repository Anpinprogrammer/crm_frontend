import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from '../components/Alerta';

const OlvidePassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '') {
            setAlerta({
                msg: 'Debe ingresar un correo electronico',
                error: true
            })
            return;
        } 

        setAlerta({});

        try {
            const url = '/admin/olvide-password';
            const { data } = await clienteAxios.post(url, { email });

            setAlerta({
                msg: data.msg
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-teal-600 font-black text-6xl">Recupera tu Acceso y no Pierdas <span className="text-black">tus Clientes</span></h1>
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

                <input 
                    type="submit"
                    value="Recuperar Cuenta"
                    className="bg-teal-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-800 md:w-auto "
                />
            </form> 

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/">¿Ya tienes una cuenta? Iniciar Sesion</Link>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/registrar">¿No tienes una cuenta? Registrate</Link>
            </nav>
        </div>      
    </>
  )
}

export default OlvidePassword