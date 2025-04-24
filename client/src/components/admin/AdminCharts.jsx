import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminChart = () => {
  const barData = {
    labels: ['Wash', 'Iron', 'Dry Clean', 'Express', 'Others'],
    datasets: [
      {
        label: 'Monthly Orders',
        data: [120, 90, 150, 80, 40],
        backgroundColor: '#3B82F6',
        borderRadius: 6,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [2000, 2500, 1800, 3000, 2700],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ['Wash', 'Iron', 'Dry Clean', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#22C55E', '#FACC15', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const chartWrapper = (title, ChartComponent, data) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md rounded-xl p-6"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ChartComponent data={data} options={options} />
    </motion.div>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      {chartWrapper('Service-wise Orders (Bar)', Bar, barData)}
      {chartWrapper('Monthly Revenue (Line)', Line, lineData)}
      {chartWrapper('Service Distribution (Pie)', Pie, pieData)}
      {chartWrapper('Order Status (Doughnut)', Doughnut, doughnutData)}
    </div>
  );
};

export default AdminChart;
