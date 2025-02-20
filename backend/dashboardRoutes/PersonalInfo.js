const express = require('express');
const router = express.Router()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'earist',
});

router.get("/person_table", (req, res) => {
    const query = 'SELECT * FROM person_table';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching children' });
        res.json(results);
    });
});

router.post("/person_table", (req, res) => {
    const { firstName, middleName, lastName, nameExtension, birthDate, placeOfBirth, civilStatus, citizenship, heightM, weightKg, Sex, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived } = req.body;

    const query = 'INSERT INTO person_table (firstName, middleName, lastName, nameExtension, birthDate, placeOfBirth, civilStatus, citizenship, heightM, weightKg, Sex, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [firstName, middleName, nameExtension, lastName, birthDate, placeOfBirth, civilStatus, citizenship, heightM, weightKg, Sex, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Item created', id: result.insertId });
    });
});

router.put("/person_table", (req, res) => {
    const { firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived } = req.body; // make sure to include all fields
    const { id } = req.params;

    const query = 'UPDATE person_table SET firstName = ?, middleName = ?, lastName = ?, birthDate = ?, civilStatus = ?, heightM = ?, weightKg = ?, bloodType = ?, gsisNum = ?, pagibigNum = ?, philhealthNum = ?, sssNum = ?, tinNum = ?, agencyEmployeeNum = ?, houseBlockLotNum = ?, streetName = ?, subdivisionOrVillage = ?, barangayName = ?, cityOrMunicipality = ?, provinceName = ?, zipcode = ?, telephone = ?, mobileNum = ?, emailAddress = ?, spouseFirstName = ?, spouseMiddleName = ?, spouseLastName = ?, spouseNameExtension = ?, spouseOccupation = ?, spouseEmployerBusinessName = ?, spouseBusinessAddress = ?, spouseTelephone = ?, fatherFirstName = ?, fatherMiddleName = ?, fatherLastName = ?, fatherNameExtension = ?, motherMaidenFirstName = ?, motherMaidenMiddleName = ?, motherMaidenLastName = ?, elementaryNameOfSchool = ?, elementaryDegree = ?, elementaryPeriodFrom = ?, elementaryPeriodTo = ?, elementaryHighestAttained = ?, elementaryYearGraduated = ?, elementaryScholarshipAcademicHonorsReceived = ?, secondaryNameOfSchool = ?, secondaryDegree = ?, secondaryPeriodFrom = ?, secondaryPeriodTo = ?, secondaryHighestAttained = ?, secondaryYearGraduated = ?, secondaryScholarshipAcademicHonorsReceived = ? WHERE id = ?';

    db.query(query, [firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived, id], (err) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Item updated' });
    });

});

router.delete("/person_table/:id", (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM person_table WHERE id = ?';

    db.query(query, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Item deleted' });
    });
});

module.exports = router