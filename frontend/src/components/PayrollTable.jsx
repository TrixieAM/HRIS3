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
  TableContainer,
  Paper,
  Container,
} from "@mui/material";

const PayrollTable = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [payroll, setPayroll] = useState({
    name: "",
    position: "",
    rateNbc188: "",
    nbc594: "",
    increment: "",
    grossSalary: "",
    abs: "",
    d: "",
    h: "",
    m: "",
    netSalary: "",
    withholdingTax: "",
    totalGsisDeds: "",
    totalPagibigDeds: "",
    philhealth: "",
    totalOtherDeds: "",
    totalDeductions: "",
    pay1st: "",
    pay2nd: "",
    rtIns: "",
    ec: "",
    pagibig: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payroll");
      setPayrolls(response.data);
    } catch (error) {
      console.error("Error fetching payroll data", error);
    }
  };

  const handleChange = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/payroll/${editingId}`, payroll);
      } else {
        await axios.post("http://localhost:5000/api/payroll", payroll);
      }
      setEditingId(null);
      fetchPayrolls();
      resetForm();
    } catch (error) {
      console.error("Error submitting payroll data", error);
    }
  };

  const handleEdit = (item) => {
    setPayroll(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payroll/${id}`);
      fetchPayrolls();
    } catch (error) {
      console.error("Error deleting payroll record", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  const resetForm = () => {
    setPayroll({
      name: "",
      position: "",
      rateNbc188: "",
      nbc594: "",
      increment: "",
      grossSalary: "",
      abs: "",
      d: "",
      h: "",
      m: "",
      netSalary: "",
      withholdingTax: "",
      totalGsisDeds: "",
      totalPagibigDeds: "",
      philhealth: "",
      totalOtherDeds: "",
      totalDeductions: "",
      pay1st: "",
      pay2nd: "",
      rtIns: "",
      ec: "",
      pagibig: "",
    });
  };

  return (
    <Container>
      <h2>Payroll Register for Regular Employees</h2>

      <Box display="flex" flexWrap="wrap" sx={{ marginBottom: 3 }}>
        {Object.keys(payroll).map((key) => (
          <TextField
            key={key}
            label={key.replace(/([A-Z])/g, " $1").trim()}
            name={key}
            value={payroll[key]}
            onChange={handleChange}
            sx={{ marginRight: 2, marginBottom: 2, width: "23%" }}
          />
        ))}
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ height: 55, marginRight: 2 }}>
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button onClick={handleCancel} variant="contained" color="error" sx={{ height: 55 }}>
            Cancel
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Rate NBC 188</TableCell>
              <TableCell>NBC 594</TableCell>
              <TableCell>Increment</TableCell>
              <TableCell>Gross Salary</TableCell>
              <TableCell>ABS</TableCell>
              <TableCell>D</TableCell>
              <TableCell>H</TableCell>
              <TableCell>M</TableCell>
              <TableCell>Net Salary</TableCell>
              <TableCell>Withholding Tax</TableCell>
              <TableCell>Total GSIS Deductions</TableCell>
              <TableCell>Total Pagibig Deductions</TableCell>
              <TableCell>Philhealth</TableCell>
              <TableCell>Total Other Deductions</TableCell>
              <TableCell>Total Deductions</TableCell>
              <TableCell>1st Pay</TableCell>
              <TableCell>2nd Pay</TableCell>
              <TableCell>RT Insurance</TableCell>
              <TableCell>EC</TableCell>
              <TableCell>Pagibig</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.rateNbc188}</TableCell>
                <TableCell>{item.nbc594}</TableCell>
                <TableCell>{item.increment}</TableCell>
                <TableCell>{item.grossSalary}</TableCell>
                <TableCell>{item.abs}</TableCell>
                <TableCell>{item.d}</TableCell>
                <TableCell>{item.h}</TableCell>
                <TableCell>{item.m}</TableCell>
                <TableCell>{item.netSalary}</TableCell>
                <TableCell>{item.withholdingTax}</TableCell>
                <TableCell>{item.totalGsisDeds}</TableCell>
                <TableCell>{item.totalPagibigDeds}</TableCell>
                <TableCell>{item.philhealth}</TableCell>
                <TableCell>{item.totalOtherDeds}</TableCell>
                <TableCell>{item.totalDeductions}</TableCell>
                <TableCell>{item.pay1st}</TableCell>
                <TableCell>{item.pay2nd}</TableCell>
                <TableCell>{item.rtIns}</TableCell>
                <TableCell>{item.ec}</TableCell>
                <TableCell>{item.pagibig}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)} variant="contained" color="primary" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PayrollTable;
