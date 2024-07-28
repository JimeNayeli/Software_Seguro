import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-quartz.css';
import FormDialog from "../components/Schedule/FormCreateSchedule";

const initialValue = { start_time: "", end_time: "", date: "", availability: "" };

const Schedule = () => {
    const [gridApi, setGridApi] = useState(null)
    const [tableData, setTableData] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue)
    const handleClickOpen = () => {
      setOpen(true); 
    };
  
    const handleClose = () => {
      setOpen(false);
      setFormData(initialValue)
    };
    const url = `http://localhost:3000/schedule`
    const columnDefs = [
      { headerName: "No", field: "Id" },
      { headerName: "Hora inicio", field: "start_time", },
      { headerName: "Hora fin", field: "end_time", },
      { headerName: "Fecha", field: "date" ,
      cellRenderer: params => params.value ? formatDate(params.value) : ''},
      { headerName: "Disponibilidad", field: "availability",
      cellRenderer: params => params.value ? "Disponible" : "No disponible"}, 
      {
        headerName: "Aciones",field: "id", cellRenderer: (params) => <div>
          <IconButton size="small"color="primary" onClick={() => handleUpdate(params.data)}><EditIcon fontSize="inherit"/></IconButton>
          <IconButton size="small" color="secondary" onClick={() => handleDelete(params.value)}><DeleteIcon fontSize="inherit"/></IconButton>
        </div>
      } 
    ]
    // calling getSchedules function for first time  
    useEffect(() => {
      getSchedules();
    }, [])

    const formatDate = (dateString) => {
      const formattedDate = new Date(dateString).toISOString().split('T')[0];
      return formattedDate;
    };
  
    //fetching user data from server

    const getSchedules = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener horarios');
        }
        const data = await response.json();
    
        // Add a new property "Id" for sequential numbers
        const dataWithId = data.map((item, index) => ({
          ...item,
          Id: index + 1,
        }));
    
        setTableData(dataWithId);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    const onChange = (e) => {
      const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    };
    
    const onGridReady = (params) => {
      setGridApi(params)
    }
  
    // setting update row data to form data and opening pop up window
    const handleUpdate = (oldData) => {
      oldData.date = formatDate(oldData.date);
      setFormData(oldData)
      handleClickOpen()
    }
    //deleting a user
    const handleDelete = (id) => {
      const confirm = window.confirm("Are you sure, you want to delete this row", id)
      if (confirm) {
        fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getSchedules())
  
      }
    }
    const handleFormSubmit = () => {
      const isUpdating = !!formData.id;
      const formattedDate = formatDate(formData.date);
      fetch(isUpdating ? `${url}/${formData.id}` : url, {
        method: isUpdating ? "PUT" : "POST",
        body: JSON.stringify({ ...formData, date: formattedDate}),
        headers: {
          'content-type': "application/json"
        }
      })
        .then(resp => resp.json())
        .then(resp => {
          handleClose();
          getSchedules();
          });
      
    };
  
    const defaultColDef = {
      sortable: true,
      flex: 1, filter: true,
      floatingFilter: true
    }
    return (
      <div>
        <header className='flex justify-between items-center py-4'>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Crear horario</Button>
          
        </header>
        <div className="ag-theme-dark" style={{ height: '400px' }}>
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            autoSizeColumns={true} 
          />
          
        </div>
        <FormDialog open={open} handleClose={handleClose}
          data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
      </div>
    );
};

export default Schedule;
