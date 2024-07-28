import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Alert } from '@mui/material';

export default function CrearProyecto({ open, handleClose, data, onChange, handleFormSubmit }) {
  const { id, name, price, characteristics, quantity, image_equipments = "img" } = data;
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleFormSubmitWithValidation = async () => {
    const errors = validateFields();
    if (Object.keys(errors).length === 0) {
      try {
        await handleFormSubmit();
        setSuccessDialogOpen(true);
        setTimeout(() => setSuccessDialogOpen(false), 500);
      } catch (error) {
        setErrorDialogOpen(true);
        setTimeout(() => setErrorDialogOpen(false), 500);
      }
    } else {
      setFieldErrors(errors);
    }
  };

  // Función para validar los campos
  const validateFields = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Campo obligatorio';
    }
    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      errors.price = 'Ingrese un precio correcto';
    }
    if (!characteristics.trim()) {
      errors.characteristics = 'Campo obligatorio';
    }
    if (parseInt(quantity) <= 0 || isNaN(parseInt(quantity))) {
      errors.quantity = 'Ingrese una cantidad correcto';
    }
    return errors;
  };
  

  const handleChange = (e) => {
    setFieldErrors({});
    onChange(e);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id ? "Actualizar Equipo" : "Crear nuevo Equipo"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Ingrese Titulo"
              label="Nombre"
              variant="outlined"
              margin="dense"
              fullWidth
              required
              error={!!fieldErrors.name}
              helperText={fieldErrors.name}
            />
            <TextField
              id="price"
              value={price}
              onChange={handleChange}
              placeholder="Ingrese precio"
              label="Precio"
              variant="outlined"
              margin="dense"
              fullWidth
              required
              error={!!fieldErrors.price}
              helperText={fieldErrors.price}
            />
            <TextField
              id="characteristics"
              value={characteristics}
              onChange={handleChange}
              placeholder="Ingrese caracteristicas"
              label="Caracteristica"
              variant="outlined"
              margin="dense"
              fullWidth
              required
              error={!!fieldErrors.characteristics}
              helperText={fieldErrors.characteristics}
            />
            <TextField
              id="quantity"
              value={quantity}
              onChange={handleChange}
              placeholder="Ingrese cantidad"
              label="Cantidad"
              variant="outlined"
              margin="dense"
              fullWidth
              type="number"
              required
              error={!!fieldErrors.quantity}
              helperText={fieldErrors.quantity}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" onClick={handleFormSubmitWithValidation} variant="contained">
            {id ? "Update" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        >
        <Alert
          sx={{ fontSize: "1.2rem", padding: "1.2rem" }}
          severity="success"
          >
          La operación se realizó con éxito.
        </Alert>
    </Dialog>

      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
      >
        <DialogTitle id="error-dialog-title">Error en la operación</DialogTitle>
        <DialogContent>
          <Alert id="error-dialog-description">
            Hubo un error al realizar la operación.
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}
