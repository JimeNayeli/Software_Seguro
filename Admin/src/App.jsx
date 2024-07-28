import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Equipos from "./pages/Equipment";
import Horario from "./pages/Schedule";
import Reporte from "./pages/Report";
import Sidebar from "./components/SlideBar";
import Login from './pages/Login';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para obtener el token almacenado en la cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));

    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }

    return null;
  }

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = getTokenFromCookie();
    return token !== null;
  }

  // Función para cerrar sesión y eliminar la cookie
  const logout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }
  const handleLogout = () =>{
    logout();
    setIsLoggedIn(false);
  }
  useEffect(() => {
    if(isAuthenticated())setIsLoggedIn(true)
  }, [])
  

  return (
    <BrowserRouter>
      <div className={isLoggedIn ? 'grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-6 min-h-screen' : 'flex flex-col justify-center items-center gap-10 overflow-y-hidden h-full'}>
        {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />} {/* Mostrar página de inicio de sesión si el usuario no ha iniciado sesión */}
        {isLoggedIn && (
          <>
            <Sidebar />
            <main className='lg:col-span-3 xl:col-span-5 bg-gray-200 p-4 h-[100vh] rounded-lg overflow-y-scroll'>
              <Routes>
                <Route path="/equipos" element={<Equipos />} />
                <Route path="/horarios" element={<Horario />} /> 
                <Route path="/reportes" element={<Reporte />} />     
              </Routes>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4 mx-4 ">
                Logout
              </button> 
            </main>
          </>
        )}
      </div>
    </BrowserRouter>
  );
    
}

export default App
