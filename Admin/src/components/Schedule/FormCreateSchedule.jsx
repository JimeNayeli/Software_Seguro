import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Alert } from '@mui/material';


export default function FormSchedule({ open, handleClose, data, onChange, handleFormSubmit }) {
  const  { id, start_time, end_time, date, availability }= data;
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleFormSubmitWithValidation =  async() => {
    const errors = validateFields();
    const timeValidation = validateTime();
    const dateValidation = validateDate();
  
    if (Object.keys(errors).length === 0 && Object.keys(timeValidation).length === 0 && Object.keys(dateValidation).length === 0) {
      handleFormSubmit();
      try {
        await handleFormSubmit();
        setSuccessDialogOpen(true);
        setTimeout(() => setSuccessDialogOpen(false), 500);
      } catch (error) {
        setErrorDialogOpen(true);
        setTimeout(() => setErrorDialogOpen(false), 500);
      }
    } else {
      setFieldErrors({ ...errors, ...timeValidation, ...dateValidation });
    }
  };
  // Función para validar los campos
  const validateFields = () => {
    const errors = {};
    if (!start_time) {
      errors.start_time = 'Campo obligatorio';
    }
    if (!end_time) {
      errors.end_time = 'Campo obligatorio';
    }
    if (!date) {
      errors.date = 'Campo obligatorio';
    }
    if (availability !== true && availability !== false) {
      errors.availability = 'Seleccione correctamente la disponibilidad"';}

    return errors;
  };

  const validateTime = () => {
    const timeErrors = {};
    const startTime = new Date(`2000-01-01T${start_time}`);
    const endTime = new Date(`2000-01-01T${end_time}`);

    if (startTime >= endTime) {
      timeErrors.start_time = 'La hora de inicio debe ser menor que la hora de fin';
      timeErrors.end_time = 'La hora de fin debe ser mayor que la hora de inicio';
    }

    return timeErrors;
  };
  
  // Función para validar que la fecha no sea anterior a la fecha actual
  const validateDate = () => {
    const dateErrors = {};
    const selectedDate = new Date(date);
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      dateErrors.date = 'No se puede seleccionar una fecha anterior a la actual';
    }
  
    return dateErrors;
  };

  const handleChange = (e) => {
    setFieldErrors({});
    onChange(e);
  };
  const handleSelectChange = (event) => {
    const newValue = event.target.value === 'true';
    handleChange({ target: { id: 'availability', value: newValue } });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id ? "Actualizar Horario" : "Crear nuevo Horario"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="start_time"
              value={start_time}
              onChange={handleChange}
              placeholder="Ingrese inicio"
              label="Hora inicio"
              variant="outlined"
              margin="dense"
              fullWidth
              type='Time'
              required
              error={!!fieldErrors.start_time}
              helperText={fieldErrors.start_time}
            />
            <TextField
              id="end_time"
              value={end_time}
              onChange={handleChange}
              placeholder="Ingrese fin"
              label="Hora fin"
              variant="outlined"
              margin="dense"
              fullWidth
              type='Time'
              required
              error={!!fieldErrors.end_time}
              helperText={fieldErrors.end_time}
            />
            <TextField
              id="date"
              value={date}
              onChange={handleChange}
              placeholder="Ingrese la fecha"
              label="Fecha"
              variant="outlined"
              margin="dense"
              fullWidth
              type='Date'
              required
              error={!!fieldErrors.date}
              helperText={fieldErrors.date}
            />
             <TextField
              id="availability"
              select
              value={availability === true ? 'true' : (availability === false ? 'false' : '')} 
              onChange={handleSelectChange}
              placeholder="Seleccione la disponibilidad"
              label="Disponibilidad"
              variant="outlined"
              margin="dense"
              fullWidth
              error={!!fieldErrors.availability}
              helperText={fieldErrors.availability}
            >
              <MenuItem value="">Seleccione disponibilidad</MenuItem>
              <MenuItem value="true">Disponible</MenuItem>
              <MenuItem value="false">No disponible</MenuItem>
            </TextField>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button color="primary" onClick={handleFormSubmitWithValidation} variant="contained" disabled={Object.keys(fieldErrors).length > 0}>
            {id ? "Actualizar" : "Guardar"}
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
        <DialogContent>
          <Alert severity="success">
            Hubo un error al realizar la operación.
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}
