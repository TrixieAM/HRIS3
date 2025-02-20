import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const Eligibility = () => {
  const [data, setData] = useState([]); // To hold eligibility data
  const [newEligibility, setNewEligibility] = useState({
    eligibilityName: "",
    eligibilityRating: "",
    eligibilityDateOfExam: "",
    eligibilityPlaceOfExam: "",
    licenseNumber: "",
    DateOfValidity: "",
    person_id: ""
  }); // To hold input for new eligibility
  const [editEligibility, setEditEligibility] = useState(null); // To hold eligibility being edited

  // Fetch all eligibility records on component mount
  useEffect(() => {
    fetchEligibility();
  }, []);

  const fetchEligibility = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/eligibilityRoute/eligibility"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching eligibility:", error);
    }
  };

  // Add new eligibility
  const addEligibility = async () => {
    try {
      if (
        !newEligibility.eligibilityName ||
        !newEligibility.eligibilityRating ||
        !newEligibility.eligibilityDateOfExam ||
        !newEligibility.eligibilityPlaceOfExam ||
        !newEligibility.licenseNumber ||
        !newEligibility.DateOfValidity ||
        !newEligibility.person_id
      ) {
        alert("All field are required");
        return;
      } else {
        await axios.post(
          "http://localhost:5000/eligibilityRoute/eligibility",
          newEligibility
        );
      }
      setNewEligibility({
        eligibilityName: "",
        eligibilityRating: "",
        eligibilityDateOfExam: "",
        eligibilityPlaceOfExam: "",
        licenseNumber: "",
        DateOfValidity: "",
        person_id: "",
      }); 
      fetchEligibility();
    } catch (error) {
      console.error("Error adding eligibility:", error);
    }
  };

  // Update eligibility
  const updateEligibility = async () => {
    if (!editEligibility) return;
    try {
      await axios.put(
        `http://localhost:5000/eligibilityRoute/eligibility/${editEligibility.id}`,
        editEligibility
      );
      setEditEligibility(null); // Clear edit mode after saving
      fetchEligibility(); // Refresh the data
    } catch (error) {
      console.error("Error updating eligibility:", error);
    }
  };
  // Delete eligibility
  const deleteEligibility = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/eligibilityRoute/eligibility/${id}`
      );
      fetchEligibility();
    } catch (error) {
      console.error("Error deleting eligibility:", error);
    }
  };

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/eligibilityRoute/upload_eligibility",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchEligibility();
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("File upload failed");
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: "bold", marginTop: "20px" }}
      >
        Eligibility
      </Typography>

      {/* Add New Eligibility */}
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          {Object.keys(newEligibility).map((key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={newEligibility[key]}
                onChange={(e) =>
                  setNewEligibility({
                    ...newEligibility,
                    [key]: e.target.value,
                  })
                }
                type={key.includes("Date") ? "date" : "text"}
                InputLabelProps={key.includes("Date") ? { shrink: true } : {}}
                fullWidth
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            <Box>
              <Button
                onClick={addEligibility}
                variant="contained"
                color="primary"
                sx={{ margin: 2 }}
              >
                Add
              </Button>
              <Button
                style={{
                  padding: "10px 20px",
                  height: "37px",
                  fontSize: "14px",
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleFileUpload}
              >
                UPLOAD
              </Button>
            </Box>
            <Box sx={{ position: "absolute", right: "0", marginRight: "-7%" }}>
              <input type="file" onChange={handleFileChange} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Eligibility Table */}
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Eligibility Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Date of Exam</TableCell>
              <TableCell>Place of Exam</TableCell>
              <TableCell>License Number</TableCell>
              <TableCell>Date of Validity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((eligibility) => (
              <TableRow key={eligibility.id}>
                <TableCell>{eligibility.id}</TableCell>
                {Object.keys(eligibility)
                  .slice(1, -1)
                  .map((key) => (
                    <TableCell key={key}>
                      {editEligibility &&
                      editEligibility.id === eligibility.id ? (
                        <TextField
                          value={editEligibility[key]}
                          onChange={(e) =>
                            setEditEligibility({
                              ...editEligibility,
                              [key]: e.target.value,
                            })
                          }
                          type={key.includes("Date") ? "date" : "text"}
                          InputLabelProps={
                            key.includes("Date") ? { shrink: true } : {}
                          }
                          fullWidth
                        />
                      ) : (
                        eligibility[key]
                      )}
                    </TableCell>
                  ))}
                <TableCell>
                  {editEligibility && editEligibility.id === eligibility.id ? (
                    <>
                      <Button
                        onClick={updateEligibility}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditEligibility(null)}
                        variant="outlined"
                        color="secondary"
                        style={{ marginLeft: "10px" }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setEditEligibility(eligibility)}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteEligibility(eligibility.id)}
                        variant="contained"
                        style={{
                          backgroundColor: "#e57373",
                          color: "white",
                          marginLeft: "10px",
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
      </Paper>
    </Container>
  );
};

export default Eligibility;
