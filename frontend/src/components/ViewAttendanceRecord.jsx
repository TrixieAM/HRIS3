import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const formatTime = (time) => {
  if (!time) return "N/A";

  // Check if time already includes AM or PM
  if (time.includes("AM") || time.includes("PM")) {
    // Ensure proper formatting with padded hour
    const [hour, minute, second] = time.split(/[: ]/); // Split by ':' or space
    const paddedHour = hour.padStart(2, "0"); // Pad hour if necessary
    return `${paddedHour}:${minute}:${second} ${time.slice(-2)}`;
  }

  const [hour, minute, second] = time.split(":");
  const hour24 = parseInt(hour, 10);
  const hour12 = hour24 % 12 || 12; // Convert to 12-hour format
  const ampm = hour24 < 12 ? "AM" : "PM";
  return `${String(hour12).padStart(2, "0")}:${minute}:${second} ${ampm}`;
};

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const ViewAttendanceRecord = () => {
  const [personID, setPersonID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([]);
  const [personName, setPersonName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/attendance/api/all-attendance", { personID, startDate, endDate });
      setRecords(response.data);

      if (response.data.length > 0) {
        setPersonName(response.data[0].PersonName);
      } else {
        setPersonName("");
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  // const handleSaveRecords = async () => {
  //   try {
  //     const formattedRecords = records.map(record => ({
  //       personID: record.PersonID,
  //       date: record.Date,
  //       Day: getDayOfWeek(record.Date),
  //       timeIN: record.Time1 || null,
  //       breaktimeIN: record.Time2 || null,
  //       breaktimeOUT: record.Time3 || null,
  //       timeOUT: record.Time4 || null
  //     }));

  //     const response = await axios.post('http://localhost:5000/api/save-attendance', { records: formattedRecords });

  //     const savedMessages = response.data.map(result =>
  //       result.status === 'exists'
  //         ? `Record for ${result.personID} on ${result.date} already exists.`
  //         : `Record for ${result.personID} on ${result.date} saved successfully.`
  //     );

  //     alert(savedMessages.join('\n'));
  //   } catch (error) {
  //     console.error('Error saving attendance records:', error);
  //   }
  // };
  const handleSaveRecords = async () => {
    try {
      const formattedRecords = records.map((record) => ({
        personID: record.PersonID,
        date: record.Date,
        Day: getDayOfWeek(record.Date),
        timeIN: record.Time1 ? formatTime(record.Time1) : null,
        breaktimeIN: record.Time2 ? formatTime(record.Time2) : null,
        breaktimeOUT: record.Time3 ? formatTime(record.Time3) : null,
        timeOUT: record.Time4 ? formatTime(record.Time4) : null,
      }));

      const response = await axios.post("http://localhost:5000/attendance/api/save-attendance", { records: formattedRecords });

      const savedMessages = response.data.map((result) => (result.status === "exists" ? `Record for ${result.personID} on ${result.date} already exists.` : `Record for ${result.personID} on ${result.date} saved successfully.`));

      alert(savedMessages.join("\n"));
    } catch (error) {
      console.error("Error saving attendance records:", error);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
       <h2>Attendance Record</h2>
      {personName && (
        <Typography variant="h4" gutterBottom>
          Device Record for {personName}
        </Typography>
      )}
      <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
        <TextField
          label="Enter Person ID"
          value={personID}
          onChange={(e) => setPersonID(e.target.value)}
          required
          fullWidth
          margin="normal"
          sx={{ width: "300px", marginLeft: "10px" }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          sx={{ width: "300px", marginLeft: "10px" }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          sx={{ width: "300px", marginLeft: "10px" }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: "200px",
            height: "54px",
            marginLeft: "10px",
            marginTop: "16px",
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        >
          Search Record
        </Button>
      </form>

      {records.length > 0 && (
        <TableContainer component={Paper} style={{ marginBottom: "5%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PersonID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Time (State 1)</TableCell>
                <TableCell>Time (State 2)</TableCell>
                <TableCell>Time (State 3)</TableCell>
                <TableCell>Time (State 4)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.PersonID}</TableCell>
                  <TableCell>{record.Date}</TableCell>
                  <TableCell>{getDayOfWeek(record.Date)}</TableCell>
                  <TableCell>{formatTime(record.Time1)}</TableCell>
                  <TableCell>{formatTime(record.Time2)}</TableCell>
                  <TableCell>{formatTime(record.Time3)}</TableCell>
                  <TableCell>{formatTime(record.Time4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" color="secondary" onClick={handleSaveRecords} style={{ marginTop: "16px" }}>
            Save Records
          </Button>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewAttendanceRecord;
