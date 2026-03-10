import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentsTable = ({ 
  students, 
  loading, 
  onEdit, 
  onDelete, 
  page, 
  setPage, 
  rowsPerPage, 
  setRowsPerPage 
}) => {
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && students.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (students.length === 0) {
    return (
      <Paper elevation={0} className="table-paper">
        <Box className="empty-state">
          <Typography variant="h6">No students found</Typography>
          <Typography variant="body2">Try adding a new student or adjusting your search.</Typography>
        </Box>
      </Paper>
    );
  }

  const paginatedStudents = students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={1} className="table-paper">
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((student, index) => (
              <TableRow key={student.id || index} hover>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32, fontSize: '0.875rem' }}>
                      {student.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {student.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={student.age} 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => onEdit(student)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onDelete(student)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StudentsTable;
