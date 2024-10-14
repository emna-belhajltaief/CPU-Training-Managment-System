import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import membersData from '@data/stats.json';
import './Stats.css'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Stats = () => {
  const [stats, setStats] = useState(null);

  // Function to calculate statistics
  const calculateStats = (members) => {
    const totalMembers = members.length;
    const adherents = members.filter(member => member.adherent).length;
    const paidMembers = members.filter(member => member.paid).length;
    const presentMembers = members.filter(member => member.present).length;
    const successMembers = members.filter(member => member.paid && member.present).length;

    // Calculate total money
    const totalMoney = members.reduce((acc, member) => acc + (member.paid ? member.fee : 0), 0);

    // Calculate number of members per section
    const sectionCount = {};
    members.forEach(member => {
      sectionCount[member.section] = (sectionCount[member.section] || 0) + 1;
    });

    return {
      totalMembers,
      adherents,
      paidMembers,
      presentMembers,
      successMembers,
      totalMoney,
      sectionCount
    };
  };

  useEffect(() => {
    const calculatedStats = calculateStats(membersData);
    setStats(calculatedStats);
  }, []);

  if (!stats) return <p>Loading statistics...</p>;

  // Calculate percentages for each category
  const adherentPercentage = ((stats.adherents / stats.totalMembers) * 100).toFixed(2);
  const paidPercentage = ((stats.paidMembers / stats.totalMembers) * 100).toFixed(2);
  const presentPercentage = ((stats.presentMembers / stats.totalMembers) * 100).toFixed(2);
  const successPercentage = ((stats.successMembers / stats.totalMembers) * 100).toFixed(2);

  // Pie chart data
  const adherentData = {
    labels: ['Adherents', 'Non-Adherents'],
    datasets: [{
      data: [stats.adherents, stats.totalMembers - stats.adherents],
      backgroundColor: ['#F05A7E', '#091057'],
      hoverBackgroundColor: ['#ee6e8c', '#1E3E62'],
    }]
  };

  const paidData = {
    labels: ['Paid', 'Not Paid'],
    datasets: [{
      data: [stats.paidMembers, stats.totalMembers - stats.paidMembers],
      backgroundColor: ['#4BC0C0', '#FF9F40'],
      hoverBackgroundColor: ['#4dcdcd', '#f9ab5e'],
    }]
  };

  const presentData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [stats.presentMembers, stats.totalMembers - stats.presentMembers],
      backgroundColor: ['#185519', '#E7E9ED'],
      hoverBackgroundColor: ['#387F39', '#E7E9ED'],
    }]
  };

  return (
    <div className="stats-container">
      <h2 className="stats-title">Formation Statistics</h2>

      <div className="chart-container">
        <div className="chart-item">
          <h3>Adherent Members ({adherentPercentage}%)</h3>
          <Pie 
            data={adherentData}
            options={{
              plugins: {
                datalabels: {
                  formatter: (value, ctx) => {
                    let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                  },
                  color: '#fff',
                }
              }
            }}
          />
        </div>

        <div className="chart-item">
          <h3>Paid Members ({paidPercentage}%)</h3>
          <Pie 
            data={paidData}
            options={{
              plugins: {
                datalabels: {
                  formatter: (value, ctx) => {
                    let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                  },
                  color: '#fff',
                }
              }
            }}
          />
        </div>

        <div className="chart-item">
          <h3>Present Members ({presentPercentage}%)</h3>
          <Pie 
            data={presentData}
            options={{
              plugins: {
                datalabels: {
                  formatter: (value, ctx) => {
                    let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                  },
                  color: '#fff',
                }
              }
            }}
          />
        </div>

        <div className="success-section">
          <h3>Success Rate: {successPercentage}%</h3>
        </div>

        <div className="chart-item">
          <h3>Total Money Collected: ${stats.totalMoney}</h3>
        </div>

        <div className="section-summary">
          <h3>Members per Section:</h3>
          <ul>
            {Object.entries(stats.sectionCount).map(([section, count]) => (
              <li key={section}>{section}: {count} members</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stats;
