import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';


const College = () => {
  // State for college data
  const [data, setData] = useState([]);


  // State for new college entry
  const [newCollege, setNewCollege] = useState({
    collegeNameOfSchool: '',
    collegeDegree: '',
    collegePeriodFrom: '',
    collegePeriodTo: '',
    collegeHighestAttained: '',
    collegeYearGraduated: '',
    collegeScholarshipAcademicHonorsReceived: '',
    person_id: '',
  });


  // State for editing college ID
  const [editingCollegeId, setEditingCollegeId] = useState(null);
  const [editedCollege, setEditedCollege] = useState({});


  // Fetch colleges on component mount
  useEffect(() => {
    fetchColleges();
  }, []);


  // Fetch college data
  const fetchColleges = async () => {
    const response = await axios.get(
      'http://localhost:5000/college/college_table'
    );
    setData(response.data);
  };


  // Add new college
  const addCollege = async () => {
    await axios.post('http://localhost:5000/college/college_table', newCollege);
    resetNewCollege();
    fetchColleges();
  };


  // Update college
  const updateCollege = async (id) => {
    await axios.put(
      `http://localhost:5000/college/college_table/${id}`,
      editedCollege
    );
    setEditingCollegeId(null);
    fetchColleges();
  };


  // Delete college
  const deleteCollege = async (id) => {
    await axios.delete(`http://localhost:5000/college/college_table/${id}`);
    fetchColleges();
  };


  // Reset new college form
  const resetNewCollege = () => {
    setNewCollege({
      collegeNameOfSchool: '',
      collegeDegree: '',
      collegePeriodFrom: '',
      collegePeriodTo: '',
      collegeHighestAttained: '',
      collegeYearGraduated: '',
      collegeScholarshipAcademicHonorsReceived: '',
      person_id: '',
    });
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        College Information
      </Typography>


      {/* Add New College */}
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="College Name"
              value={newCollege.collegeNameOfSchool}
              onChange={(e) =>
                setNewCollege({
                  ...newCollege,
                  collegeNameOfSchool: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Degree"
              value={newCollege.collegeDegree}
              onChange={(e) =>
                setNewCollege({ ...newCollege, collegeDegree: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Period From"
              value={newCollege.collegePeriodFrom}
              onChange={(e) =>
                setNewCollege({
                  ...newCollege,
                  collegePeriodFrom: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Period To"
              value={newCollege.collegePeriodTo}
              onChange={(e) =>
                setNewCollege({
                  ...newCollege,
                  collegePeriodTo: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Highest Attained"
              value={newCollege.collegeHighestAttained}
              onChange={(e) =>
                setNewCollege({
                  ...newCollege,
                  collegeHighestAttained: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year Graduated"
              value={newCollege.collegeYearGraduated}
              onChange={(e) =>
                setNewCollege({
                  ...newCollege,
                  collegeYearGraduated: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Honors Received"
              value={newCollege.collegeScholarshipAcademicHonorsReceived}
              onChange={(e) =>
                setNewCollege({
                  ...newCollege,
                  collegeScholarshipAcademicHonorsReceived: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Person ID"
              value={newCollege.person_id}
              onChange={(e) =>
                setNewCollege({ ...newCollege, person_id: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={addCollege}
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: '#6c0b19' }}
            >
              Add College
            </Button>
          </Grid>
        </Grid>
      </Paper>


      {/* Colleges Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>College Name</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Period From</TableCell>
            <TableCell>Period To</TableCell>
            <TableCell>Highest Attained</TableCell>
            <TableCell>Year Graduated</TableCell>
            <TableCell>Honors Received</TableCell>
            <TableCell>Person ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((college) => (
            <TableRow key={college.id}>
              <TableCell>{college.id}</TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={
                      editedCollege.collegeNameOfSchool ||
                      college.collegeNameOfSchool
                    }
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegeNameOfSchool: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegeNameOfSchool
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={editedCollege.collegeDegree || college.collegeDegree}
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegeDegree: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegeDegree
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={
                      editedCollege.collegePeriodFrom ||
                      college.collegePeriodFrom
                    }
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegePeriodFrom: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegePeriodFrom
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={
                      editedCollege.collegePeriodTo || college.collegePeriodTo
                    }
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegePeriodTo: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegePeriodTo
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={
                      editedCollege.collegeHighestAttained ||
                      college.collegeHighestAttained
                    }
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegeHighestAttained: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegeHighestAttained
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={
                      editedCollege.collegeYearGraduated ||
                      college.collegeYearGraduated
                    }
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegeYearGraduated: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegeYearGraduated
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={
                      editedCollege.collegeScholarshipAcademicHonorsReceived ||
                      college.collegeScholarshipAcademicHonorsReceived
                    }
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        collegeScholarshipAcademicHonorsReceived:
                          e.target.value,
                      })
                    }
                  />
                ) : (
                  college.collegeScholarshipAcademicHonorsReceived
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <TextField
                    value={editedCollege.person_id || college.person_id}
                    onChange={(e) =>
                      setEditedCollege({
                        ...editedCollege,
                        person_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  college.person_id
                )}
              </TableCell>
              <TableCell>
                {editingCollegeId === college.id ? (
                  <>
                    <Button
                      onClick={() => updateCollege(college.id)}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      style={{ width: '100px', backgroundColor: '#6c0b19' }} // Set the button color
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditingCollegeId(null)}
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      style={{
                        marginLeft: '-2px',
                        marginTop: '5px',
                        width: '100px',
                        backgroundColor: '#000000',
                        color: 'white',
                      }} // Set the button color
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setEditingCollegeId(college.id);
                        setEditedCollege(college); // Set the current college data for editing
                      }}
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      style={{ width: '100px', backgroundColor: '#6c0b19' }} // Set the button color
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteCollege(college.id)}
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      style={{
                        width: '100px',
                        marginLeft: '2px',
                        marginTop: '5px',
                        backgroundColor: '#000000',
                        color: 'white',
                      }}
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
    </Container>
  );
};


export default College;



