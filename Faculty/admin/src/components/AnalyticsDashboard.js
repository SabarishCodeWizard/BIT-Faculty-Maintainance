import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [facultyCount, setFacultyCount] = useState(0);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [loginTrends, setLoginTrends] = useState([]);

  useEffect(() => {
    // Fetch faculty count
    axios.get('http://localhost:5000/faculty/count')
      .then(response => setFacultyCount(response.data.count))
      .catch(err => console.error('Error fetching faculty count:', err));

    // Fetch department distribution
    axios.get('http://localhost:5000/faculty/department-distribution')
      .then(response => setDepartmentDistribution(response.data))
      .catch(err => console.error('Error fetching department distribution:', err));

    // Fetch login trends
    axios.get('http://localhost:5000/faculty/login-trends')
      .then(response => setLoginTrends(response.data))
      .catch(err => console.error('Error fetching login trends:', err));
  }, []);

  // Prepare department distribution data for chart
  const departmentLabels = departmentDistribution.map(dept => dept._id);
  const departmentData = departmentDistribution.map(dept => dept.count);

  // Prepare login trends data for chart (if necessary)
  const loginLabels = loginTrends.map(trend => `${trend._id.month}-${trend._id.year}`);
  const loginData = loginTrends.map(trend => trend.count);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <h2>Faculty Count: {facultyCount}</h2>

      <h3>Department Distribution</h3>
      <ul>
        {departmentDistribution.map(dept => (
          <li key={dept._id}>{dept._id}: {dept.count}</li>
        ))}
      </ul>

      <h3>Department Distribution Chart</h3>
      <Line
        data={{
          labels: departmentLabels,
          datasets: [{
            label: 'Faculty Count by Department',
            data: departmentData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }],
        }}
        options={{ responsive: true }}
      />

      <h3>Login Trends</h3>
      <ul>
        {loginTrends.map(trend => (
          <li key={trend._id.year + '-' + trend._id.month}>
            {trend._id.month}-{trend._id.year}: {trend.count}
          </li>
        ))}
      </ul>

      <h3>Login Trends Chart</h3>
      <Line
        data={{
          labels: loginLabels,
          datasets: [{
            label: 'Login Trends',
            data: loginData,
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          }],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default AnalyticsDashboard;
