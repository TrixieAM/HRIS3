import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Paper,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const PersonalTable = () => {
  //--------------------------------------- DASHBOARD SCRIPT  START -------------------------------------//

  const [data, setData] = useState([]);
  const [newPersonalInformation, setNewPersonalInformation] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nameExtension: "",
    birthDate: "",
    placeOfBirth: "",
    civilStatus: "",
    citizenship: "",
    heightM: "",
    weightKg: "",
    Sex: "",
    bloodType: "",
    gsisNum: "",
    pagibigNum: "",
    philhealthNum: "",
    sssNum: "",
    tinNum: "",
    agencyEmployeeNum: "",
    houseBlockLotNum: "",
    streetName: "",
    subdivisionOrVillage: "",
    barangayName: "",
    cityOrMunicipality: "",
    provinceName: "",
    zipcode: "",
    telephone: "",
    mobileNum: "",
    emailAddress: "",
    spouseFirstName: "",
    spouseMiddleName: "",
    spouseLastName: "",
    spouseNameExtension: "",
    spouseOccupation: "",
    spouseEmployerBusinessName: "",
    spouseBusinessAddress: "",
    spouseTelephone: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherNameExtension: "",
    motherMaidenFirstName: "",
    motherMaidenMiddleName: "",
    motherMaidenLastName: "",
    elementaryNameOfSchool: "",
    elementaryDegree: "",
    elementaryPeriodFrom: "",
    elementaryPeriodTo: "",
    elementaryHighestAttained: "",
    elementaryYearGraduated: "",
    elementaryScholarshipAcademicHonorsReceived: "",
    secondaryNameOfSchool: "",
    secondaryDegree: "",
    secondaryPeriodFrom: "",
    secondaryPeriodTo: "",
    secondaryHighestAttained: "",
    secondaryYearGraduated: "",
    secondaryScholarshipAcademicHonorsReceived: "",
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(
      "http://localhost:5000/personalinfo/person_table"
    );
    setData(response.data);
  };

  const addItem = async () => {
    const {
      firstName,
      middleName,
      lastName,
      birthDate,
      civilStatus,
      heightM,
      weightKg,
      bloodType,
      gsisNum,
      pagibigNum,
      philhealthNum,
      sssNum,
      tinNum,
      agencyEmployeeNum,
      houseBlockLotNum,
      streetName,
      subdivisionOrVillage,
      barangayName,
      cityOrMunicipality,
      provinceName,
      zipcode,
      telephone,
      mobileNum,
      emailAddress,
      spouseFirstName,
      spouseMiddleName,
      spouseLastName,
      spouseNameExtension,
      spouseOccupation,
      spouseEmployerBusinessName,
      spouseBusinessAddress,
      spouseTelephone,
      fatherFirstName,
      fatherMiddleName,
      fatherLastName,
      fatherNameExtension,
      motherMaidenFirstName,
      motherMaidenMiddleName,
      motherMaidenLastName,
      elementaryNameOfSchool,
      elementaryDegree,
      elementaryPeriodFrom,
      elementaryPeriodTo,
      elementaryHighestAttained,
      elementaryYearGraduated,
      elementaryScholarshipAcademicHonorsReceived,
      secondaryNameOfSchool,
      secondaryDegree,
      secondaryPeriodFrom,
      secondaryPeriodTo,
      secondaryHighestAttained,
      secondaryYearGraduated,
      secondaryScholarshipAcademicHonorsReceived,
    } = newPersonalInformation;


    await axios.post(
      "http://localhost:5000/personalinfo/person_table",
      newPersonalInformation
    );
    setNewPersonalInformation({
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      civilStatus: "",
      heightM: "",
      weightKg: "",
      bloodType: "",
      gsisNum: "",
      pagibigNum: "",
      philhealthNum: "",
      sssNum: "",
      tinNum: "",
      agencyEmployeeNum: "",
      houseBlockLotNum: "",
      streetName: "",
      subdivisionOrVillage: "",
      barangayName: "",
      cityOrMunicipality: "",
      provinceName: "",
      zipcode: "",
      telephone: "",
      mobileNum: "",
      emailAddress: "",
      spouseFirstName: "",
      spouseMiddleName: "",
      spouseLastName: "",
      spouseNameExtension: "",
      spouseOccupation: "",
      spouseEmployerBusinessName: "",
      spouseBusinessAddress: "",
      spouseTelephone: "",
      fatherFirstName: "",
      fatherMiddleName: "",
      fatherLastName: "",
      fatherNameExtension: "",
      motherMaidenFirstName: "",
      motherMaidenMiddleName: "",
      motherMaidenLastName: "",
      elementaryNameOfSchool: "",
      elementaryDegree: "",
      elementaryPeriodFrom: "",
      elementaryPeriodTo: "",
      elementaryHighestAttained: "",
      elementaryYearGraduated: "",
      elementaryScholarshipAcademicHonorsReceived: "",
      secondaryNameOfSchool: "",
      secondaryDegree: "",
      secondaryPeriodFrom: "",
      secondaryPeriodTo: "",
      secondaryHighestAttained: "",
      secondaryYearGraduated: "",
      secondaryScholarshipAcademicHonorsReceived: "",
    });
    fetchItems();
  };

  const updateItem = async () => {
    if (!editItem) return;

    try {
      await axios.put(
        `http://localhost:5000/personalinfo/person_table/${editItem.id}`,
        editItem
      ); // Update using editItem directly
      setEditItem(null); // Reset the edit item
      fetchItems(); // Refresh the list of items
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/personalinfo/person_table/${id}`);
    fetchItems();
  };

  const handleEditClick = (item) => {
    setEditItem({ ...item }); // Copy the current item to editItem for modifying
  };

  const cancelEdit = () => {
    setEditItem(null); // Cancel editing
  };

  //---------------------------------------- DASHBOARD SCRIPT  END --------------------------------------//

  //---------------------------------- PERSONAL INFORMATION CRUD TABLE ----------------------------------//

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper
        sx={{
          p: 3,
          display: "sticky",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Personal Information Record
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="First Name"
            value={newPersonalInformation.firstName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                firstName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Middle Name"
            value={newPersonalInformation.middleName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                middleName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Last Name"
            value={newPersonalInformation.lastName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                lastName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Name Extension"
            value={newPersonalInformation.nameExtension}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                nameExtension: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />

          <TextField
            label="Birth Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newPersonalInformation.birthDate}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                birthDate: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Place of Birth"
            value={newPersonalInformation.placeOfBirth}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                placeOfBirth: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Civil Status"
            value={newPersonalInformation.civilStatus}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                civilStatus: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Citizenship"
            value={newPersonalInformation.citizenship}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                citizenship: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Height (m)"
            value={newPersonalInformation.heightM}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                heightM: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Weight (kg)"
            value={newPersonalInformation.weightKg}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                weightKg: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Sex"
            value={newPersonalInformation.Sex}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                Sex: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Blood Type"
            value={newPersonalInformation.bloodType}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                bloodType: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="GSIS Number"
            value={newPersonalInformation.gsisNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                gsisNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Pag-IBIG Number"
            value={newPersonalInformation.pagibigNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                pagibigNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="PhilHealth Number"
            value={newPersonalInformation.philhealthNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                philhealthNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="SSS Number"
            value={newPersonalInformation.sssNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                sssNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="TIN Number"
            value={newPersonalInformation.tinNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                tinNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Agency Employee Number"
            value={newPersonalInformation.agencyEmployeeNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                agencyEmployeeNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="House/Block/Lot Number"
            value={newPersonalInformation.houseBlockLotNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                houseBlockLotNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Street Name"
            value={newPersonalInformation.streetName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                streetName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Subdivision/Village"
            value={newPersonalInformation.subdivisionOrVillage}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                subdivisionOrVillage: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Barangay Name"
            value={newPersonalInformation.barangayName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                barangayName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="City/Municipality"
            value={newPersonalInformation.cityOrMunicipality}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                cityOrMunicipality: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Province"
            value={newPersonalInformation.provinceName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                provinceName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Zip Code"
            value={newPersonalInformation.zipcode}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                zipcode: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Telephone"
            value={newPersonalInformation.telephone}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                telephone: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Mobile Number"
            value={newPersonalInformation.mobileNum}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                mobileNum: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Email Address"
            value={newPersonalInformation.emailAddress}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                emailAddress: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse First Name"
            value={newPersonalInformation.spouseFirstName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseFirstName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Middle Name"
            value={newPersonalInformation.spouseMiddleName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseMiddleName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Last Name"
            value={newPersonalInformation.spouseLastName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseLastName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Name Extension"
            value={newPersonalInformation.spouseNameExtension}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseNameExtension: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Occupation"
            value={newPersonalInformation.spouseOccupation}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseOccupation: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Employer/Business Name"
            value={newPersonalInformation.spouseEmployerBusinessName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseEmployerBusinessName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Business Address"
            value={newPersonalInformation.spouseBusinessAddress}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseBusinessAddress: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Spouse Telephone"
            value={newPersonalInformation.spouseTelephone}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                spouseTelephone: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Father First Name"
            value={newPersonalInformation.fatherFirstName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                fatherFirstName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Father Middle Name"
            value={newPersonalInformation.fatherMiddleName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                fatherMiddleName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Father Last Name"
            value={newPersonalInformation.fatherLastName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                fatherLastName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Father Name Extension"
            value={newPersonalInformation.fatherNameExtension}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                fatherNameExtension: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Mother Maiden First Name"
            value={newPersonalInformation.motherMaidenFirstName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                motherMaidenFirstName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Mother Maiden Middle Name"
            value={newPersonalInformation.motherMaidenMiddleName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                motherMaidenMiddleName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Mother Maiden Last Name"
            value={newPersonalInformation.motherMaidenLastName}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                motherMaidenLastName: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Name of School"
            value={newPersonalInformation.elementaryNameOfSchool}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryNameOfSchool: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Degree"
            value={newPersonalInformation.elementaryDegree}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryDegree: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Period From"
            value={newPersonalInformation.elementaryPeriodFrom}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryPeriodFrom: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Period To"
            value={newPersonalInformation.elementaryPeriodTo}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryPeriodTo: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Highest Attained"
            value={newPersonalInformation.elementaryHighestAttained}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryHighestAttained: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Year Graduated"
            InputLabelProps={{ shrink: true }}
            placeholder="Ex: 2004, 2006, 2003,..."
            value={newPersonalInformation.elementaryYearGraduated}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryYearGraduated: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Elementary Scholarship/Achievements"
            value={
              newPersonalInformation.elementaryScholarshipAcademicHonorsReceived
            }
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                elementaryScholarshipAcademicHonorsReceived: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Name of School"
            value={newPersonalInformation.secondaryNameOfSchool}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryNameOfSchool: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Degree"
            value={newPersonalInformation.secondaryDegree}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryDegree: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Period From"
            InputLabelProps={{ shrink: true }}
            placeholder="Ex: 2004, 2006, 2003,..."
            value={newPersonalInformation.secondaryPeriodFrom}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryPeriodFrom: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Period To"
            InputLabelProps={{ shrink: true }}
            placeholder="Ex: 2004, 2006, 2003,..."
            value={newPersonalInformation.secondaryPeriodTo}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryPeriodTo: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Highest Attained"
            value={newPersonalInformation.secondaryHighestAttained}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryHighestAttained: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Year Graduated"
            InputLabelProps={{ shrink: true }}
            placeholder="Ex: 2004, 2006, 2003,..."
            value={newPersonalInformation.secondaryYearGraduated}
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryYearGraduated: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            label="Secondary Scholarship/Achievements"
            value={
              newPersonalInformation.secondaryScholarshipAcademicHonorsReceived
            }
            onChange={(e) =>
              setNewPersonalInformation({
                ...newPersonalInformation,
                secondaryScholarshipAcademicHonorsReceived: e.target.value,
              })
            }
            sx={{ mr: 1, mb: 1 }}
          />
        </Box>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Button
            onClick={addItem}
            variant="contained"
            style={{ backgroundColor: "#4CAF50", color: "white" }}
            startIcon={<AddIcon />}
            sx={{ mr: 1 }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Name Extension</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Place of Birth</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Citizenship</TableCell>
                <TableCell>Height (m)</TableCell>
                <TableCell>Weight (kg)</TableCell>
                <TableCell>Sex (M/F)</TableCell>
                <TableCell>Blood Type</TableCell>
                <TableCell>GSIS Number</TableCell>
                <TableCell>Pag-IBIG Number</TableCell>
                <TableCell>PhilHealth Number</TableCell>
                <TableCell>SSS Number</TableCell>
                <TableCell>TIN Number</TableCell>
                <TableCell>Agency Employee Number</TableCell>
                <TableCell>House Block Lot Number</TableCell>
                <TableCell>Street Name</TableCell>
                <TableCell>Subdivision or Village</TableCell>
                <TableCell>Barangay Name</TableCell>
                <TableCell>City or Municipality</TableCell>
                <TableCell>Province Name</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell>Telephone</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Spouse First Name</TableCell>
                <TableCell>Spouse Middle Name</TableCell>
                <TableCell>Spouse Last Name</TableCell>
                <TableCell>Spouse Name Extension</TableCell>
                <TableCell>Spouse Occupation</TableCell>
                <TableCell>Spouse Employer Business Name</TableCell>
                <TableCell>Spouse Business Address</TableCell>
                <TableCell>Spouse Telephone</TableCell>
                <TableCell>Father First Name</TableCell>
                <TableCell>Father Middle Name</TableCell>
                <TableCell>Father Last Name</TableCell>
                <TableCell>Father Name Extension</TableCell>
                <TableCell>Mother Maiden First Name</TableCell>
                <TableCell>Mother Maiden Middle Name</TableCell>
                <TableCell>Mother Maiden Last Name</TableCell>
                <TableCell>Elementary Name of School</TableCell>
                <TableCell>Elementary Degree</TableCell>
                <TableCell>Elementary Period From</TableCell>
                <TableCell>Elementary Period To</TableCell>
                <TableCell>Elementary Highest Attained</TableCell>
                <TableCell>Elementary Year Graduated</TableCell>
                <TableCell>
                  Elementary Scholarship Academic Honors Received
                </TableCell>
                <TableCell>Secondary Name of School</TableCell>
                <TableCell>Secondary Degree</TableCell>
                <TableCell>Secondary Period From</TableCell>
                <TableCell>Secondary Period To</TableCell>
                <TableCell>Secondary Highest Attained</TableCell>
                <TableCell>Secondary Year Graduated</TableCell>
                <TableCell>
                  Secondary Scholarship Academic Honors Received
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {Object.keys(item).map((key) => (
                    <TableCell key={key}>
                      {editItem && editItem.id === item.id ? (
                        <TextField
                          value={editItem[key] || ""}
                          onChange={(e) =>
                            setEditItem({ ...editItem, [key]: e.target.value })
                          }
                          fullWidth
                        />
                      ) : (
                        item[key]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editItem?.id === item.id ? (
                      <>
                        <Button
                          onClick={updateItem}
                          variant="contained"
                          style={{ backgroundColor: "#2196F3", color: "white" }}
                          startIcon={<SaveIcon />}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={cancelEdit}
                          variant="contained"
                          style={{ backgroundColor: "#800000", color: "white" }}
                          startIcon={<CancelIcon />}
                          sx={{ mr: 1 }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEditClick(item)}
                          variant="contained"
                          style={{ backgroundColor: "#2196F3", color: "white" }}
                          startIcon={<EditIcon />}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteItem(item.id)}
                          variant="contained"
                          style={{ backgroundColor: "#800000", color: "white" }}
                          startIcon={<DeleteIcon />}
                          sx={{ mr: 1 }}
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
        </Box>
      </Paper>
    </Container>
  );
};

export default PersonalTable;
