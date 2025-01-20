const express = require('express');
const { getFacultyDetails ,getFacultyDetails, getFacultyCount, getDepartmentDistribution, getLoginTrends } = require('../controllers/facultyController');

const router = express.Router();

router.get('/:faculty_id', getFacultyDetails);

// New routes for analytics
router.get('/count', getFacultyCount);
router.get('/department-distribution', getDepartmentDistribution);
router.get('/login-trends', getLoginTrends);
 

module.exports = router;
