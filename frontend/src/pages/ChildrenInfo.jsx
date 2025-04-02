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


const ChildrenInfo = () => {
  // State for children data
  const [children, setChildren] = useState([]);


  // State for new child entry
  const [newChild, setNewChild] = useState({
    childrenFirstName: '',
    childrenMiddleName: '',
    childrenLastName: '',
    childrenNameExtension: '',
    dateOfBirth: '',
    person_id: '',
  });


  // State for editing child ID
  const [editingChildId, setEditingChildId] = useState(null);
  const [editedChild, setEditedChild] = useState({});


  // Fetch children on component mount
  useEffect(() => {
    fetchChildren();
  }, []);


  // Fetch children data
  const fetchChildren = async () => {
    const response = await axios.get(
      'http://localhost:5000/childrenAPI/children_table'
    );
    setChildren(response.data);
  };


  // Add new child
  const addChild = async () => {
    await axios.post(
      'http://localhost:5000/childrenAPI/children_table',
      newChild
    );
    resetNewChild();
    fetchChildren();
  };


  // Update child
  const updateChild = async (id) => {
    await axios.put(
      `http://localhost:5000/childrenAPI/children_table/${id}`,
      editedChild
    );
    setEditingChildId(null);
    fetchChildren();
  };


  // Delete child
  const deleteChild = async (id) => {
    await axios.delete(
      `http://localhost:5000/childrenAPI/children_table/${id}`
    );
    fetchChildren();
  };


  // Reset new child form
  const resetNewChild = () => {
    setNewChild({
      childrenFirstName: '',
      childrenMiddleName: '',
      childrenLastName: '',
      childrenNameExtension: '',
      dateOfBirth: '',
      person_id: '',
    });
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Children Information
      </Typography>


      {/* Add New Child */}
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={newChild.childrenFirstName}
              onChange={(e) =>
                setNewChild({ ...newChild, childrenFirstName: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Middle Name"
              value={newChild.childrenMiddleName}
              onChange={(e) =>
                setNewChild({ ...newChild, childrenMiddleName: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={newChild.childrenLastName}
              onChange={(e) =>
                setNewChild({ ...newChild, childrenLastName: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name Extension"
              value={newChild.childrenNameExtension}
              onChange={(e) =>
                setNewChild({
                  ...newChild,
                  childrenNameExtension: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Date Of Birth"
              InputLabelProps={{ shrink: true }}
              value={newChild.dateOfBirth}
              onChange={(e) =>
                setNewChild({ ...newChild, dateOfBirth: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Person ID"
              value={newChild.person_id}
              onChange={(e) =>
                setNewChild({ ...newChild, person_id: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={addChild}
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: '#6c0b19' }} // Set the button color
            >
              Add Child
            </Button>
          </Grid>
        </Grid>
      </Paper>


      {/* Children Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Name Extension</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Person ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children.map((child) => (
            <TableRow key={child.id}>
              <TableCell>{child.id}</TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <TextField
                    value={
                      editedChild.childrenFirstName || child.childrenFirstName
                    }
                    onChange={(e) =>
                      setEditedChild({
                        ...editedChild,
                        childrenFirstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  child.childrenFirstName
                )}
              </TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <TextField
                    value={
                      editedChild.childrenMiddleName || child.childrenMiddleName
                    }
                    onChange={(e) =>
                      setEditedChild({
                        ...editedChild,
                        childrenMiddleName: e.target.value,
                      })
                    }
                  />
                ) : (
                  child.childrenMiddleName
                )}
              </TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <TextField
                    value={
                      editedChild.childrenLastName || child.childrenLastName
                    }
                    onChange={(e) =>
                      setEditedChild({
                        ...editedChild,
                        childrenLastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  child.childrenLastName
                )}
              </TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <TextField
                    value={
                      editedChild.childrenNameExtension ||
                      child.childrenNameExtension
                    }
                    onChange={(e) =>
                      setEditedChild({
                        ...editedChild,
                        childrenNameExtension: e.target.value,
                      })
                    }
                  />
                ) : (
                  child.childrenNameExtension
                )}
              </TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <TextField
                    type="date"
                    value={editedChild.dateOfBirth || child.dateOfBirth}
                    onChange={(e) =>
                      setEditedChild({
                        ...editedChild,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                ) : (
                  child.dateOfBirth
                )}
              </TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <TextField
                    value={editedChild.person_id || child.person_id}
                    onChange={(e) =>
                      setEditedChild({
                        ...editedChild,
                        person_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  child.person_id
                )}
              </TableCell>
              <TableCell>
                {editingChildId === child.id ? (
                  <>
                    <Button
                      onClick={() => updateChild(child.id)}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      style={{ width: '100px', backgroundColor: '#6c0b19' }} // Set a fixed width
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditingChildId(null)}
                      variant="outlined"
                      color="error"
                      style={{
                        width: '100px',
                        marginTop: '5px',
                        color: 'white',
                        backgroundColor: '#000000',
                      }} // Set the same fixed width
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setEditingChildId(child.id);
                        setEditedChild(child); // Set the current child data for editing
                      }}
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      style={{ width: '100px', backgroundColor: '#6c0b19' }} // Set a fixed width
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteChild(child.id)}
                      variant="outlined"
                      color="error"
                      style={{
                        width: '100px',
                        margin: 'auto',
                        marginLeft: '2px',
                        color: 'white',
                        backgroundColor: '#000000',
                      }} // Set the same fixed width
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
    </Container>
  );
};


export default ChildrenInfo;





