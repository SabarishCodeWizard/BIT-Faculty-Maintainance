const Faculty = require('../models/Faculty');
const moment = require('moment');

const getFacultyDetails = async (req, res) => {
  try {
    const { faculty_id } = req.params;

    // Convert faculty_id to string for consistent querying
    const faculty = await Faculty.findOne({ faculty_id: faculty_id.toString() });

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFacultyCount = async (req, res) => {
  try {
    const count = await Faculty.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDepartmentDistribution = async (req, res) => {
  try {
    const departments = await Faculty.aggregate([
      {
        $group: {
          _id: "$dept",
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLoginTrends = async (req, res) => {
  try {
    // Assuming you have a "lastLogin" field in your Faculty schema
    const loginTrends = await Faculty.aggregate([
      {
        $project: {
          month: { $month: "$lastLogin" },
          year: { $year: "$lastLogin" },
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(loginTrends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFacultyDetails,getFacultyCount, getDepartmentDistribution, getLoginTrends };
