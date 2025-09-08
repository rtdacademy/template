import React from 'react';

const Assignment3-FinancialPlanning = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Assignment 3 - Financial Planning</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            📝 Assignment 1
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Unit 3
          </span>
        </div>
      </section>

      {/* Instructions */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Assignment Instructions</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            [Add detailed assignment instructions here]
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Requirements:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Requirement 1</li>
            <li>Requirement 2</li>
            <li>Requirement 3</li>
          </ul>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Submission Guidelines</h2>
        <ul className="space-y-2 text-gray-700">
          <li>📅 Due Date: [Add due date]</li>
          <li>📁 Format: [Specify format]</li>
          <li>📤 Submission Method: [How to submit]</li>
        </ul>
      </section>

      {/* Grading Rubric */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Grading Rubric</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criteria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Criterion 1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  25 pts
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  Description of criterion
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Helpful Resources</h2>
        <ul className="space-y-2 text-gray-700">
          <li>📚 [Resource 1]</li>
          <li>📚 [Resource 2]</li>
          <li>📚 [Resource 3]</li>
        </ul>
      </section>
    </div>
  );
};

export default Assignment3-FinancialPlanning;