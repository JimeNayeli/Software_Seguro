import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddProject from "../components/Equipment/CreateEquipment";
import { useDispatch } from 'react-redux';


const initialValue = { name: "", price: "", characteristics: "", quantity: "" };

const Proyectos = () => {
  const dispatch = useDispatch();
  const url = `/api/equipments`;
  const [open, setOpen] = React.useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

    useEffect(() => {
      fetchProyectos()
    }, []) 

    const fetchProyectos = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener equipos');
        }

        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
  }; 

  const handleFormSubmit = () => {
    const isUpdating = !!formData.id;
  
    fetch(isUpdating ? `${url}/${formData.id}` : url, {
      method: isUpdating ? "PUT" : "POST",
      body: JSON.stringify(formData),
      headers: {
        'content-type': "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        handleClose();
        fetchProyectos();
        dispatch(updateProyectoSuccess(resp));
        });
  };
   
  const handleUpdate = (proyecto) => {
    setFormData(proyecto);
    handleClickOpen();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then(resp => resp.json())
        .then(() => {
          setProyectos((prevProyectos) => prevProyectos.filter(proyecto => proyecto.id !== id));
          dispatch(deleteProyectoSuccess(id));
        });
    }
  };

  return (
    <div>
      <header className="flex flex-col items-start py-4">
        <h1 className='text-xl p-7 text-gray-900 font-bold'>Equipos ({proyectos.length})</h1>
        <button
          onClick={handleClickOpen}
          className="bg-blue-500  text-white py-2 px-4 rounded-xl hover:bg-blue-800/50 rounded-md text-sm mx-7 my-5"
        >
          Crear Equipo
        </button>
      </header>
      <div className='grid grid-cols-3 gap-3 '>
        {proyectos.map((proyecto) => (
          <div className='bg-gray-900 p-4 rounded-md font-bold ' key={proyecto.id}>
            <header className='flex justify-between'>
              <p className='text-base text-white'>{proyecto.name}</p>
              <div className='flex gap-x-2' >
                <Button size="small" color="primary" onClick={() => handleUpdate(proyecto)}>
                  <EditIcon />
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(proyecto.id)}>
                  <DeleteIcon />
                </Button>
              </div>
            </header>
            <p className='text-xs text-white'>Precio: $ {proyecto.price}</p>
            <p className='text-xs text-white'>Caracteristica: {proyecto.characteristics}</p>
            <p className='text-xs text-white'>Cantidad: {proyecto.quantity}</p>
          </div>
        ))}
      </div>
      <AddProject open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Proyectos;
