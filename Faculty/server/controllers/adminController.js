const Faculty = require('../models/Faculty');
const xlsx = require('xlsx');

const uploadFacultyDetails = async (req, res) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Normalize field names from CSV data
    const normalizedData = rawData.map((row) => ({
      name: row.name,  // CSV column name -> MongoDB schema field
      email: row.email,
      faculty_id: row.faculty_id.toString(),  // Ensure faculty_id is treated as a string
      dept: row.department,
      profession: row.profession,
    }));

    // Insert the normalized data into MongoDB
    await Faculty.insertMany(normalizedData);
    res.status(200).json({ message: "Faculty details uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { uploadFacultyDetails };
