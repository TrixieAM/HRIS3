import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Paper, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Container } from '@mui/material';

const College = () => {
    const [data, setData] = useState([]);
    const [newCollege, setNewCollege] = useState({});
    const [editCollege, setEditCollege] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch all college entries on component mount
    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            const response = await axios.get('http://localhost:5000/college/college_table');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    // Add new college entry
    const addCollege = async () => {
        if (!newCollege.collegeNameOfSchool) return;
        await axios.post('http://localhost:5000/college/college_table', newCollege);
        setNewCollege({});
        fetchColleges();
    };

    // Update college entry
    const updateCollege = async () => {
        if (!editCollege || !editCollege.collegeNameOfSchool) return;
        await axios.put(`http://localhost:5000/college/college_table/${editCollege.id}`, editCollege);
        setEditCollege(null);
        fetchColleges();
    };

    // Delete college entry
    const deleteCollege = async (id) => {
        await axios.delete(`http://localhost:5000/college/college_table/${id}`);
        fetchColleges();
    };

    // Handle file selection for upload
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/college/upload_college_table', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchColleges();
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('File upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <h1 style={{width: '90%'}}>College Information</h1>
            </div>
            {/* Add New Item */}
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '20px' }}>
                <Grid container spacing={{ xs: 3, md: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="College Name"
                            value={newCollege.collegeNameOfSchool || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegeNameOfSchool: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Degree"
                            value={newCollege.collegeDegree || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegeDegree: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Period From"
                            placeholder='(YYYY) 2024, 2033...'
                            value={newCollege.collegePeriodFrom || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegePeriodFrom: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Period To"
                            placeholder='(YYYY) 2024, 2033...'
                            value={newCollege.collegePeriodTo || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegePeriodTo: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Highest Attained"
                            value={newCollege.collegeHighestAttained || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegeHighestAttained: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Year Graduated"
                            placeholder='(YYYY) 2024, 2033...'
                            value={newCollege.collegeYearGraduated || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegeYearGraduated: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Honors Received"
                            value={newCollege.collegeScholarshipAcademicHonorsReceived || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, collegeScholarshipAcademicHonorsReceived: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            sx={{width: '100%'}}
                            label="Person ID"
                            value={newCollege.person_id || ''}
                            onChange={(e) => setNewCollege({ ...newCollege, person_id: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button sx={{width: '100%'}} onClick={addCollege} variant="contained" color="primary">Add</Button>
                    </Grid>
                    <Grid item xs={8.85}>
                        <Button  onClick={handleFileUpload} style={{backgroundColor: 'green'}} variant="contained" color="primary">Upload</Button>
                    </Grid>
                    <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', marginTop: '6px'}}>
                        <input type="file" onChange={handleFileChange} />
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
                    {data.map(college => (
                        <TableRow key={college.id}>
                            <TableCell>{college.id}</TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegeNameOfSchool}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegeNameOfSchool: e.target.value })}
                                    />
                                ) : (
                                    college.collegeNameOfSchool
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegeDegree}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegeDegree: e.target.value })}
                                    />
                                ) : (
                                    college.collegeDegree
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegePeriodFrom}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegePeriodFrom: e.target.value })}
                                    />
                                ) : (
                                    college.collegePeriodFrom
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegePeriodTo}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegePeriodTo: e.target.value })}
                                    />
                                ) : (
                                    college.collegePeriodTo
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegeHighestAttained}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegeHighestAttained: e.target.value })}
                                    />
                                ) : (
                                    college.collegeHighestAttained
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegeYearGraduated}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegeYearGraduated: e.target.value })}
                                    />
                                ) : (
                                    college.collegeYearGraduated
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.collegeScholarshipAcademicHonorsReceived}
                                        onChange={(e) => setEditCollege({ ...editCollege, collegeScholarshipAcademicHonorsReceived: e.target.value })}
                                    />
                                ) : (
                                    college.collegeScholarshipAcademicHonorsReceived
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <TextField
                                        value={editCollege.person_id}
                                        onChange={(e) => setEditCollege({ ...editCollege, person_id: e.target.value })}
                                    />
                                ) : (
                                    college.person_id
                                )}
                            </TableCell>
                            <TableCell>
                                {editCollege && editCollege.id === college.id ? (
                                    <>
                                        <Button onClick={updateCollege} variant="contained" color="success">Save</Button>
                                        <Button onClick={() => setEditCollege(null)} variant="contained" color="secondary">Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => setEditCollege(college)} variant="contained" color="primary">Edit</Button>
                                        <Button onClick={() => deleteCollege(college.id)} variant="contained" color="error">Delete</Button>
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