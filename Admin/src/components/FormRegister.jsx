import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Alert } from '@mui/material';
const FormRegister = ( { modalRegister, handleCloseModal } ) => {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorNetDialogOpen, setErrorNetDialogOpen] = useState(false);
  const [isFirstFilled, setIsFirstFilled] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
	const [formUser, setFormUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password_hash: '',
    password_salt:'',
    phone: '',
    image_equipments:''
  });

  const {first_name, last_name, email, password_hash, phone} = formUser;
  
  // Función para validar los campos
  const validateFields = () => {
    const errors = {};
    if (!first_name) {
      errors.first_name = 'Nombre obligatorio';
    }if (!last_name) {
      errors.last_name = 'Apellido obligatorio';
    }if (!email) {
      errors.email = 'e-mail obligatorio';
    }if (!phone) {
      errors.phone = 'Celular obligatorio';
    }if (!password_hash) {
      errors.password_hash = 'Contraseña obligatorio';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const requirements = [
    { regex: /.{8,}/, message: "Contraseña debe tener al menos 8 caracteres" },
    { regex: /\d/, message: "Contraseña debe contener al menos un número" },
    {
      regex: /[a-z]/,
      message: "Contraseña debe contener al menos una letra minúscula",
    },
    {
      regex: /[A-Z]/,
      message: "Contraseña debe contener al menos una letra mayúscula",
    },
    {
      regex: /[^A-Za-z0-9]/,
      message: "Contraseña debe contener al menos un caracter especial",
    },
  ];

  useEffect(() => {
    if(!isFirstFilled)
      validateFields();
  }, [formUser, isFirstFilled])
  

  const [isValid, setIsValid] = useState(
    Array(requirements.length).fill(false)
  );
  const isPasswordValid = isValid.every((valid) => valid);

  const validation = password => {
    const newValidations = requirements.map((req) => req.regex.test(password));
    setIsValid(newValidations);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name == 'password_hash') validation(value);
    setFormUser({
      ...formUser,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFirstFilled(false);
    
    if(validateFields() && isValid.every(valid => valid)){
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formUser),
        });
  
        if (response.ok) {
          console.log('Usuario registrado con éxito');
          setSuccessDialogOpen(true);
          setTimeout(() => setSuccessDialogOpen(false), 1000);
          handleCloseModal();
          // Puedes realizar otras acciones aquí, como mostrar un mensaje de éxito o redireccionar al usuario.
        } else {
          console.error('Error al registrar el usuario');
          setErrorDialogOpen(true);
          setTimeout(() => setErrorDialogOpen(false), 1000);
          // Puedes manejar errores y mostrar mensajes adecuados al usuario.
        }
      } catch (error) {
        console.error('Error de red:', error);
        setErrorNetDialogOpen(true);
        setTimeout(() => setErrorNetDialogOpen(false), 1000);
      }
    }
  };
  
  
  return (
    <>
      <Dialog
        open={modalRegister}
        onClose={handleCloseModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Registrate!</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id='first_name'
              name='first_name'
              value={formUser.first_name}
              onChange={handleInputChange}
              placeholder='Escriba su nombre'
              label='Nombre'
              variant='outlined'
              margin='dense'
              fullWidth
              required
              error={!!fieldErrors.first_name}
              helperText={fieldErrors.first_name}
            />
            <TextField
              id='last_name'
              name='last_name'
              value={formUser.last_name}
              onChange={handleInputChange}
              placeholder='Escriba su apellido'
              label='Apellido'
              variant='outlined'
              margin='dense'
              fullWidth
              required
              error={!!fieldErrors.last_name}
              helperText={fieldErrors.last_name}
            />
            <TextField
              id='email'
              name='email'
              value={formUser.email}
              onChange={handleInputChange}
              type='email'
              placeholder='Escriba su correo electrónico'
              label='Correo'
              variant='outlined'
              margin='dense'
              fullWidth
              required
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />
            <TextField
              id='phone'
              name='phone'
              value={formUser.phone}
              onChange={handleInputChange}
              type='tel'
              placeholder='Escriba su número de celular'
              label='Celular'
              variant='outlined'
              margin='dense'
              fullWidth
              required
              error={!!fieldErrors.phone}
              helperText={fieldErrors.phone}
            />
            <TextField
              id='password_hash'
              name='password_hash'
              value={formUser.password_hash}
              onChange={handleInputChange}
              type='password'
              placeholder='Escriba una contraseña'
              label='Contraseña'
              variant='outlined'
              margin='dense'
              fullWidth
              required
              error={!!fieldErrors.password_hash}
              helperText={
                !!fieldErrors.password_hash ?
                  fieldErrors.password_hash :
                  !!requirements.find(error => !error.regex.test(formUser.password_hash)) ?
                    requirements.find(error => !error.regex.test(formUser.password_hash)).message :
                    ''
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='secondary' variant='outlined'>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color='primary' variant='contained' disabled={Object.keys(fieldErrors).length > 0 || !isValid.every(valid => valid) } >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <Alert
          sx={{fontSize: '1.2rem', padding: "1.2rem"}}
          severity='success'
        >
          Usuario {formUser.first_name} registrado con éxito!
        </Alert>
      </Dialog>
      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
      >
        <DialogContent>
          <Alert severity='success'>
            No se ha podido registrar al usuario {formUser.first_name}.
          </Alert>
        </DialogContent>
      </Dialog>
      <Dialog
        open={errorNetDialogOpen}
        onClose={() => setErrorNetDialogOpen(false)}
      >
        <DialogContent>
          <Alert severity='success'>
            No hay conexión con el servidor.
          </Alert>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormRegister