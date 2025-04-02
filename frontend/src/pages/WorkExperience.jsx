import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/style.css';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';


const WorkExperience = () => {
  const [data, setData] = useState([]);
  const [newWorkExperience, setNewWorkExperience] = useState({
    workDateFrom: '',
    workDateTo: '',
    workPositionTitle: '',
    workCompany: '',
    workMonthlySalary: '',
    SalaryJobOrPayGrade: '',
    StatusOfAppointment: '',
    isGovtService: '',
    person_id: '',
  });
  const [editItem, setEditItem] = useState(null); // Track the item being edited


  useEffect(() => {
    fetchItems();
  }, []);


  const fetchItems = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/workExperienceRoute/work_experience_table'
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching work experience:', error);
    }
  };


  const addItem = async () => {
    const {
      workDateFrom,
      workDateTo,
      workPositionTitle,
      workCompany,
      workMonthlySalary,
      SalaryJobOrPayGrade,
      StatusOfAppointment,
      isGovtService,
      person_id,
    } = newWorkExperience;


    if (
      workDateFrom.trim() === '' ||
      workDateTo.trim() === '' ||
      workPositionTitle.trim() === '' ||
      workCompany.trim() === '' ||
      workMonthlySalary.trim() === '' ||
      SalaryJobOrPayGrade.trim() === '' ||
      StatusOfAppointment.trim() === '' ||
      isGovtService.trim() === '' ||
      person_id.trim() === ''
    )
      return;


    await axios.post(
      'http://localhost:5000/workExperienceRoute/work_experience_table',
      newWorkExperience
    );
    setNewWorkExperience({
      workDateFrom: '',
      workDateTo: '',
      workPositionTitle: '',
      workCompany: '',
      workMonthlySalary: '',
      SalaryJobOrPayGrade: '',
      StatusOfAppointment: '',
      isGovtService: '',
      person_id: '',
    });
    fetchItems();
  };


  const updateItem = async () => {
    if (!editItem) return;


    try {
      await axios.put(
        `http://localhost:5000/workExperienceRoute/work_experience_table/${editItem.id}`,
        editItem
      ); // Update using editItem directly
      setEditItem(null); // Reset the edit item
      fetchItems(); // Refresh the list of items
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };


  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/workExperienceRoute/work_experience_table/${id}`
      );
      fetchItems();
    } catch (error) {
      console.error('Error deleting eligibility:', error);
    }
  };


  const handleEditClick = (item) => {
    setEditItem({ ...item }); // Copy the current item to editItem for modifying
  };


  const cancelEdit = () => {
    setEditItem(null); // Cancel editing
  };


  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Work Experience Records
        </Typography>


        <Box>
          <TextField
            label="Work Date From"
            type="date"
            value={newWorkExperience.workDateFrom}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                workDateFrom: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Work Date To"
            type="date"
            value={newWorkExperience.workDateTo}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                workDateTo: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Position Title"
            value={newWorkExperience.workPositionTitle}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                workPositionTitle: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Company"
            value={newWorkExperience.workCompany}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                workCompany: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Monthly Salary"
            value={newWorkExperience.workMonthlySalary}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                workMonthlySalary: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Salary Job Grade"
            value={newWorkExperience.SalaryJobOrPayGrade}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                SalaryJobOrPayGrade: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Status of Appointment"
            value={newWorkExperience.StatusOfAppointment}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                StatusOfAppointment: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Government Service"
            value={newWorkExperience.isGovtService}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                isGovtService: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Person ID"
            value={newWorkExperience.person_id}
            onChange={(e) =>
              setNewWorkExperience({
                ...newWorkExperience,
                person_id: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={addItem}
            variant="contained"
            style={{
              backgroundColor: '#6c0b19',
              color: 'white',
              width: '100px',
            }}
            startIcon={<AddIcon />}
            sx={{ mr: 1 }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '0.5rem', textAlign: 'center' }}>
                  ID
                </TableCell>
                <TableCell style={{ width: '5rem', textAlign: 'center' }}>
                  Work Date From
                </TableCell>
                <TableCell style={{ width: '5rem', textAlign: 'center' }}>
                  Work Date To
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Position Title
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>Company</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Monthly Salary
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Salary Job Grade
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Status of Appointment
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Government Service
                </TableCell>
                <TableCell style={{ width: '3rem', textAlign: 'center' }}>
                  Person ID
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {Object.keys(item).map((key) => (
                    <TableCell
                      key={key}
                      style={{ textAlign: 'center', overflow: 'hidden' }}
                    >
                      {editItem && editItem.id === item.id ? (
                        <TextField
                          value={editItem[key] || ''}
                          onChange={(e) =>
                            setEditItem({ ...editItem, [key]: e.target.value })
                          }
                          fullWidth
                        />
                      ) : (
                        item[key]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editItem?.id === item.id ? (
                      <>
                        <Button
                          onClick={updateItem}
                          variant="contained"
                          style={{
                            backgroundColor: '#6c0b19',
                            color: 'white',
                            width: '100px',
                          }}
                          startIcon={<SaveIcon />}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={cancelEdit}
                          variant="contained"
                          style={{
                            backgroundColor: '#000000',
                            color: 'white',
                            marginTop: '5px',
                            width: '100px',
                          }}
                          startIcon={<CancelIcon />}
                          sx={{ mr: 1 }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEditClick(item)}
                          variant="contained"
                          style={{
                            backgroundColor: '#6c0b19',
                            color: 'white',
                            width: '100px',
                          }}
                          startIcon={<EditIcon />}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteItem(item.id)}
                          variant="contained"
                          style={{
                            backgroundColor: '#000000',
                            color: 'white',
                            marginTop: '5px',
                            width: '100px',
                          }}
                          sx={{ mr: 1 }}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};


export default WorkExperience;



