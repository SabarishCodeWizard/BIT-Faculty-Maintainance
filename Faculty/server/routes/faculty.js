const express = require('express');
const { getFacultyDetails , getFacultyCount, getDepartmentDistribution, getLoginTrends } = require('../controllers/facultyController');

const router = express.Router();

router.get('/:faculty_id', getFacultyDetails);

// Faculty count
router.get('/count', getFacultyCount);

// Department-wise distribution
router.get('/department-distribution', getDepartmentDistribution);

// Login trends
router.get('/login-trends', getLoginTrends);

module.exports = router;
