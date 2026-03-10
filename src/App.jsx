import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import StudentForm from './components/StudentForm';
import StudentsTable from './components/StudentsTable';
import DeleteDialog from './components/DeleteDialog';
import { useStudents } from './hooks/useStudents';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      color: '#666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const {
    filteredStudents,
    loading,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    addStudent,
    updateStudent,
    deleteStudent,
    exportToExcel
  } = useStudents();


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  
  const [editStudent, setEditStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const notify = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="app-container">
  

        <StudentForm 
          onAdd={addStudent} 
          onUpdate={updateStudent}
          editData={editStudent}
          onCancel={() => setEditStudent(null)}
          notify={notify} 
        />

       
        <Box className="toolbar-row">
          <TextField
            placeholder="Search by name, email or age..."
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', md: '400px' }, bgcolor: 'white' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={exportToExcel}
          >
            Export Excel
          </Button>
        </Box>

       
        <StudentsTable
          students={filteredStudents}
          loading={loading}
          onEdit={setEditStudent}
          onDelete={setDeleteTarget}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />

        
        <DeleteDialog
          open={Boolean(deleteTarget)}
          student={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={deleteStudent}
          notify={notify}
        />

       
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
