const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const xlsx = require("xlsx");
const uploads = multer({ dest: "uploads/" });
const router = express.Router();
const fs = require("fs");
//require('dotenv').config(); // Load environment variables

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earist_hris",
});

router.post("/upload_vocational", uploads.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!sheet.length) {
      return res.status(400).json({ error: "Uploaded file is empty" });
    }

    console.log("Uploaded sheet data:", sheet);

    // Insert data into MySQL
    const insertPromises = sheet.map((row) => {
      const vocationalNameOfSchool = row.vocationalNameOfSchool;
      const vocationalDegree = row.vocationalDegree;
      const vocationalPeriodFrom = row.vocationalPeriodFrom;
      const vocationalPeriodTo = row.vocationalPeriodTo;
      const vocationalHighestAttained = row.vocationalHighestAttained;
      const vocationalYearGraduated = row.vocationalYearGraduated;

      const sql = "INSERT INTO vocational_table (vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated) VALUES (?, ?, ?, ?, ?, ?)";
      return new Promise((resolve, reject) => {
        db.query(sql, [vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated], (err) => {
          if (err) {
            console.error("Error inserting data:", err);
            return reject(err);
          }
          console.log("Data inserted successfully for:", vocationalNameOfSchool);
          resolve();
        });
      });
    });

    await Promise.all(insertPromises);
    res.json({ message: "File uploaded and data inserted successfully" });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
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

router.get("/data", (req, res) => {
  const query = "SELECT * FROM vocational_table";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// CRUD for vocational_table
router.get("/vocational_table", (req, res) => {
  const query = "SELECT * FROM vocational_table";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send(result);
  });
});

router.post("/vocational_table", (req, res) => {
  const { vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated } = req.body;
  const query = "INSERT INTO vocational_table (vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).send({ message: "Vocational record created", id: result.insertId });
  });
});

router.put("/vocational_table/:id", (req, res) => {
  const { id } = req.params;
  const { vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated } = req.body;
  const query = "UPDATE vocational_table SET vocationalNameOfSchool = ?, vocationalDegree = ?, vocationalPeriodFrom = ?, vocationalPeriodTo = ?, vocationalHighestAttained = ?, vocationalYearGraduated = ? WHERE id = ?";
  db.query(query, [vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated, id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send({ message: "Vocational record updated" });
  });
});

router.delete("/vocational_table/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM vocational_table WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send({ message: "Vocational record deleted" });
  });
});

module.exports = router;
