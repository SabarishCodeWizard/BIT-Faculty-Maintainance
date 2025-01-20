import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const AnalyticsDashboard = () => {
  const [facultyCount, setFacultyCount] = useState(0);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [loginTrends, setLoginTrends] = useState([]);

  useEffect(() => {
    // Fetch faculty count
    fetch('http://localhost:5000/faculty/count')
      .then(res => res.json())
      .then(data => setFacultyCount(data.count));

    // Fetch department distribution
    fetch('http://localhost:5000/faculty/department-distribution')
      .then(res => res.json())
      .then(data => setDepartmentDistribution(data));

    // Fetch login trends
    fetch('http://localhost:5000/faculty/login-trends')
      .then(res => res.json())
      .then(data => setLoginTrends(data));
  }, []);

  // Department distribution chart (Bar chart)
  const departmentData = {
    labels: departmentDistribution.map(item => item._id),
    datasets: [
      {
        label: 'Faculty Count by Department',
        data: departmentDistribution.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Login trends chart (Line chart)
  const loginTrendData = {
    labels: loginTrends.map(item => item.date),
    datasets: [
      {
        label: 'Logins',
        data: loginTrends.map(item => item.count),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Analytics Dashboard</h2>

      <div>
        <h3>Total Faculty Count: {facultyCount}</h3>
      </div>

      <div>
        <h3>Department-wise Distribution</h3>
        <Bar data={departmentData} />
      </div>

      <div>
        <h3>Login Trends</h3>
        <Line data={loginTrendData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
