import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';


const OtherSkills = () => {
  const [data, setData] = useState([]);
  const [newSpecialSkills, setNewSpecialSkills] = useState('');
  const [newNonAcademicDistinctions, setNewNonAcademicDistinctions] =
    useState('');
  const [newMembershipInAssociation, setNewMembershipInAssociation] =
    useState('');
  const [editItem, setEditItem] = useState(null);


  useEffect(() => {
    fetchSpecialSkills();
  }, []);


  const fetchSpecialSkills = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/otherInfo/otherinformation'
      );
      console.log('API Response:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching special skills:', error);
    }
  };


  const addSpecialSkills = async () => {
    if (
      !newSpecialSkills ||
      !newNonAcademicDistinctions ||
      newMembershipInAssociation.trim() === ''
    )
      return;
    await axios.post('http://localhost:5000/otherInfo/otherinformation', {
      specialSkills: newSpecialSkills,
      nonAcademicDistinctions: newNonAcademicDistinctions,
      membershipInAssociation: newMembershipInAssociation,
    });
    setNewSpecialSkills('');
    setNewNonAcademicDistinctions('');
    setNewMembershipInAssociation('');
    fetchSpecialSkills();
  };


  const updateSpecialSkills = async () => {
    if (
      !editItem ||
      !editItem.specialSkills ||
      !editItem.nonAcademicDistinctions ||
      editItem.membershipInAssociation.trim() === ''
    )
      return;
    await axios.put(
      `http://localhost:5000/otherInfo/otherinformation/${editItem.id}`,
      {
        specialSkills: editItem.specialSkills,
        nonAcademicDistinctions: editItem.nonAcademicDistinctions,
        membershipInAssociation: editItem.membershipInAssociation,
      }
    );
    setEditItem(null);
    fetchSpecialSkills();
  };


  const deleteSpecialSkills = async (id) => {
    await axios.delete(
      `http://localhost:5000/otherInfo/otherinformation/${id}`
    );
    fetchSpecialSkills();
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
          Other Information Records
        </Typography>


        {/* Add New Special Skill */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Special Skills"
            value={newSpecialSkills}
            onChange={(e) => setNewSpecialSkills(e.target.value)}
            style={{ minWidth: 150, marginRight: '10px' }}
          />


          <TextField
            label="Non-Academic Distinctions"
            value={newNonAcademicDistinctions}
            onChange={(e) => setNewNonAcademicDistinctions(e.target.value)}
            style={{ minWidth: 150, marginRight: '10px' }}
          />


          <TextField
            label="Membership in Association"
            value={newMembershipInAssociation}
            onChange={(e) => setNewMembershipInAssociation(e.target.value)}
            style={{ minWidth: 150 }}
          />
          <Button
            onClick={addSpecialSkills}
            variant="contained"
            style={{
              backgroundColor: '#6c0b19',
              color: 'white',
              marginLeft: '10px',
              width: '100px',
            }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>


        {/* Special Skills Table */}
        <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Special Skills</TableCell>
              <TableCell>Non-Academic Distinctions</TableCell>
              <TableCell>Membership in Association</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.specialSkills}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          specialSkills: e.target.value,
                        })
                      }
                      style={{ minWidth: 150, marginRight: '10px' }}
                    />
                  ) : (
                    item.specialSkills
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.nonAcademicDistinctions}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          nonAcademicDistinctions: e.target.value,
                        })
                      }
                      style={{ minWidth: 150, marginRight: '10px' }}
                    />
                  ) : (
                    item.nonAcademicDistinctions
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.membershipInAssociation}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          membershipInAssociation: e.target.value,
                        })
                      }
                      style={{ minWidth: 150 }}
                    />
                  ) : (
                    item.membershipInAssociation
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <>
                      <Button
                        onClick={updateSpecialSkills}
                        variant="contained"
                        style={{
                          width: '100px',
                          backgroundColor: '#6c0b19',
                          marginRight: '10px',
                        }}
                      >
                        <SaveIcon /> Save
                      </Button>
                      <Button
                        onClick={() => setEditItem(null)}
                        variant="contained"
                        style={{
                          backgroundColor: '#000000',
                          color: 'white',
                          width: '100px',
                          marginRight: '10px',
                        }}
                      >
                        <CancelIcon /> Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setEditItem(item)}
                        variant="contained"
                        style={{
                          width: '100px',
                          backgroundColor: '#6c0b19',
                          marginRight: '10px',
                        }}
                      >
                        <EditIcon /> Edit
                      </Button>
                      <Button
                        onClick={() => deleteSpecialSkills(item.id)}
                        variant="contained"
                        style={{ backgroundColor: '#000000', color: 'white' }}
                      >
                        <DeleteIcon /> Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};


export default OtherSkills;





