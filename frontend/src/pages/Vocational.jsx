import React, { useEffect, useState } from 'react';
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
import UploadIcon from '@mui/icons-material/Upload';
const Vocational = () => {
  const [vocationalData, setVocationalData] = useState([]);
  const [newVocational, setNewVocational] = useState({
    vocationalNameOfSchool: '',
    vocationalDegree: '',
    vocationalPeriodFrom: '',
    vocationalPeriodTo: '',
    vocationalHighestAttained: '',
    vocationalYearGraduated: '',
    person_id: '',
  });
  const [editVocationalId, setEditVocationalId] = useState(null); // Store only the ID of the record being edited


  useEffect(() => {
    fetchVocationalData();
  }, []);


  const fetchVocationalData = async () => {
    const response = await axios.get(
      'http://localhost:5000/vocational/vocational_table'
    );
    setVocationalData(response.data);
  };


  const addVocationalData = async () => {
    if (
      !newVocational.vocationalDegree ||
      !newVocational.vocationalHighestAttained ||
      !newVocational.vocationalNameOfSchool ||
      !newVocational.vocationalPeriodFrom ||
      !newVocational.vocationalPeriodTo ||
      !newVocational.vocationalYearGraduated ||
      !newVocational.person_id
    ) {
      console.log('All field are required');
      return;
    } else {
      await axios.post(
        'http://localhost:5000/vocational/vocational_table',
        newVocational
      );
    }
    setNewVocational({
      vocationalNameOfSchool: '',
      vocationalDegree: '',
      vocationalPeriodFrom: '',
      vocationalPeriodTo: '',
      vocationalHighestAttained: '',
      vocationalYearGraduated: '',
      person_id: '',
    });
    fetchVocationalData();
  };


  const updateVocationalData = async (id) => {
    const recordToUpdate = vocationalData.find((record) => record.id === id);
    await axios.put(
      `http://localhost:5000/vocational/vocational_table/${id}`,
      recordToUpdate
    );
    setEditVocationalId(null); // Exit edit mode
    fetchVocationalData();
  };


  const deleteVocationalData = async (id) => {
    await axios.delete(
      `http://localhost:5000/vocational/vocational_table/${id}`
    );
    fetchVocationalData();
  };


  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);


    try {
      const response = await axios.post(
        'http://localhost:5000/vocational/upload_vocational',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message);
      fetchVocationalData();
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('File upload failed');
    }
  };


  return (
    <Container>
      <h1 style={{ width: '90%' }}>Vocational Information</h1>


      {/* Add New Vocational Record */}
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="School"
              value={newVocational.vocationalNameOfSchool}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  vocationalNameOfSchool: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Degree"
              value={newVocational.vocationalDegree}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  vocationalDegree: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="From Year"
              value={newVocational.vocationalPeriodFrom}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  vocationalPeriodFrom: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="To Year"
              value={newVocational.vocationalPeriodTo}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  vocationalPeriodTo: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Highest Attained"
              value={newVocational.vocationalHighestAttained}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  vocationalHighestAttained: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year Graduated"
              value={newVocational.vocationalYearGraduated}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  vocationalYearGraduated: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Person ID"
              value={newVocational.person_id}
              onChange={(e) =>
                setNewVocational({
                  ...newVocational,
                  person_id: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={addVocationalData}
              sx={{
                width: '100px',
                backgroundColor: '#6c0b19',
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={8.85}>
            <Button
              style={{
                backgroundColor: '#6c0b19',
                color: 'white',
                marginLeft: '10px',
              }}
              onClick={handleFileUpload}
              variant="contained"
              color="primary"
              startIcon={<UploadIcon />}
            >
              Upload
            </Button>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ display: 'flex', alignItems: 'center', marginTop: '6px' }}
          >
            <input type="file" onChange={handleFileChange} />
          </Grid>
        </Grid>
      </Paper>


      {/* Vocational Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>School</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Highest Attained</TableCell>
            <TableCell>Year Graduated</TableCell>
            <TableCell>Person ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vocationalData.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    value={record.vocationalNameOfSchool}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        vocationalNameOfSchool: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.vocationalNameOfSchool
                )}
              </TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    value={record.vocationalDegree}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        vocationalDegree: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.vocationalDegree
                )}
              </TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    type="number"
                    value={record.vocationalPeriodFrom}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        vocationalPeriodFrom: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.vocationalPeriodFrom
                )}
              </TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    type="number"
                    value={record.vocationalPeriodTo}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        vocationalPeriodTo: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.vocationalPeriodTo
                )}
              </TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    value={record.vocationalHighestAttained}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        vocationalHighestAttained: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.vocationalHighestAttained
                )}
              </TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    type="number"
                    value={record.vocationalYearGraduated}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        vocationalYearGraduated: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.vocationalYearGraduated
                )}
              </TableCell>
              <TableCell>
                {editVocationalId === record.id ? (
                  <TextField
                    type="number"
                    value={record.person_id}
                    onChange={(e) => {
                      const updatedRecord = {
                        ...record,
                        person_id: e.target.value,
                      };
                      setVocationalData((prevData) =>
                        prevData.map((rec) =>
                          rec.id === record.id ? updatedRecord : rec
                        )
                      );
                    }}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  record.person_id
                )}
              </TableCell>


              <TableCell>
                {editVocationalId === record.id ? (
                  <>
                    <Button
                      onClick={() => updateVocationalData(record.id)}
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: '#6c0b19' }}
                      startIcon={<SaveIcon />}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setEditVocationalId(null)}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        backgroundColor: '#000000',
                        color: 'white',
                        marginTop: '5px',
                      }}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditVocationalId(record.id)}
                      variant="outlined"
                      color="primary"
                      sx={{
                        backgroundColor: '#6c0b19',
                        color: 'white',
                        width: '100px',
                        marginRight: '5px',
                      }}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteVocationalData(record.id)}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        backgroundColor: '#000000',
                        color: 'white',
                        width: '100px',
                      }}
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


export default Vocational;





