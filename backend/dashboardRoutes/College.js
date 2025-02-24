const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");

const fs = require("fs"); // Import file system module
const xlsx = require("xlsx");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earist_hris",
});

router.get("/data", (req, res) => {
  const query = `SELECT * FROM college_table`;
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Read (Get All Colleges)
router.get("/college_table", (req, res) => {
  const query = "SELECT * FROM college_table";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send({ message: "Internal Server Error" });
    res.status(200).send(result);
  });
});

// Create (Add New College Entry)
router.post("/college_table", (req, res) => {
  const { collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived, person_id } = req.body;

  const query = `
    INSERT INTO college_table (
      collegeNameOfSchool,
      collegeDegree,
      collegePeriodFrom,
      collegePeriodTo,
      collegeHighestAttained,
      collegeYearGraduated,
      collegeScholarshipAcademicHonorsReceived,
      person_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived, person_id], (err, result) => {
    if (err) return res.status(500).send({ message: "Internal Server Error" });
    res.status(201).send({ message: "College entry created", id: result.insertId });
  });
});

// Update College Entry
router.put("/college_table/:id", (req, res) => {
  const { collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived, person_id } = req.body;

  const { id } = req.params;
  const query = `
    UPDATE college_table SET
      collegeNameOfSchool = ?,
      collegeDegree = ?,
      collegePeriodFrom = ?,
      collegePeriodTo = ?,
      collegeHighestAttained = ?,
      collegeYearGraduated = ?,
      collegeScholarshipAcademicHonorsReceived = ?,
      person_id = ?
    WHERE id = ?`;

  db.query(query, [collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived, person_id, id], (err, result) => {
    if (err) return res.status(500).send({ message: "Internal Server Error" });
    res.status(200).send({ message: "College entry updated" });
  });
});

// Delete College Entry
router.delete("/college_table/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM college_table WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send({ message: "Internal Server Error" });
    res.status(200).send({ message: "College entry deleted" });
  });
});

//end of CRUD app

// Add this route to handle XLS file upload for college_table
router.post("/upload_college_table", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded college data:", sheet);

    // Insert data into MySQL
    sheet.forEach((row) => {
      const collegeNameOfSchool = row.collegeNameOfSchool;
      const collegeDegree = row.collegeDegree;
      const collegePeriodFrom = row.collegePeriodFrom;

      const collegePeriodTo = row.collegePeriodTo;
      const collegeHighestAttained = row.collegeHighestAttained;
      const collegeYearGraduated = row.collegeYearGraduated;
      const collegeScholarshipAcademicHonorsReceived = row.collegeScholarshipAcademicHonorsReceived;
      const person_id = row.person_id;

      const sql = "INSERT INTO college_table (collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived, person_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(sql, [collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived, person_id], (err, result) => {
        if (err) {
          console.error("Error inserting data into college_table:", err);
          return;
        }
        console.log("Data inserted into college_table successfully:", result);
      });
    });

    // Send response after insertion
    res.json({ message: "College data file uploaded and data inserted successfully" });
  } catch (error) {
    console.error("Error processing college XLS file:", error);
    res.status(500).json({ error: "Error processing college XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

module.exports = router;
