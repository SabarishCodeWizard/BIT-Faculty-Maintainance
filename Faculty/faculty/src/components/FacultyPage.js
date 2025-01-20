import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FacultyPage';  // Import the styles
import './FacultyPage.css'

const FacultyPage = () => {
  const { faculty_id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/faculty/${faculty_id}`);
        setDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [faculty_id]);

  return (
    <div>
      <h1>Faculty Details</h1>
      {details ? (
        <div>
          <p>Name: {details.name}</p>
          <p>Email: {details.email}</p>
          <p>Department: {details.dept}</p>
          <p>Profession: {details.profession}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FacultyPage;
