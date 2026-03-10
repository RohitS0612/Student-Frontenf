import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

const DeleteDialog = ({ open, student, onClose, onConfirm, notify }) => {
  const handleConfirm = async () => {
    const result = await onConfirm(student.id);
    if (result.success) {
      notify(result.message || 'Student deleted successfully!', 'success');
      onClose();
    } else {
      notify(result.message || 'Failed to delete student', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{student ? student.name : 'this student'}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleConfirm} color="error" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
