import React, { useState } from "react";
import FormRegister from '../components/FormRegister';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Alert } from '@mui/material';


const Login = ( { setIsLoggedIn } ) => {
  
  // Estado para almacenar los valores de los campos de correo electrónico y contraseña
  const [formData, setFormData] = useState({
    email: '',
    password_hash: ''
  });

  const [openLoginSuccess, setOpenLoginSuccess] = useState(false);
  const [openLoginError, setOpenLoginError] = useState(false);

  const [modalRegister, setModalRegister] = useState(false);

  // Función para manejar el cambio en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const openRegister = () => {
    setModalRegister(true);
  }
  const closeRegister = () => {
    setModalRegister(false);
  }

  const [isCorrect, setIsCorrect] = useState(true)

  // Función para iniciar sesión y obtener el token del servidor
  const login = async (emailLogin, passwordLogin) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailLogin, password_hash: passwordLogin })
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }
      // guardo el token
      const { data } = await response.json();

      // Almacenar el token en una cookie
      document.cookie = `token=${data}; path=/`;

      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  const handlerSubmit = async e => {
    e.preventDefault();
    const {email, password_hash} = formData;
    const isThereToken = await login(email, password_hash);
    if(isThereToken) {
      setOpenLoginSuccess(true);
      setTimeout(() => setOpenLoginSuccess(false), 1000);
      setIsLoggedIn(isThereToken);
    } else {
      setOpenLoginError(true);
      setTimeout(() => setOpenLoginError(false), 1000);
    }
    
  }

  return (
    <>
      <section className="bg-gray-300 flex flex-col justify-center items-center gap-10 overflow-y-hidden h-screen w-screen">
        <section className="bg-blue-500 w-96 flex flex-col justify-center items-center gap-20  rounded-tr-[100px] h-[80vh] ">
          <section className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-4xl text-white font-bold">Bienvenido</h1>
            <h2 className="text-xl text-white font-bold">Inicia Sesión</h2>
          </section>
          
          <form
            action=""
            id="login"
            className="flex flex-col justify-center items-center gap-5"
          >
            <input
              id="email"
              className="bg-gray-900 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Usuario"
              name="email"
              value={formData.email} 
              onChange={handleInputChange} 
            />
            <input
              id="password_hash"
              className={`bg-gray-900 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                isCorrect
                  ? "bg-green-900 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                  : "bg-red-900 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500border-red-500 text-red-900"
              } ${
                isCorrect
                  ? "bg-green-900 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                  : "bg-red-900 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500border-red-500 text-red-900"
              }`}
              type="password"
              placeholder="Contraseña"
              name="password_hash"
              value={formData.password_hash} 
              onChange={handleInputChange} 
              // onChange={validation}
            />
            <div className="text-red-300 text-sm">
              
            </div>
            <button 
              type="submit" 
              form="login" 
              onClick={handlerSubmit}
              className="flex items-center gap-4 text-white py-2 px-4 rounded-xl bg-black hover:bg-white hover:text-black transition-colors"
            >
              Iniciar Sesión
            </button>
            <p 
            onClick={openRegister}
            className="pb-14" 
            style={{ cursor: 'pointer' }}
          >
            Registrate
          </p>
          </form>
        </section>
      </section>
      <FormRegister modalRegister={modalRegister} handleCloseModal={closeRegister}/>
      <Dialog
        open={openLoginSuccess}
        onClose={() => setOpenLoginSuccess(false)}
      >
        <Alert
          sx={{fontSize: '1.2rem', padding: "1.2rem"}}
          severity='success'
        >
          Usuario {formData.email} ingresó con éxito!
        </Alert>
      </Dialog>
      <Dialog
        open={openLoginError}
        onClose={() => setOpenLoginError(false)}
      >
        <DialogContent>
          <Alert severity='success'>
            Ingreso fallido.
          </Alert>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
