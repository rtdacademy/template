import React from 'react';

const IntellectualWellness = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Intellectual Wellness</h1>
        <p className="text-xl mb-6">
          [Add a compelling subtitle here]
        </p>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <p className="text-lg">
            🎯 <strong>Learning Objective:</strong> [Add the main learning objective]
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          [Add introduction content here]
        </p>
      </section>

      {/* Main Content Section */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Main Content</h2>
        <p className="text-gray-700 mb-4">
          [Add main content here]
        </p>
        
        {/* Code Example */}
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm mt-4">
          <pre className="text-gray-800">
{`// Add code examples here
const example = "Hello World";
console.log(example);`}
          </pre>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Key Concepts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Concept 1</h3>
            <p className="text-sm text-gray-700">
              Definition of concept 1
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Concept 2</h3>
            <p className="text-sm text-gray-700">
              Definition of concept 2
            </p>
          </div>
        </div>
      </section>

      {/* Practice Exercise */}
      <section className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-900">
          ✏️ Practice Exercise
        </h2>
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-semibold mb-2">Exercise Title</h3>
          <p className="text-gray-700 mb-4">
            [Add exercise instructions here]
          </p>
          <div className="bg-gray-50 rounded p-3">
            <p className="font-semibold text-sm mb-2">💡 Hints:</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Hint 1</li>
              <li>Hint 2</li>
              <li>Hint 3</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Summary</h2>
        <div className="space-y-2">
          <p>✓ Key point 1</p>
          <p>✓ Key point 2</p>
          <p>✓ Key point 3</p>
        </div>
      </section>
    </div>
  );
};

export default IntellectualWellness;