const express = require('express');
const { getFacultyDetails } = require('../controllers/facultyController');

const router = express.Router();

router.get('/:faculty_id', getFacultyDetails);

module.exports = router;
