import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevaPassword from './paginas/NuevaPassword';
import AdministrarClientes from './paginas/AdministrarClientes';
import NuevoCliente from './paginas/NuevoCliente';

import { AuthProvider } from './context/AuthProvider';
import { ClientesProvider } from './context/ClientesProvider';

function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <ClientesProvider>
          <Routes>
            {/**Rutas Publicas */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='confirmar/:token' element={<ConfirmarCuenta />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevaPassword />} />
            </Route>

            {/**Rutas Privadas */}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<NuevoCliente />} />
              <Route path='clientes' element={<AdministrarClientes />} />
            </Route>
          </Routes>
        </ClientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
