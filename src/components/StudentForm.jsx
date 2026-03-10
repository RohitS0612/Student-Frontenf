import React, { useEffect } from 'react';
import { 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';
import { useForm } from '../hooks/useForm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const StudentForm = ({ onAdd, onUpdate, editData, onCancel, notify }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    else if (values.name.length < 2) errors.name = 'Name must be at least 2 characters';

    if (!values.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email format is invalid';

    if (!values.age) errors.age = 'Age is required';
    else {
      const ageNum = parseInt(values.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) errors.age = 'Age must be between 1 and 120';
    }
    return errors;
  };

  const { values, errors, handleChange, reset, runSubmit, setValues } = useForm({
    name: '',
    email: '',
    age: ''
  }, validate);

  useEffect(() => {
    if (editData) {
      setValues({
        name: editData.name,
        email: editData.email,
        age: editData.age.toString()
      });
    } else {
      reset();
    }
  }, [editData, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runSubmit(async (formData) => {
      let resp;
      if (editData) {
        resp = await onUpdate(editData.id, formData);
        if (resp.success) {
          notify(resp.message || 'Student updated successfully!', 'success');
          onCancel(); // Reset the edit state in parent
        } else {
          notify(resp.message || 'Failed to update student', 'error');
        }
      } else {
        resp = await onAdd(formData);
        if (resp.success) {
          reset();
          notify(resp.message || 'Student added successfully!', 'success');
        } else {
          notify(resp.message || 'Failed to add student', 'error');
        }
      }
      return resp;
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: '#ffffff' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={editData ? 3 : 4}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              size="small"
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} md={editData ? 3 : 4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              size="small"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              size="small"
              value={values.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
            />
          </Grid>
          <Grid item xs={12} md={editData ? 4 : 2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color={editData ? "secondary" : "primary"}
                startIcon={editData ? <EditIcon /> : <PersonAddIcon />}
                sx={{ height: '40px' }}
              >
                {editData ? 'Update Student' : 'Add Student'}
              </Button>
              {editData && (
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<CancelIcon />}
                  onClick={onCancel}
                  sx={{ height: '40px' }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default StudentForm;
