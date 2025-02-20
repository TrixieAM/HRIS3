import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const OverallAttendancePage = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [editRecord, setEditRecord] = useState([]);

  const fetchAttendanceData = async () => {
    console.log("Sending request with params: ", {
      personID: employeeNumber,
      startDate,
      endDate,
    });

    try {
      const response = await axios.get("http://localhost:5000/attendance/api/overall_attendance_record", {
        params: {
          personID: employeeNumber, 
          startDate,
          endDate,
        },
      });

      if (response.status === 200) {
        setAttendanceData(response.data.data);
      } else {
        console.error("Error: ", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching attendance data.");
    }
  };

  const updateRecord = async () => {
    if (!editRecord || !editRecord.totalRenderedTimeMorning) return;
        await axios.put(`http://localhost:5000/attendance/api/overall_attendance_record/${editRecord.id}`, editRecord);
        setEditRecord(null);
        fetchAttendanceData();
        alert("Record was updated Successfully");
  };

  const deleteRecord = async (id) => {
    await axios.delete(`http://localhost:5000/attendance/api/overall_attendance_record/${id}`);
    fetchAttendanceData();
    alert("The Data was Successfully Deleted");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Overall Attendance Records
      </Typography>

      {/* Input Fields */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Employee Number"
          variant="outlined"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          fullWidth
        />
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
        />
        <TextField
          label="End Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Fetch Button */}
      <Button variant="contained" color="primary" onClick={fetchAttendanceData}>
        Fetch Attendance Records
      </Button>

      {/* Table to Display Data */}
      <Paper sx={{ marginTop: 3, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{textAlign: 'center'}}><b>ID</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Employee Number</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Start Date</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>End Date</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Morning Hours</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Morning Tardiness</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Afternoon Hours</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Afternoon Tardiness</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Honorarium</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Honorarium Tardiness</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Service Credit</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Service Credit Tardiness</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Overtime</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Overtime Tardiness</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Overall Time</b></TableCell>
              <TableCell style={{textAlign: 'center'}}><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((record, index) => (
              <TableRow key={index}>
                <TableCell style={{textAlign: 'center'}}>
                  {record.id}
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.personID}
                      onChange={(e) => setEditRecord({ ...editRecord, personID: e.target.value })}
                    />
                    
                  ):(
                    record.personID
                  )}  
                </TableCell>
                <TableCell>
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.startDate}
                      onChange={(e) => setEditRecord({ ...editRecord, startDate: e.target.value })}
                    />
                    
                  ):(
                    record.startDate
                  )}
                </TableCell>
                <TableCell>
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.endDate}
                      onChange={(e) => setEditRecord({ ...editRecord, endDate: e.target.value })}
                    />
                    
                  ):(
                    record.endDate
                  )}
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalRenderedTimeMorning}
                      onChange={(e) => setEditRecord({ ...editRecord, totalRenderedTimeMorning: e.target.value })}
                    />
                    
                  ):(
                    record.totalRenderedTimeMorning
                  )}
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalTardAM}
                      onChange={(e) => setEditRecord({ ...editRecord, totalTardAM: e.target.value })}
                    />
                    
                  ):(
                    record.totalTardAM
                  )}
                </TableCell>

                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalRenderedTimeAfternoon}
                      onChange={(e) => setEditRecord({ ...editRecord, totalRenderedTimeAfternoon: e.target.value })}
                    />
                    
                  ):(
                    record.totalRenderedTimeAfternoon
                  )}
                
                </TableCell>

                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalTardPM}
                      onChange={(e) => setEditRecord({ ...editRecord, totalTardPM: e.target.value })}
                    />
                    
                  ):(
                    record.totalTardPM
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalRenderedHonorarium}
                      onChange={(e) => setEditRecord({ ...editRecord, totalRenderedHonorarium: e.target.value })}
                    />
                    
                  ):(
                    record.totalRenderedHonorarium
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.TotalTardHR}
                      onChange={(e) => setEditRecord({ ...editRecord, TotalTardHR: e.target.value })}
                    />
                    
                  ):(
                    record.TotalTardHR
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalRenderedServiceCredit}
                      onChange={(e) => setEditRecord({ ...editRecord, totalRenderedServiceCredit: e.target.value })}
                    />
                    
                  ):(
                    record.totalRenderedServiceCredit
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalTardSC}
                      onChange={(e) => setEditRecord({ ...editRecord, totalTardSC: e.target.value })}
                    />
                    
                  ):(
                    record.totalTardSC
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalRenderedOvertime}
                      onChange={(e) => setEditRecord({ ...editRecord, totalRenderedOvertime: e.target.value })}
                    />
                    
                  ):(
                    record.totalRenderedOvertime
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.totalTardOT}
                      onChange={(e) => setEditRecord({ ...editRecord, totalTardOT: e.target.value })}
                    />
                    
                  ):(
                    record.totalTardOT
                  )}
                
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                  
                  {editRecord && editRecord.id === record.id ? (
                    <TextField
                      value={editRecord.overallRenderedTime}
                      onChange={(e) => setEditRecord({ ...editRecord, overallRenderedTime: e.target.value })}
                    />
                    
                  ):(
                    record.overallRenderedTime
                  )}
                
                </TableCell>
                <TableCell>
                  {editRecord && editRecord.id === record.id ? (
                    <>
                        <Button onClick={updateRecord} variant="contained" color="success">Save</Button>
                        <Button onClick={() => setEditRecord(null)} variant="contained" color="secondary">Cancel</Button>
                    </>
                  ) : (
                    <>
                        <Button onClick={() => setEditRecord(record)} variant="contained" color="primary">Edit</Button>
                        <Button onClick={() => deleteRecord(record.id)} variant="contained" color="error">Delete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* No Data Message */}
      {attendanceData.length === 0 && (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
          No records found for the given criteria.
        </Typography>
      )}
    </Box>
  );
};

export default OverallAttendancePage;
