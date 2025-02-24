import React, { useState } from "react";
import axios from "axios";

import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
const OfficialTimeForm = () => {
  const [employeeID, setemployeeID] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);

  const defaultRecords = [
    {
      employeeID: employeeID,
      day: "Monday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
    {
      employeeID: employeeID,
      day: "Tuesday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
    {
      employeeID: employeeID,
      day: "Wednesday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
    {
      employeeID: employeeID,
      day: "Thursday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
    {
      employeeID: employeeID,
      day: "Friday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
    {
      employeeID: employeeID,
      day: "Saturday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
    {
      employeeID: employeeID,
      day: "Sunday",
      officialTimeIN: "00:00:00 AM",
      officialBreaktimeIN: "00:00:00 AM",
      officialBreaktimeOUT: "00:00:00 AM",
      officialTimeOUT: "00:00:00 AM",
      officialHonorariumTimeIN: "00:00:00 AM",
      officialHonorariumTimeOUT: "00:00:00 AM",
      officialServiceCreditTimeIN: "00:00:00 AM",
      officialServiceCreditTimeOUT: "00:00:00 AM",
      officialOverTimeIN: "00:00:00 AM",
      officialOverTimeOUT: "00:00:00 AM",
      breaktime: "",
    },
  ];

  const handleSearch = () => {
    if (!employeeID) {
      alert("Please enter a Employee ID.");
      return;
    }
    setLoading(true);

    axios
      .get(`http://localhost:5000/officialtimetable/${employeeID}`)
      .then((res) => {
        setLoading(false);
        if (res.data.length > 0) {
          setRecords(res.data);
          setFound(true);
        } else {
          setRecords(defaultRecords);
          setFound(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching data:", err);
        alert("Error fetching records.");
      });
  };

  const handleChange = (index, field, value) => {
    const updatedRecords = [...records];
    updatedRecords[index][field] = value;
    setRecords(updatedRecords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeID) {
      alert("Please enter a valid Employee ID.");
      return;
    }
    axios
      .post("http://localhost:5000/officialtimetable", {
        employeeID: employeeID,
        records,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => console.error("Error saving data:", err));
  };

  return (
    <div>
      <h2>Official Time Schedule</h2>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <TextField label="Employee ID" variant="outlined" size="small" value={employeeID} onChange={(e) => setemployeeID(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {records.length > 0 && (
        <form onSubmit={handleSubmit}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "100px", minWidth: "100px" }}>Employee UID</TableCell>
                  <TableCell sx={{ width: "100px", minWidth: "100px" }}>Day</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Time In</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Break In</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Break Out</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Time Out</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Honorarium Time In</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Honorarium Time Out</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Service Credit Time In</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Service Credit Time Out</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Over-Time In</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px" }}>Over-Time Out</TableCell>
                  <TableCell sx={{ width: "125px", minWidth: "125px", display: "none" }}>Breaktime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.employeeID} InputProps={{ readOnly: true }} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.day} InputProps={{ readOnly: true }} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialTimeIN} onChange={(e) => handleChange(index, "officialTimeIN", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialBreaktimeIN} onChange={(e) => handleChange(index, "officialBreaktimeIN", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialBreaktimeOUT} onChange={(e) => handleChange(index, "officialBreaktimeOUT", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialTimeOUT} onChange={(e) => handleChange(index, "officialTimeOUT", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialHonorariumTimeIN} onChange={(e) => handleChange(index, "officialHonorariumTimeIN", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialHonorariumTimeOUT} onChange={(e) => handleChange(index, "officialHonorariumTimeOUT", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialServiceCreditTimeIN} onChange={(e) => handleChange(index, "officialServiceCreditTimeIN", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialServiceCreditTimeOUT} onChange={(e) => handleChange(index, "officialServiceCreditTimeOUT", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialOverTimeIN} onChange={(e) => handleChange(index, "officialOverTimeIN", e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" size="small" value={record.officialOverTimeOUT} onChange={(e) => handleChange(index, "officialOverTimeOUT", e.target.value)} />
                    </TableCell>
                    <TableCell sx={{ display: "none" }}>
                      <TextField variant="outlined" size="small" value={record.breaktime || ""} onChange={(e) => handleChange(index, "breaktime", e.target.value)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {found ? "Update" : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default OfficialTimeForm;
