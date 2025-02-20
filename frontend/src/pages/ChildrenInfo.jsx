import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";

const ChildrenInfo = () => {
  // State for children and employees data
  const [children, setChildren] = useState([]);

  // State for new child entry
  const [newChild, setNewChild] = useState({
    childrenFirstName: "",
    childrenMiddleName: "",
    childrenLastName: "",
    childrenNameExtension: "",
    dateOfBirth: "",
    person_id: "",
  });

  // State for editing child and employee IDs
  const [editingChildId, setEditingChildId] = useState(null);

  // Fetch children and employees on component mount
  useEffect(() => {
    fetchChildren();
  }, []);

  // Fetch functions
  const fetchChildren = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/childrenAPI/children_table"
      );
      setChildren(result.data);
    } catch (error) {
      console.error("Error fetching children:", error);
      // Removed the alert
    }
  };
  // Add and update functions
  const addOrUpdateChild = async () => {
    try {
      if (editingChildId) {
        // Update child

        await axios.put(
          `http://localhost:5000/childrenAPI/children_table/${editingChildId}`,
          newChild
        );
      } else {
        if (!newChild.childrenFirstName) return;
        await axios.post(
          "http://localhost:5000/childrenAPI/children_table",
          newChild
        );
      }
      setEditingChildId(null);
      fetchChildren();
      resetNewChild();
    } catch (error) {
      console.error("Failed to add or update child:", error);
      // Removed the alert
    }
  };

  // Delete functions
  const deleteChild = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/childrenAPI/children_table/${id}`
      );
      fetchChildren();
    } catch (error) {
      console.error("Error deleting child:", error);
      // Removed the alert
    }
  };

  // Reset form inputs
  const resetNewChild = () => {
    setNewChild({
      childrenFirstName: "",
      childrenMiddleName: "",
      childrenLastName: "",
      childrenNameExtension: "",
      dateOfBirth: "",
      person_id: "",
    });
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
        "http://localhost:5000/childrenAPI/upload_children_table",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchChildren();
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("File upload failed");
    }
  };

  // const resetNewEmployee = () => {
  //   setNewEmployee({ person_id: '' });
  // };

  // JSX for the dashboard
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ width: "90%" }}>Children Information</h1>
        <input type="file" onChange={handleFileChange} />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            border: "none",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleFileUpload}
        >
          UPLOAD
        </button>
      </div>
      {/* Children Section */}

      <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
        <TextField
          label="First Name"
          value={newChild.childrenFirstName || ""}
          sx={{ marginRight: 2 }}
          onChange={(e) =>
            setNewChild({ ...newChild, childrenFirstName: e.target.value })
          }
        />
        <TextField
          label="Middle Name"
          value={newChild.childrenMiddleName || ""}
          sx={{ marginRight: 2 }}
          onChange={(e) =>
            setNewChild({ ...newChild, childrenMiddleName: e.target.value })
          }
        />
        <TextField
          label="Last Name"
          value={newChild.childrenLastName || ""}
          sx={{ marginRight: 2 }}
          onChange={(e) =>
            setNewChild({ ...newChild, childrenLastName: e.target.value })
          }
        />
        <TextField
          label="Name Extension"
          value={newChild.childrenNameExtension || ""}
          sx={{ marginRight: 2 }}
          onChange={(e) =>
            setNewChild({ ...newChild, childrenNameExtension: e.target.value })
          }
        />
        <TextField
          type="date"
          label="Date Of Birth"
          InputLabelProps={{ shrink: true }}
          value={newChild.dateOfBirth || ""}
          sx={{ marginRight: 2 }}
          onChange={(e) =>
            setNewChild({ ...newChild, dateOfBirth: e.target.value })
          }
        />
        <TextField
          label="Person ID"
          value={newChild.person_id || ""}
          sx={{ marginRight: 2 }}
          onChange={(e) =>
            setNewChild({ ...newChild, person_id: e.target.value })
          }
        />
        <Button
          onClick={addOrUpdateChild}
          variant="contained"
          color="primary"
          sx={{ marginRight: 1 }}
        >
          {editingChildId ? "Update" : "Add"}
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
            <TableCell sx={{ textAlign: "center" }}>First Name</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Middle Name</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Last Name</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Name Extension</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Date of Birth</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Person ID</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {children.map((child) => (
            <TableRow key={child.id}>
              <TableCell sx={{ textAlign: "center" }}>{child.id}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {child.childrenFirstName}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {child.childrenMiddleName}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {child.childrenLastName}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {child.childrenNameExtension}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {child.dateOfBirth}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {child.person_id}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Button
                  onClick={() => {
                    setNewChild(child);
                    setEditingChildId(child.id);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => deleteChild(child.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ChildrenInfo;
