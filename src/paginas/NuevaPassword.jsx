import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
 
const NuevaPassword = () => {

  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [passwordCambiado, setPasswordCambiado] = useState(false);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmarToken = async () => {
      try {
          const url = `/admin/olvide-password/${token}`
          const { data } = await clienteAxios(url)
          setAlerta({
              msg: 'Actualiza tu contraseña'
          });
          setTokenValido(true)
      } catch (error) {
          setAlerta({
              msg: 'Hubo un error con el enlace',
              error: true
          })
      }
   }

   confirmarToken()
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if([password, repPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    if(password !== repPassword) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return;
    }

    try {
      const url = `/admin/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg
      })
      setPasswordCambiado(true);
    } catch (error) {
      console.log(error);
    }
  }

  const { msg } = alerta;

  return (
    <>
       <div>
            <h1 className="text-teal-600 font-black text-6xl">Cambia tu Contraseña y Administra <span className="text-black">tus Clientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alerta 
                alerta={alerta} />
            }

            {tokenValido && (
              <>
                <form 
                  onSubmit={handleSubmit} 
                >
                  <div className="my-5">
                    <label 
                        htmlFor=""
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                      Contraseña Nueva
                    </label>
                    <input 
                        type="password" 
                        placeholder="Ingresa tu contraseña nueva"
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
                        Repite Contraseña Nueva
                    </label>
                    <input 
                        type="password" 
                        placeholder="Repite tu contraseña nueva"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repPassword}
                        onChange={e => setRepPassword(e.target.value)}
                    />
                  </div>

                  <input 
                    type="submit"
                    value="Actualizar Contraseña"
                    className="bg-teal-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-800 md:w-auto " 
                    />
                </form>
                {passwordCambiado && (
                    <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/">Iniciar Sesion
                    </Link>
                )}
              </>
            )}

            
        </div>
    </>
    
  )
}

export default NuevaPassword