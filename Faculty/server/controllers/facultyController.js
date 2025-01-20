const Faculty = require('../models/Faculty');

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

// Get total faculty count
const getFacultyCount = async (req, res) => {
  try {
    const count = await Faculty.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get department-wise distribution
const getDepartmentDistribution = async (req, res) => {
  try {
    const distribution = await Faculty.aggregate([
      { $group: { _id: "$dept", count: { $sum: 1 } } },
    ]);
    res.status(200).json(distribution);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get login trends (this would require a separate implementation to track logins, assuming a `logins` collection exists)
const getLoginTrends = async (req, res) => {
  try {
    // Placeholder data, assuming you have a `logins` collection
    const loginTrends = [
      { date: '2025-01-01', count: 10 },
      { date: '2025-01-02', count: 15 },
      { date: '2025-01-03', count: 12 },
    ];
    res.status(200).json(loginTrends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { getFacultyDetails , getFacultyCount, getDepartmentDistribution, getLoginTrends };
