import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from '../hooks/useForm';

const EditModal = ({ open, student, onClose, onUpdate, notify }) => {
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
    if (student) {
      setValues({
        name: student.name,
        email: student.email,
        age: student.age.toString()
      });
    }
  }, [student, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runSubmit(async (formData) => {
      const resp = await onUpdate(student.id, formData);
      if (resp.success) {
        notify(resp.message || 'Student updated successfully!', 'success');
        onClose();
      } else {
        notify(resp.message || 'Failed to update student', 'error');
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Edit Student</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                variant="outlined"
                value={values.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditModal;
