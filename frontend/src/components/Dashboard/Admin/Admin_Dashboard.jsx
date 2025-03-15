import React from 'react';

function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Admin Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome to the admin dashboard. Here you can manage users, view reports, and post announcements.
        </p>
        
        {/* Example Sections */}
        <div className="space-y-6">
          {/* User Management Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>View all users</li>
              <li>Add new users</li>
              <li>Update user information</li>
              <li>Delete users</li>
            </ul>
          </div>

          {/* Reports Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Reports</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Report</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Monthly Attendance</td>
                  <td className="py-2 px-4 border-b">March 2025</td>
                  <td className="py-2 px-4 border-b">Completed</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Exam Results</td>
                  <td className="py-2 px-4 border-b">February 2025</td>
                  <td className="py-2 px-4 border-b">Pending</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Fee Collection</td>
                  <td className="py-2 px-4 border-b">January 2025</td>
                  <td className="py-2 px-4 border-b">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Announcements Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Announcements</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>School will be closed on Friday for a public holiday.</li>
              <li>Mid-term exams start next Monday.</li>
              <li>Parent-teacher meetings will be held on the first Friday of next month.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;