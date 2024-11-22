import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)/**Usamos este state para poder dar indicaciones una vez el objeto haya terminado de cargar */
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            
            //No existe token
            if(!token) {
                setCargando(false)
                return
            }

            //Existe token
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/admin/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    }, [])/*Usamos este useEffect para que compruebe si el usuario esta autenticado cuando la pagina cargue */

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }
    

    return(
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando, 
                cerrarSesion
            }}/**Los values los ponemos para decirle que valores tendra a dispocision para usar */
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext