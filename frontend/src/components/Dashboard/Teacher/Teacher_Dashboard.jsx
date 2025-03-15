import React from 'react';

function TeacherDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Teacher Dashboard
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome to the teacher dashboard. Here you can manage your courses, view student grades, and post announcements.
        </p>
        
        {/* Example Sections */}
        <div className="space-y-6">
          {/* Courses Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Courses</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Mathematics</li>
              <li>Physics</li>
              <li>Chemistry</li>
              <li>Biology</li>
              <li>English</li>
            </ul>
          </div>

          {/* Student Grades Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Student Grades</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Student</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">John Doe</td>
                  <td className="py-2 px-4 border-b">Mathematics</td>
                  <td className="py-2 px-4 border-b">A</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Jane Smith</td>
                  <td className="py-2 px-4 border-b">Physics</td>
                  <td className="py-2 px-4 border-b">B+</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Alice Johnson</td>
                  <td className="py-2 px-4 border-b">Chemistry</td>
                  <td className="py-2 px-4 border-b">A-</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Bob Brown</td>
                  <td className="py-2 px-4 border-b">Biology</td>
                  <td className="py-2 px-4 border-b">A</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Charlie Davis</td>
                  <td className="py-2 px-4 border-b">English</td>
                  <td className="py-2 px-4 border-b">B</td>
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

export default TeacherDashboard;