const express = require("express");
const multer = require("multer");
const fs = require("fs"); // Import file system module
const router = express.Router();
const mysql = require("mysql2");
const xlsx = require("xlsx");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earist_hris",
});

// CRUD for Children
router.get("/children_table", (req, res) => {
  const query = "SELECT * FROM children_table";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching children" });
    res.json(results);
  });
});

router.post("/children_table", (req, res) => {
  const { childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, dateOfBirth, person_id } = req.body;
  const query = `INSERT INTO children_table (childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, dateOfBirth, person_id) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, dateOfBirth, person_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error adding child" });
    res.status(201).json({ message: "Child added", id: result.insertId });
  });
});

router.put("/children_table/:id", (req, res) => {
  const { id } = req.params;
  const { childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, dateOfBirth } = req.body;
  const query = `UPDATE children_table SET childrenFirstName = ?, childrenMiddleName = ?, childrenLastName = ?, childrenNameExtension = ?, dateOfBirth = ? WHERE id = ?`;
  db.query(query, [childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, dateOfBirth, id], (err) => {
    if (err) return res.status(500).json({ error: "Error updating child" });
    res.json({ message: "Child updated" });
  });
});

router.delete("/children_table/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM children_table WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting child" });
    res.json({ message: "Child deleted" });
  });
});

// File uploads
const upload = multer({ dest: "uploads/" });

// Convert Excel date to normalized UTC date
function excelDateToUTCDate(excelDate) {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

router.post("/upload_children_table", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded employee info data:", sheet);

    // Insert data into MySQL
    sheet.forEach((row) => {
      const childrenFirstName = row.childrenFirstName;
      const childrenMiddleName = row.childrenMiddleName;
      const childrenLastName = row.childrenLastName;
      const childrenNameExtension = row.childrenNameExtension;
      const dateOfBirth = excelDateToUTCDate(row.dateOfBirth);
      const formattedDateofBirth = dateOfBirth.toISOString().split("T")[0];

      const query = `INSERT INTO children_table (childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, dateOfBirth) VALUES (?, ?, ?, ?, ?)`;
      db.query(query, [childrenFirstName, childrenMiddleName, childrenLastName, childrenNameExtension, formattedDateofBirth], (err, result) => {
        if (err) {
          console.error("Error inserting data into the table", err);
          return;
        }
        console.log("Data inserted into the table successfully:", result);
      });
    });

    // Send response after insertion
    res.json({ message: "Excel file uploaded and data inserted successfully" });
  } catch (error) {
    console.error("Error processing uploaded XLS file:", error);
    res.status(500).json({ error: "Error processing uploaded XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded excel file deleted");
      }
    });
  }
});

module.exports = router;
