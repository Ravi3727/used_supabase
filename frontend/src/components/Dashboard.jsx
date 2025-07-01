import React, { useEffect, useLayoutEffect, useState } from 'react';
import { supabase } from '../supabase-client';
import Card from './card';

function Dashboard() {
  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    const adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword) {
      window.location.href = '/';
    }
  });

  const fetchDashboardData = async () => {
    setData(null);
    try {
      const { error, data } = await supabase
        .from('admin_dashboard')
        .select('*')
      if (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
      } else if (data && data.length > 0) {
        setData(data);
        console.log('Dashboard data fetched successfully:', data);
      } else {
        setData([]);
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Admin Dashboard</h1>

      {data ? (
        <div className="">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-6 transition duration-300 flex flex-col items-center justify-center"
            >
              <div className='flex flex-col items-center mb-6'>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Till date</h2>
                <p className="text-md text-gray-500 mb-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className='flex flex-wrap w-10/12 justify-center gap-6'>
                <Card data={{ number: item.totalUsers, text: "Total Users " }} />
                <Card data={{ number: item.activeUsers, text: "Active Users " }} />
                <Card data={{ number: item.totalBookings, text: "Total Bookings " }} />
                <Card data={{ number: item.totalVenues, text: "Total Venues" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-12">Loading dashboard data...</div>
      )}

      <div className="mt-10 flex justify-center">
        <button
          onClick={fetchDashboardData}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Refresh Dashboard
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
