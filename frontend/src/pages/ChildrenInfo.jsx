import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';








const ChildrenInfo = () => {
  const [children, setChildren] = useState([]);
  const [newChild, setNewChild] = useState({
    childrenFirstName: '',
    childrenMiddleName: '',
    childrenLastName: '',
    childrenNameExtension: '',
    dateOfBirth: '',
    person_id: ''
  });
  const [editingChildId, setEditingChildId] = useState(null);








  useEffect(() => {
    fetchChildren();
  }, []);








  const fetchChildren = async () => {
    try {
      const result = await axios.get('http://localhost:5000/childrenAPI/children_table');
      setChildren(result.data);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };








  const addOrUpdateChild = async () => {
    try {
      if (editingChildId) {
        await axios.put(`http://localhost:5000/childrenAPI/children_table/${editingChildId}`, newChild);
      } else {
        await axios.post('http://localhost:5000/childrenAPI/children_table', newChild);
      }
      setEditingChildId(null);
      fetchChildren();
      resetNewChild();
    } catch (error) {
      console.error('Failed to add or update child:', error);
    }
  };








  const deleteChild = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/childrenAPI/children_table/${id}`);
      fetchChildren();
    } catch (error) {
      console.error('Error deleting child:', error);
    }
  };








  const resetNewChild = () => {
    setNewChild({
      childrenFirstName: '',
      childrenMiddleName: '',
      childrenLastName: '',
      childrenNameExtension: '',
      dateOfBirth: '',
      person_id: ''
    });
    setEditingChildId(null); // Reset editing mode
  };








  return (
    <Container style={{ marginTop: '20px'}}>
      <h1>Children Dashboard</h1>

      {/* Add New Child Form */}
      <div style={{ marginBottom: '20px' }}>
        <h3>{editingChildId ? 'Edit Child' : 'Add New Child'}</h3>
        <TextField
          label="First Name"
          value={newChild.childrenFirstName}
          onChange={(e) => setNewChild({ ...newChild, childrenFirstName: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          label="Middle Name"
          value={newChild.childrenMiddleName}
          onChange={(e) => setNewChild({ ...newChild, childrenMiddleName: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          label="Last Name"
          value={newChild.childrenLastName}
          onChange={(e) => setNewChild({ ...newChild, childrenLastName: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          label="Name Extension"
          value={newChild.childrenNameExtension}
          onChange={(e) => setNewChild({ ...newChild, childrenNameExtension: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          type="text"
          label="Date of Birth (Y-M-D)"
          value={newChild.dateOfBirth}
          onChange={(e) => setNewChild({ ...newChild, dateOfBirth: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <TextField
          label="Person ID"
          value={newChild.person_id}
          onChange={(e) => setNewChild({ ...newChild, person_id: e.target.value })}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        />
        <Button
          onClick={addOrUpdateChild}
          variant="contained"
          style={{ backgroundColor: editingChildId ? '#00072D' : '#00072D', color: 'white' }}
          startIcon={editingChildId ? <SaveIcon /> : <AddIcon />}
        >
          {editingChildId ? 'Update Child' : 'Add Child'}
        </Button>
        {editingChildId && (
          <Button
            onClick={resetNewChild}
            variant="contained"
            style={{ backgroundColor: '#800000', color: 'white', marginLeft: '10px' }}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        )}
      </div>








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
              <TableCell>{child.childrenFirstName}</TableCell>
              <TableCell>{child.childrenMiddleName}</TableCell>
              <TableCell>{child.childrenLastName}</TableCell>
              <TableCell>{child.childrenNameExtension}</TableCell>
              <TableCell>{child.dateOfBirth ? child.dateOfBirth.split('T')[0] : ''}</TableCell>
              <TableCell>{child.person_id}</TableCell>
              <TableCell>
              <Button
             onClick={() => {
                    setNewChild({
                      ...child,
                      dateOfBirth: child.dateOfBirth ? child.dateOfBirth.split('T')[0] : ''
                    });
                    setEditingChildId(child.id);
                  }}
                  variant="contained"
                  style={{ backgroundColor: '#00072D', color: 'white', marginRight: '10px' }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteChild(child.id)}
                  variant="contained"
                  style={{ backgroundColor: '#800000', color: 'white' }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};








export default ChildrenInfo;



