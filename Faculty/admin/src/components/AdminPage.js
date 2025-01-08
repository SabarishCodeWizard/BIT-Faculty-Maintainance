import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // Import the CSS for AdminPage

const AdminPage = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/admin/upload', formData);
      alert('File uploaded successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AdminPage;
