import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    console.log(cargando);
    console.log(auth);

    if(cargando) return 'Cargando...'

  return (
    <>
        <div className='md:flex min-h-screen md:align-top'>
            <Header />
            {auth?._id ? (
                <main className="md:w-3/5  xl:w-4/5 px-5 py-10 bg-gray-200">
                    <Outlet /> 
                </main>
            ) : <Navigate to="/" /> }
        </div>
    </>
    
  )
}

export default RutaProtegida