import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth()
  return (
        <aside className="md:w-2/5 lg:w-2/5 xl:w-1/5 bg-teal-600 px-5 py-10">
            <h1 className="uppercase text-white tracking-wide text-2xl font-bold mt-2">CRM - Pineda Motor's </h1>
            <p className="mt-10 text-white">Administra tus Clientes con el CRM </p>
            <nav className="mt-8">
              <Link 
                to="/admin/clientes"
                className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400"
              >Clientes</Link>
              <Link
                to="/admin"
                className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400"
              >Nuevo Cliente</Link>
              <Link
                to="/admin"
                className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400"
              >Perfil</Link>
              <Link
                    className="px-3 py-1 text-white block hover:bg-teal-700 hover:text-yellow-400"
                    onClick={cerrarSesion}
              >Cerrar Sesion</Link>
            </nav>
        </aside>
  )
}

export default Header