import { useState, useEffect, useMemo } from 'react';
import { studentsApi } from '../api/students';
import * as XLSX from 'xlsx';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

 
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentsApi.getAll();
      
      if (response.data.success) {
        setStudents(response.data.data); 
      } else {
        setError(response.data.message || 'Failed to fetch students');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  
  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) return [];
    return students.filter((student) => {
      const s = searchTerm.toLowerCase();
      return (
        student.name.toLowerCase().includes(s) ||
        student.email.toLowerCase().includes(s) ||
        student.age.toString().includes(s)
      );
    });
  }, [students, searchTerm]);

  
  const addStudent = async (studentData) => {
    try {
      const response = await studentsApi.create(studentData);
      if (response.data.success) {
        await fetchStudents();
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      const response = await studentsApi.update(id, studentData);
      if (response.data.success) {
        await fetchStudents();
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await studentsApi.delete(id);
      if (response.data.success) {
        await fetchStudents();
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };


  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "Students_List.xlsx");
  };

  return {
    students,
    filteredStudents,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    addStudent,
    updateStudent,
    deleteStudent,
    exportToExcel,
    refresh: fetchStudents
  };
};
