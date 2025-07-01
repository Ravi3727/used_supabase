import React, { useState } from 'react';
import { supabase } from '../supabase-client';

function HomePage() {
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, data } = await supabase
            .from('passwords')
            .select('password')
            .eq('password', password);
        if (error) {
            console.error('Error fetching password:', error);
            alert('An error occurred while checking the password.');
            return;
        }
        if (data.length > 0) {
            localStorage.setItem('adminPassword', password);
            window.location.href = '/dashboard';
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    return (
        <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-10/12 lg:w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Turflo Admin Login
                </h1>
                <p className="text-gray-500 mb-6 text-center">
                    Please enter the admin password to access the dashboard.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
