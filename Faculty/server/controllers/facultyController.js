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


module.exports = { getFacultyDetails };
