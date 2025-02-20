const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const router = express.Router()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'earist',
  });


router.get("/otherinformation", (req, res) => {
  const query = "SELECT * FROM other_information_table";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});


router.post("/otherinformation", (req, res) => {
    const { specialSkills, nonAcademicDistinctions, membershipInAssociation } = req.body;
    const query = 'INSERT INTO other_information_table (specialSkills, nonAcademicDistinctions, membershipInAssociation) VALUES (?, ?, ?)';
    db.query(query, [specialSkills, nonAcademicDistinctions, membershipInAssociation], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Record created', id: result.insertId });
    });

});

router.put("/otherinformation/:id", (req, res) => {
    const { specialSkills, nonAcademicDistinctions, membershipInAssociation } = req.body;
    const { id } = req.params;
    
    const query = 'UPDATE other_information_table SET specialSkills = ?, nonAcademicDistinctions = ?, membershipInAssociation = ? WHERE id = ?';
    
    db.query(query, [specialSkills, nonAcademicDistinctions, membershipInAssociation, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Item updated' });
    });
});


router.delete("/otherinformation/:id", (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM other_information_table WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Item deleted' });
    });
});

module.exports = router
