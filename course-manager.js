#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompts = require('prompts');

// ANSI color codes for better CLI output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Paths
const COURSE_CONFIG_PATH = path.join(__dirname, 'src', 'course', 'course-config.json');
const CONTENT_REGISTRY_PATH = path.join(__dirname, 'src', 'course', 'content-registry.js');
const UNITS_PATH = path.join(__dirname, 'src', 'course', 'units');
const BACKUPS_PATH = path.join(__dirname, 'course-backups');
const COURSE_STRUCTURES_PATH = path.join(__dirname, 'course-structures');

// Ensure directories exist
if (!fs.existsSync(BACKUPS_PATH)) {
  fs.mkdirSync(BACKUPS_PATH, { recursive: true });
}
if (!fs.existsSync(COURSE_STRUCTURES_PATH)) {
  fs.mkdirSync(COURSE_STRUCTURES_PATH, { recursive: true });
}

// Templates for different content types
const templates = {
  lesson: {
    index: (title, unitNum, lessonNum) => `import React from 'react';

const ${title.replace(/\s+/g, '')} = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">${title}</h1>
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
{\`// Add code examples here
const example = "Hello World";
console.log(example);\`}
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

export default ${title.replace(/\s+/g, '')};`,
    notes: (unitNum, lessonNum, title) => `INSTRUCTOR NOTES - Unit ${unitNum}, Lesson ${lessonNum}: ${title}
${'='.repeat(60)}

PURPOSE:
[Describe the purpose of this lesson]

KEY TEACHING POINTS:
1. [Key point 1]
2. [Key point 2]
3. [Key point 3]

TIMING SUGGESTIONS:
- Introduction: 5-10 minutes
- Main Content: 15-20 minutes
- Practice Exercise: 10-15 minutes
- Summary: 5 minutes

COMMON STUDENT QUESTIONS:
Q: [Common question 1]
A: [Answer]

Q: [Common question 2]
A: [Answer]

ADDITIONAL RESOURCES:
- [Resource 1]
- [Resource 2]
- [Resource 3]

ASSESSMENT IDEAS:
- [Assessment idea 1]
- [Assessment idea 2]

NOTES FOR IMPROVEMENT:
[Add your observations here after teaching this lesson]`,
    questions: (unitNum, lessonNum, title) => `ASSESSMENT QUESTIONS - Unit ${unitNum}, Lesson ${lessonNum}: ${title}
${'='.repeat(60)}

MULTIPLE CHOICE QUESTIONS:
--------------------------

Question 1:
[Question text]
a) [Option A]
b) [Option B]  [CORRECT]
c) [Option C]
d) [Option D]

Feedback for correct: [Positive feedback]
Feedback for incorrect: [Helpful feedback]

---

Question 2:
[Question text]
a) [Option A]
b) [Option B]
c) [Option C]  [CORRECT]
d) [Option D]

Feedback for correct: [Positive feedback]
Feedback for incorrect: [Helpful feedback]

---

SHORT ANSWER QUESTIONS:
-----------------------

Question 1:
[Question text]

Sample Answer:
[Expected answer]

---

PRACTICAL EXERCISE:
------------------

Exercise 1: [Exercise Title]
[Exercise instructions]

---

DISCUSSION QUESTIONS:
--------------------

1. [Discussion question 1]
2. [Discussion question 2]
3. [Discussion question 3]`
  },
  assignment: {
    index: (title, unitNum, assignmentNum) => `import React from 'react';

const ${title.replace(/\s+/g, '')} = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">${title}</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            📝 Assignment ${assignmentNum}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Unit ${unitNum}
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

export default ${title.replace(/\s+/g, '')};`,
    instructions: (unitNum, assignmentNum, title) => `ASSIGNMENT INSTRUCTIONS - Unit ${unitNum}, Assignment ${assignmentNum}: ${title}
${'='.repeat(60)}

OBJECTIVE:
[Describe what students will learn/demonstrate through this assignment]

DETAILED INSTRUCTIONS:
1. [Step 1]
2. [Step 2]
3. [Step 3]

REQUIREMENTS:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

DELIVERABLES:
- [What students need to submit]

DUE DATE:
[Specify due date]

SUBMISSION FORMAT:
[Describe how work should be formatted/submitted]

TIPS FOR SUCCESS:
- [Tip 1]
- [Tip 2]
- [Tip 3]`,
    rubric: (unitNum, assignmentNum, title) => `GRADING RUBRIC - Unit ${unitNum}, Assignment ${assignmentNum}: ${title}
${'='.repeat(60)}

TOTAL POINTS: 100

GRADING CRITERIA:
-----------------

1. CRITERION 1 (25 points)
   Excellent (23-25): [Description]
   Good (18-22): [Description]
   Satisfactory (13-17): [Description]
   Needs Improvement (0-12): [Description]

2. CRITERION 2 (25 points)
   Excellent (23-25): [Description]
   Good (18-22): [Description]
   Satisfactory (13-17): [Description]
   Needs Improvement (0-12): [Description]

3. CRITERION 3 (25 points)
   Excellent (23-25): [Description]
   Good (18-22): [Description]
   Satisfactory (13-17): [Description]
   Needs Improvement (0-12): [Description]

4. CRITERION 4 (25 points)
   Excellent (23-25): [Description]
   Good (18-22): [Description]
   Satisfactory (13-17): [Description]
   Needs Improvement (0-12): [Description]

LATE SUBMISSION POLICY:
[Describe penalties for late submission]

FEEDBACK NOTES:
[Space for instructor feedback]`
  },
  quiz: {
    index: (title, unitNum, quizNum) => `import React, { useState } from 'react';

const ${title.replace(/\s+/g, '')} = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Quiz questions would be loaded from questions.txt in a real implementation
  const questions = [
    {
      id: 1,
      question: "[Question 1 text]",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 0
    },
    {
      id: 2,
      question: "[Question 2 text]",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 1
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">${title}</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            📝 Quiz ${quizNum}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Unit ${unitNum}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {questions.length} Questions
          </span>
        </div>
      </section>

      {!showResults ? (
        <>
          {/* Question Display */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={\`question-\${questions[currentQuestion].id}\`}
                    checked={selectedAnswers[questions[currentQuestion].id] === index}
                    onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results Display */
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <div className="text-center py-8">
            <div className="text-5xl font-bold mb-4">
              {calculateScore().toFixed(0)}%
            </div>
            <p className="text-gray-600">
              You got {questions.filter(q => selectedAnswers[q.id] === q.correct).length} out of {questions.length} questions correct
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ${title.replace(/\s+/g, '')};`,
    questions: (unitNum, quizNum, title) => `QUIZ QUESTIONS - Unit ${unitNum}, Quiz ${quizNum}: ${title}
${'='.repeat(60)}

QUIZ SETTINGS:
- Time Limit: [e.g., 30 minutes]
- Number of Questions: [e.g., 10]
- Points per Question: [e.g., 10]
- Total Points: [e.g., 100]
- Passing Score: [e.g., 70%]

QUESTIONS:
----------

Question 1:
[Question text]
a) [Option A]
b) [Option B]  [CORRECT]
c) [Option C]
d) [Option D]

Explanation: [Why this answer is correct]

---

Question 2:
[Question text]
a) [Option A]
b) [Option B]
c) [Option C]  [CORRECT]
d) [Option D]

Explanation: [Why this answer is correct]

---

Question 3:
[Question text]
a) [Option A]  [CORRECT]
b) [Option B]
c) [Option C]
d) [Option D]

Explanation: [Why this answer is correct]

---

[Add more questions as needed]`,
    answers: (unitNum, quizNum, title) => `ANSWER KEY - Unit ${unitNum}, Quiz ${quizNum}: ${title}
${'='.repeat(60)}

QUICK ANSWER KEY:
1. B
2. C
3. A
[Continue for all questions]

DETAILED ANSWERS:
-----------------

Question 1: B
Explanation: [Detailed explanation of why B is correct and why other options are incorrect]

Question 2: C
Explanation: [Detailed explanation of why C is correct and why other options are incorrect]

Question 3: A
Explanation: [Detailed explanation of why A is correct and why other options are incorrect]

[Continue for all questions]

COMMON MISTAKES TO WATCH FOR:
- [Common mistake 1]
- [Common mistake 2]
- [Common mistake 3]

TEACHING NOTES:
[Notes about what concepts students struggle with based on quiz results]`
  },
  exam: {
    index: (title, unitNum, examNum) => `import React, { useState, useEffect } from 'react';

const ${title.replace(/\s+/g, '')} = () => {
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Timer
  useEffect(() => {
    if (timeRemaining > 0 && !examSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, examSubmitted]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return \`\${hours.toString().padStart(2, '0')}:\${minutes.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

  // Exam questions would be loaded from questions.txt in a real implementation
  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: "[Question 1 text]",
      options: ["Option A", "Option B", "Option C", "Option D"],
      points: 10
    },
    {
      id: 2,
      type: 'short-answer',
      question: "[Question 2 text]",
      points: 15
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your exam? You cannot change your answers after submission.')) {
      setExamSubmitted(true);
    }
  };

  const calculateProgress = () => {
    const answered = Object.keys(selectedAnswers).length;
    return (answered / questions.length) * 100;
  };

  if (examSubmitted) {
    return (
      <div className="space-y-8">
        <section className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Exam Submitted Successfully!</p>
          <p>Your answers have been recorded. Results will be available after grading.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Timer */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">${title}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                📝 Exam ${examNum}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Unit ${unitNum}
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm mb-2">Time Remaining</p>
            <p className="text-3xl font-bold font-mono">{formatTime(timeRemaining)}</p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Object.keys(selectedAnswers).length} of {questions.length} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: \`\${calculateProgress()}%\` }}
          />
        </div>
      </div>

      {/* Exam Instructions */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-2">Exam Instructions</h2>
        <ul className="text-sm space-y-1">
          <li>• This exam is timed. You have 60 minutes to complete all questions.</li>
          <li>• Once submitted, you cannot change your answers.</li>
          <li>• Make sure to answer all questions before submitting.</li>
          <li>• Your progress is automatically saved.</li>
        </ul>
      </section>

      {/* Questions */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        {/* Question content would go here */}
      </section>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default ${title.replace(/\s+/g, '')};`,
    questions: (unitNum, examNum, title) => `EXAM QUESTIONS - Unit ${unitNum}, Exam ${examNum}: ${title}
${'='.repeat(60)}

EXAM INFORMATION:
- Time Limit: 60 minutes
- Total Questions: [Number]
- Total Points: 100
- Passing Score: 70%
- Format: Closed book / Open book

INSTRUCTIONS TO STUDENTS:
- Read each question carefully
- Manage your time wisely
- Answer all questions
- Review your answers before submitting

SECTION A: MULTIPLE CHOICE (50 points)
---------------------------------------
[5 points each]

Question 1:
[Question text]
a) [Option A]
b) [Option B]  [CORRECT]
c) [Option C]
d) [Option D]

Question 2:
[Question text]
a) [Option A]
b) [Option B]
c) [Option C]  [CORRECT]
d) [Option D]

[Continue for 10 questions]

SECTION B: SHORT ANSWER (30 points)
------------------------------------
[10 points each]

Question 11:
[Question requiring 2-3 sentence answer]

Expected Answer:
[Model answer]

Question 12:
[Question requiring 2-3 sentence answer]

Expected Answer:
[Model answer]

Question 13:
[Question requiring 2-3 sentence answer]

Expected Answer:
[Model answer]

SECTION C: ESSAY/LONG ANSWER (20 points)
-----------------------------------------

Question 14:
[Essay question requiring detailed response]

Grading Rubric:
- Understanding of concept (10 points)
- Application of knowledge (5 points)
- Clear explanation (5 points)

Model Answer:
[Detailed model answer]`,
    answers: (unitNum, examNum, title) => `EXAM ANSWER KEY - Unit ${unitNum}, Exam ${examNum}: ${title}
${'='.repeat(60)}

SECTION A: MULTIPLE CHOICE ANSWERS
-----------------------------------
1. B    6. A
2. C    7. D
3. A    8. B
4. D    9. C
5. B   10. A

SECTION B: SHORT ANSWER KEY POINTS
-----------------------------------
Question 11:
Key points to include:
- [Point 1]
- [Point 2]
- [Point 3]

Question 12:
Key points to include:
- [Point 1]
- [Point 2]
- [Point 3]

Question 13:
Key points to include:
- [Point 1]
- [Point 2]
- [Point 3]

SECTION C: ESSAY GRADING GUIDE
-------------------------------
Question 14:

Excellent (18-20 points):
- Demonstrates complete understanding
- Provides specific examples
- Clear and well-organized response

Good (14-17 points):
- Shows good understanding
- Some examples provided
- Generally clear response

Satisfactory (10-13 points):
- Basic understanding evident
- Limited examples
- Some organization issues

Needs Improvement (0-9 points):
- Minimal understanding
- No or incorrect examples
- Poor organization

GRADING NOTES:
- Partial credit may be awarded
- Consider student's overall understanding
- Look for evidence of critical thinking`,
    rubric: (unitNum, examNum, title) => `EXAM GRADING RUBRIC - Unit ${unitNum}, Exam ${examNum}: ${title}
${'='.repeat(60)}

OVERALL GRADING BREAKDOWN:
- Section A (Multiple Choice): 50 points
- Section B (Short Answer): 30 points
- Section C (Essay): 20 points
- TOTAL: 100 points

GRADE SCALE:
A: 90-100 points
B: 80-89 points
C: 70-79 points
D: 60-69 points
F: Below 60 points

DETAILED RUBRIC:
----------------

SECTION A: MULTIPLE CHOICE (50 points)
- Each question worth 5 points
- No partial credit

SECTION B: SHORT ANSWER (30 points)
Each question worth 10 points:
- Complete answer with all key points: 10 points
- Good answer missing minor details: 7-9 points
- Basic answer with main idea: 4-6 points
- Minimal or incorrect answer: 0-3 points

SECTION C: ESSAY (20 points)
Content & Understanding (10 points):
- Exceptional understanding: 9-10 points
- Good understanding: 7-8 points
- Basic understanding: 5-6 points
- Poor understanding: 0-4 points

Application & Examples (5 points):
- Excellent examples: 5 points
- Good examples: 3-4 points
- Basic examples: 1-2 points
- No examples: 0 points

Organization & Clarity (5 points):
- Excellent organization: 5 points
- Good organization: 3-4 points
- Basic organization: 1-2 points
- Poor organization: 0 points

LATE EXAM POLICY:
[Specify policy]

MAKE-UP EXAM POLICY:
[Specify policy]

ACADEMIC INTEGRITY:
[Specify consequences for cheating]`
  }
};

// Helper functions
function loadCourseConfig() {
  try {
    return JSON.parse(fs.readFileSync(COURSE_CONFIG_PATH, 'utf8'));
  } catch (error) {
    console.error(`${colors.red}Error loading course config:${colors.reset}`, error.message);
    return null;
  }
}

function saveCourseConfig(config) {
  try {
    fs.writeFileSync(COURSE_CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log(`${colors.green}✓${colors.reset} Course config updated`);
  } catch (error) {
    console.error(`${colors.red}Error saving course config:${colors.reset}`, error.message);
    return false;
  }
  return true;
}

function loadContentRegistry() {
  try {
    return fs.readFileSync(CONTENT_REGISTRY_PATH, 'utf8');
  } catch (error) {
    console.error(`${colors.red}Error loading content registry:${colors.reset}`, error.message);
    return null;
  }
}

function saveContentRegistry(content) {
  try {
    fs.writeFileSync(CONTENT_REGISTRY_PATH, content);
    console.log(`${colors.green}✓${colors.reset} Content registry updated`);
  } catch (error) {
    console.error(`${colors.red}Error saving content registry:${colors.reset}`, error.message);
    return false;
  }
  return true;
}

// Backup and Restore Functions
function createBackup(backupName = null) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
  const backupDir = path.join(BACKUPS_PATH, backupName || `backup-${timestamp}`);
  
  try {
    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });
    
    // Backup course-config.json
    const config = loadCourseConfig();
    if (config) {
      fs.writeFileSync(path.join(backupDir, 'course-config.json'), JSON.stringify(config, null, 2));
    }
    
    // Backup content-registry.js
    const registry = loadContentRegistry();
    if (registry) {
      fs.writeFileSync(path.join(backupDir, 'content-registry.js'), registry);
    }
    
    // Backup units folder
    if (fs.existsSync(UNITS_PATH)) {
      copyFolderRecursive(UNITS_PATH, path.join(backupDir, 'units'));
    }
    
    console.log(`${colors.green}✅ Backup created successfully: ${backupDir}${colors.reset}`);
    return backupDir;
  } catch (error) {
    console.error(`${colors.red}Error creating backup:${colors.reset}`, error.message);
    return null;
  }
}

function restoreBackup(backupName) {
  const backupDir = path.join(BACKUPS_PATH, backupName);
  
  if (!fs.existsSync(backupDir)) {
    console.error(`${colors.red}Backup not found: ${backupName}${colors.reset}`);
    return false;
  }
  
  try {
    // Create a safety backup first
    console.log(`${colors.yellow}Creating safety backup before restore...${colors.reset}`);
    const safetyBackup = createBackup('pre-restore-backup');
    
    if (!safetyBackup) {
      console.error(`${colors.red}Failed to create safety backup. Aborting restore.${colors.reset}`);
      return false;
    }
    
    // Restore course-config.json
    const configPath = path.join(backupDir, 'course-config.json');
    if (fs.existsSync(configPath)) {
      fs.copyFileSync(configPath, COURSE_CONFIG_PATH);
      console.log(`${colors.green}✓${colors.reset} Restored course-config.json`);
    }
    
    // Restore content-registry.js
    const registryPath = path.join(backupDir, 'content-registry.js');
    if (fs.existsSync(registryPath)) {
      fs.copyFileSync(registryPath, CONTENT_REGISTRY_PATH);
      console.log(`${colors.green}✓${colors.reset} Restored content-registry.js`);
    }
    
    // Clear and restore units folder
    const backupUnitsPath = path.join(backupDir, 'units');
    if (fs.existsSync(backupUnitsPath)) {
      // Remove existing units folder
      if (fs.existsSync(UNITS_PATH)) {
        deleteFolderRecursive(UNITS_PATH);
      }
      // Copy backup units
      copyFolderRecursive(backupUnitsPath, UNITS_PATH);
      console.log(`${colors.green}✓${colors.reset} Restored units folder`);
    }
    
    console.log(`${colors.green}✅ Backup restored successfully from: ${backupName}${colors.reset}`);
    console.log(`${colors.cyan}Safety backup saved as: pre-restore-backup${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error restoring backup:${colors.reset}`, error.message);
    return false;
  }
}

function listBackups() {
  try {
    const backups = fs.readdirSync(BACKUPS_PATH).filter(f => fs.statSync(path.join(BACKUPS_PATH, f)).isDirectory());
    
    if (backups.length === 0) {
      console.log(`${colors.yellow}No backups found${colors.reset}`);
      return [];
    }
    
    console.log(`\n${colors.cyan}Available Backups:${colors.reset}`);
    backups.forEach((backup, index) => {
      const stats = fs.statSync(path.join(BACKUPS_PATH, backup));
      console.log(`  ${index + 1}. ${backup} (${stats.mtime.toLocaleString()})`);
    });
    
    return backups;
  } catch (error) {
    console.error(`${colors.red}Error listing backups:${colors.reset}`, error.message);
    return [];
  }
}

// Helper function to list available course structures
function listAvailableCourseStructures() {
  try {
    if (!fs.existsSync(COURSE_STRUCTURES_PATH)) {
      return [];
    }
    const files = fs.readdirSync(COURSE_STRUCTURES_PATH)
      .filter(file => file.endsWith('.json'));
    return files;
  } catch (error) {
    console.error(`${colors.red}Error listing course structures:${colors.reset}`, error.message);
    return [];
  }
}

// Import/Export Functions
function exportCourse(exportPath = null) {
  const config = loadCourseConfig();
  if (!config) {
    console.error(`${colors.red}Failed to load course configuration${colors.reset}`);
    return false;
  }
  
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
  const fileName = exportPath || path.join(COURSE_STRUCTURES_PATH, `course-export-${timestamp}.json`);
  
  try {
    fs.writeFileSync(fileName, JSON.stringify(config, null, 2));
    console.log(`${colors.green}✅ Course structure exported to: ${fileName}${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error exporting course:${colors.reset}`, error.message);
    return false;
  }
}

function importCourse(importPath, clearExisting = false) {
  // Check if file exists in course-structures directory first
  let fullPath = importPath;
  if (!path.isAbsolute(importPath)) {
    const inStructuresDir = path.join(COURSE_STRUCTURES_PATH, importPath);
    if (fs.existsSync(inStructuresDir)) {
      fullPath = inStructuresDir;
    } else if (!fs.existsSync(importPath)) {
      console.error(`${colors.red}Import file not found: ${importPath}${colors.reset}`);
      console.log(`${colors.yellow}Tip: Place JSON files in the 'course-structures' directory${colors.reset}`);
      return false;
    }
  } else if (!fs.existsSync(fullPath)) {
    console.error(`${colors.red}Import file not found: ${fullPath}${colors.reset}`);
    return false;
  }
  
  try {
    const importData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    
    // Validate structure
    if (!importData.units || !Array.isArray(importData.units)) {
      console.error(`${colors.red}Invalid course structure: missing units array${colors.reset}`);
      return false;
    }
    
    // Create backup before import
    console.log(`${colors.yellow}Creating backup before import...${colors.reset}`);
    const backupName = createBackup('pre-import-backup');
    
    if (!backupName) {
      console.error(`${colors.red}Failed to create backup. Aborting import.${colors.reset}`);
      return false;
    }
    
    if (clearExisting) {
      // Clear existing structure
      console.log(`${colors.yellow}Clearing existing course structure...${colors.reset}`);
      clearCourseStructure();
    }
    
    // Process each unit
    importData.units.forEach(unit => {
      const unitNum = unit.id.match(/\d+/)[0];
      
      // Create unit folder
      const unitPath = path.join(UNITS_PATH, unit.id);
      if (!fs.existsSync(unitPath)) {
        fs.mkdirSync(unitPath, { recursive: true });
        console.log(`${colors.green}✓${colors.reset} Created unit: ${unit.title}`);
      }
      
      // Process lessons
      if (unit.lessons && Array.isArray(unit.lessons)) {
        unit.lessons.forEach(lesson => {
          const match = lesson.id.match(/unit(\d+)-(\w+)(\d+)/);
          if (match) {
            const [, , type, num] = match;
            const folderPath = path.join(unitPath, `${type}-${num}`);
            
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
              
              // Create template files based on type
              if (templates[type]) {
                if (templates[type].index) {
                  fs.writeFileSync(
                    path.join(folderPath, 'index.js'),
                    templates[type].index(lesson.title, unitNum, num)
                  );
                }
                if (templates[type].notes) {
                  fs.writeFileSync(
                    path.join(folderPath, 'notes.txt'),
                    templates[type].notes(unitNum, num, lesson.title)
                  );
                }
                if (templates[type].questions) {
                  fs.writeFileSync(
                    path.join(folderPath, 'questions.txt'),
                    templates[type].questions(unitNum, num, lesson.title)
                  );
                }
                if (templates[type].instructions) {
                  fs.writeFileSync(
                    path.join(folderPath, 'instructions.txt'),
                    templates[type].instructions(unitNum, num, lesson.title)
                  );
                }
                if (templates[type].rubric) {
                  fs.writeFileSync(
                    path.join(folderPath, 'rubric.txt'),
                    templates[type].rubric(unitNum, num, lesson.title)
                  );
                }
                if (templates[type].answers) {
                  fs.writeFileSync(
                    path.join(folderPath, 'answers.txt'),
                    templates[type].answers(unitNum, num, lesson.title)
                  );
                }
              }
              
              console.log(`${colors.green}✓${colors.reset} Created ${type}: ${lesson.title}`);
            }
          }
        });
      }
    });
    
    // Update course config
    const currentConfig = clearExisting ? {} : loadCourseConfig();
    const newConfig = {
      ...currentConfig,
      ...importData,
      units: clearExisting ? importData.units : [...(currentConfig.units || []), ...importData.units]
    };
    
    saveCourseConfig(newConfig);
    
    // Update content registry for lessons and assignments
    updateContentRegistryForImport(importData.units);
    
    console.log(`${colors.green}✅ Course imported successfully from: ${importPath}${colors.reset}`);
    console.log(`${colors.cyan}Backup saved as: pre-import-backup${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error importing course:${colors.reset}`, error.message);
    return false;
  }
}

function clearCourseStructure() {
  try {
    // Clear units folder
    if (fs.existsSync(UNITS_PATH)) {
      deleteFolderRecursive(UNITS_PATH);
      fs.mkdirSync(UNITS_PATH, { recursive: true });
    }
    
    // Reset course config
    const emptyConfig = {
      courseInfo: {
        title: "Course Title",
        description: "Course Description",
        instructor: "Instructor Name"
      },
      units: []
    };
    saveCourseConfig(emptyConfig);
    
    // Reset content registry
    const emptyRegistry = `// Content Registry - Auto-generated
// This file maps content IDs to their React components

const contentRegistry = {
  // Content will be added here automatically
};

export default contentRegistry;`;
    saveContentRegistry(emptyRegistry);
    
    console.log(`${colors.green}✓${colors.reset} Course structure cleared`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error clearing course structure:${colors.reset}`, error.message);
    return false;
  }
}

function updateContentRegistryForImport(units) {
  let registry = loadContentRegistry() || '';
  const imports = [];
  const registryEntries = [];
  
  units.forEach(unit => {
    const unitNum = unit.id.match(/\d+/)[0];
    
    if (unit.lessons) {
      unit.lessons.forEach(lesson => {
        if (lesson.type === 'lesson' || lesson.type === 'assignment') {
          const match = lesson.id.match(/unit(\d+)-(\w+)(\d+)/);
          if (match) {
            const [, , type, num] = match;
            const componentName = `Unit${unitNum}${type.charAt(0).toUpperCase() + type.slice(1)}${num}`;
            imports.push(`import ${componentName} from './units/unit-${unitNum}/${type}-${num}';`);
            registryEntries.push(`  '${lesson.id}': ${componentName}`);
          }
        }
      });
    }
  });
  
  // Build new registry
  const newRegistry = `// Content Registry - Auto-generated
// This file maps content IDs to their React components

${imports.join('\n')}

const contentRegistry = {
${registryEntries.join(',\n')}
};

export default contentRegistry;`;
  
  saveContentRegistry(newRegistry);
}

// Utility functions
function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.join(folderPath, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

// Enhanced Interactive Mode
async function enhancedInteractiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log(`\n${colors.bright}${colors.magenta}📚 Course Manager${colors.reset}\n`);

  // New arrow-key interactive menu using 'prompts'
  while (true) {
    const main = await prompts({
      type: 'select',
      name: 'action',
      message: 'Main Menu',
      choices: [
        { title: 'Content Management (Add/List content)', value: 'content' },
        { title: 'Course Structure Management', value: 'structure' },
        { title: 'Backup & Restore', value: 'backup' },
        { title: 'Import & Export', value: 'importExport' },
        { title: 'Exit', value: 'exit' },
      ],
      initial: 0
    });

    if (main.action === 'exit' || main.action === undefined) {
      console.log(`\n${colors.green}Goodbye!${colors.reset}\n`);
      return;
    }

    if (main.action === 'content') {
      const cm = await prompts({
        type: 'select',
        name: 'choice',
        message: 'Content Management',
        choices: [
          { title: 'Add a unit', value: 'addUnit' },
          { title: 'Add a lesson', value: 'addLesson' },
          { title: 'Add an assignment', value: 'addAssignment' },
          { title: 'Add a quiz', value: 'addQuiz' },
          { title: 'Add an exam', value: 'addExam' },
          { title: 'List all content', value: 'list' },
          { title: 'Back', value: 'back' },
        ],
        initial: 0
      });

      switch (cm.choice) {
        case 'list':
          listContent();
          break;
        case 'back':
        case undefined:
          break;
        default:
          console.log(`${colors.yellow}This action is not yet implemented in interactive mode. Use import/export for now.${colors.reset}`);
      }
      continue;
    }

    if (main.action === 'structure') {
      const sm = await prompts({
        type: 'select',
        name: 'choice',
        message: 'Course Structure Management',
        choices: [
          { title: 'Clear current structure (with backup)', value: 'clear' },
          { title: 'Create original/default structure', value: 'original' },
          { title: 'View current structure', value: 'view' },
          { title: 'Back', value: 'back' },
        ]
      });

      if (sm.choice === 'clear') {
        const confirm = await prompts({ type: 'confirm', name: 'ok', message: 'Create backup and clear current structure?', initial: false });
        if (confirm.ok) {
          const backupName = createBackup('before-clear');
          if (backupName) {
            clearCourseStructure();
            console.log(`${colors.green}Structure cleared. Backup saved as: before-clear${colors.reset}`);
          }
        }
      } else if (sm.choice === 'original') {
        createOriginalStructure();
      } else if (sm.choice === 'view') {
        listContent();
      }
      continue;
    }

    if (main.action === 'backup') {
      const bm = await prompts({
        type: 'select',
        name: 'choice',
        message: 'Backup & Restore',
        choices: [
          { title: 'Create backup', value: 'create' },
          { title: 'Restore from backup', value: 'restore' },
          { title: 'List available backups', value: 'list' },
          { title: 'Back', value: 'back' },
        ]
      });

      if (bm.choice === 'create') {
        const name = await prompts({ type: 'text', name: 'n', message: 'Backup name (optional):' });
        createBackup(name.n || null);
      } else if (bm.choice === 'restore') {
        const backups = listBackups();
        if (backups.length > 0) {
          const sel = await prompts({
            type: 'select', name: 'b', message: 'Select backup to restore',
            choices: backups.map((b) => ({ title: b, value: b }))
          });
          if (sel.b) {
            const confirm = await prompts({ type: 'confirm', name: 'ok', message: `Restore from ${sel.b}?`, initial: false });
            if (confirm.ok) restoreBackup(sel.b);
          }
        }
      } else if (bm.choice === 'list') {
        listBackups();
      }
      continue;
    }

    if (main.action === 'importExport') {
      const available = listAvailableCourseStructures();
      const im = await prompts({
        type: 'select',
        name: 'choice',
        message: 'Import & Export',
        choices: [
          { title: 'Import course (merge)', value: 'importMerge' },
          { title: 'Import course (clear existing first)', value: 'importClear' },
          { title: 'Export current course', value: 'export' },
          { title: 'Back', value: 'back' },
        ]
      });

      if (im.choice === 'importMerge' || im.choice === 'importClear') {
        const fileChoice = await prompts({
          type: 'select',
          name: 'file',
          message: 'Select JSON file (or choose Manual Path)',
          choices: [
            ...available.map(f => ({ title: f, value: f })),
            { title: 'Manual path...', value: '__manual__' }
          ]
        });
        let filePath = fileChoice.file;
        if (filePath === '__manual__') {
          const manual = await prompts({ type: 'text', name: 'p', message: 'Enter path to JSON file:' });
          filePath = manual.p;
        }
        if (filePath) {
          const clear = im.choice === 'importClear';
          if (clear) {
            const confirm = await prompts({ type: 'confirm', name: 'ok', message: 'This will clear existing content. Proceed?', initial: false });
            if (!confirm.ok) continue;
          }
          importCourse(filePath, clear);
        }
      } else if (im.choice === 'export') {
        const out = await prompts({ type: 'text', name: 'f', message: 'Export filename (optional, .json will be added if missing):' });
        let exportPath = out.f;
        if (exportPath && !exportPath.endsWith('.json')) exportPath = exportPath + '.json';
        if (exportPath) exportPath = path.join(COURSE_STRUCTURES_PATH, exportPath);
        exportCourse(exportPath || null);
      }
      continue;
    }
  }

  // Legacy numeric input mode (unreached because of early return above)
  return;
  
  function showMainMenu() {
    console.log(`
${colors.cyan}Main Menu:${colors.reset}
1. Content Management (Add/List content)
2. ${colors.magenta}Course Structure Management${colors.reset}
3. ${colors.blue}Backup & Restore${colors.reset}
4. ${colors.green}Import & Export${colors.reset}
5. Exit

`);
    
    rl.question('Enter your choice (1-5): ', (choice) => {
      handleMainChoice(choice);
    });
  }
  
  function handleMainChoice(choice) {
    switch(choice) {
      case '1':
        contentManagementMenu();
        break;
      case '2':
        courseStructureMenu();
        break;
      case '3':
        backupRestoreMenu();
        break;
      case '4':
        importExportMenu();
        break;
      case '5':
        console.log(`\n${colors.green}Goodbye!${colors.reset}\n`);
        rl.close();
        process.exit(0);
        break;
      default:
        console.log(`${colors.red}Invalid choice. Please try again.${colors.reset}`);
        showMainMenu();
    }
  }
  
  function contentManagementMenu() {
    console.log(`
${colors.cyan}Content Management:${colors.reset}
1. Add a unit
2. Add a lesson
3. Add an assignment
4. Add a quiz
5. Add an exam
6. List all content
7. Back to main menu

`);
    
    rl.question('Enter your choice (1-7): ', (choice) => {
      if (choice === '7') {
        showMainMenu();
        return;
      }
      // Handle content management choices (similar to original interactive mode)
      // ... (implement the existing content management logic)
      contentManagementMenu();
    });
  }
  
  function courseStructureMenu() {
    console.log(`
${colors.magenta}Course Structure Management:${colors.reset}
1. Clear current structure (with backup)
2. Create original/default structure
3. View current structure
4. Back to main menu

`);
    
    rl.question('Enter your choice (1-4): ', (choice) => {
      switch(choice) {
        case '1':
          rl.question(`${colors.yellow}Are you sure you want to clear the current structure? A backup will be created. (yes/no): ${colors.reset}`, (answer) => {
            if (answer.toLowerCase() === 'yes') {
              const backupName = createBackup('before-clear');
              if (backupName) {
                clearCourseStructure();
                console.log(`${colors.green}Structure cleared. Backup saved as: before-clear${colors.reset}`);
              }
            }
            courseStructureMenu();
          });
          break;
        case '2':
          createOriginalStructure();
          courseStructureMenu();
          break;
        case '3':
          listContent();
          courseStructureMenu();
          break;
        case '4':
          showMainMenu();
          break;
        default:
          console.log(`${colors.red}Invalid choice${colors.reset}`);
          courseStructureMenu();
      }
    });
  }
  
  function backupRestoreMenu() {
    console.log(`
${colors.blue}Backup & Restore:${colors.reset}
1. Create backup
2. Restore from backup
3. List available backups
4. Back to main menu

`);
    
    rl.question('Enter your choice (1-4): ', (choice) => {
      switch(choice) {
        case '1':
          rl.question('Enter backup name (or press Enter for auto-generated): ', (name) => {
            createBackup(name || null);
            backupRestoreMenu();
          });
          break;
        case '2':
          const backups = listBackups();
          if (backups.length > 0) {
            rl.question('Enter backup name or number to restore: ', (input) => {
              const backupName = isNaN(input) ? input : backups[parseInt(input) - 1];
              if (backupName) {
                rl.question(`${colors.yellow}Are you sure you want to restore from ${backupName}? (yes/no): ${colors.reset}`, (answer) => {
                  if (answer.toLowerCase() === 'yes') {
                    restoreBackup(backupName);
                  }
                  backupRestoreMenu();
                });
              } else {
                console.log(`${colors.red}Invalid selection${colors.reset}`);
                backupRestoreMenu();
              }
            });
          } else {
            backupRestoreMenu();
          }
          break;
        case '3':
          listBackups();
          backupRestoreMenu();
          break;
        case '4':
          showMainMenu();
          break;
        default:
          console.log(`${colors.red}Invalid choice${colors.reset}`);
          backupRestoreMenu();
      }
    });
  }
  
  function importExportMenu() {
    // List available course structures
    const availableStructures = listAvailableCourseStructures();
    
    console.log(`
${colors.green}Import & Export:${colors.reset}
1. Import course from JSON file
2. Import and replace (clear existing)
3. Export current course to JSON
4. List available course structures
5. Back to main menu

`);
    
    if (availableStructures.length > 0) {
      console.log(`${colors.cyan}Available course structures:${colors.reset}`);
      availableStructures.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file}`);
      });
      console.log();
    }
    
    rl.question('Enter your choice (1-5): ', (choice) => {
      switch(choice) {
        case '1':
          rl.question('Enter JSON filename or number from list: ', (input) => {
            let filePath = input;
            if (!isNaN(input) && availableStructures[parseInt(input) - 1]) {
              filePath = availableStructures[parseInt(input) - 1];
            }
            importCourse(filePath, false);
            importExportMenu();
          });
          break;
        case '2':
          rl.question('Enter JSON filename or number from list: ', (input) => {
            let filePath = input;
            if (!isNaN(input) && availableStructures[parseInt(input) - 1]) {
              filePath = availableStructures[parseInt(input) - 1];
            }
            rl.question(`${colors.yellow}This will clear existing content. Are you sure? (yes/no): ${colors.reset}`, (answer) => {
              if (answer.toLowerCase() === 'yes') {
                importCourse(filePath, true);
              }
              importExportMenu();
            });
          });
          break;
        case '3':
          rl.question('Enter export filename (or press Enter for auto-generated): ', (filename) => {
            let exportPath = filename;
            if (filename && !filename.endsWith('.json')) {
              exportPath = filename + '.json';
            }
            if (exportPath) {
              exportPath = path.join(COURSE_STRUCTURES_PATH, exportPath);
            }
            exportCourse(exportPath || null);
            importExportMenu();
          });
          break;
        case '4':
          listAvailableCourseStructures();
          importExportMenu();
          break;
        case '5':
          showMainMenu();
          break;
        default:
          console.log(`${colors.red}Invalid choice${colors.reset}`);
          importExportMenu();
      }
    });
  }
  
  showMainMenu();
}

function createOriginalStructure() {
  console.log(`${colors.yellow}Creating original/default course structure...${colors.reset}`);
  
  const originalStructure = {
    courseInfo: {
      title: "My Course Title",
      description: "Course description goes here",
      instructor: "Instructor Name"
    },
    units: [
      {
        id: "unit-1",
        title: "Unit 1: Introduction",
        description: "Getting started with the course",
        lessons: []
      },
      {
        id: "unit-2",
        title: "Unit 2: Core Concepts",
        description: "Main course content",
        lessons: []
      }
    ]
  };
  
  saveCourseConfig(originalStructure);
  console.log(`${colors.green}✓ Original structure created${colors.reset}`);
}

function listContent() {
  const config = loadCourseConfig();
  if (!config) {
    console.log(`${colors.red}Failed to load course configuration${colors.reset}`);
    return;
  }
  
  console.log(`\n${colors.bright}${colors.cyan}Course Structure:${colors.reset}\n`);
  
  if (config.courseInfo) {
    console.log(`${colors.bright}Course: ${config.courseInfo.title || 'Untitled'}${colors.reset}`);
    if (config.courseInfo.description) {
      console.log(`Description: ${config.courseInfo.description}`);
    }
    console.log();
  }
  
  if (config.units && config.units.length > 0) {
    config.units.forEach(unit => {
      console.log(`${colors.bright}${unit.title}${colors.reset} (${unit.id})`);
      if (unit.lessons && unit.lessons.length > 0) {
        unit.lessons.forEach(lesson => {
          const icon = lesson.type === 'lesson' ? '📖' : 
                      lesson.type === 'assignment' ? '📝' :
                      lesson.type === 'quiz' ? '❓' :
                      lesson.type === 'exam' ? '📋' : '📄';
          console.log(`  ${icon} ${lesson.title} (${lesson.id})`);
        });
      } else {
        console.log(`  ${colors.yellow}(No content yet)${colors.reset}`);
      }
      console.log();
    });
  } else {
    console.log(`${colors.yellow}No units found${colors.reset}`);
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'interactive') {
    enhancedInteractiveMode();
    return;
  }
  
  const command = args[0];
  
  switch(command) {
    case 'backup':
      createBackup(args[1] || null);
      break;
    case 'restore':
      if (!args[1]) {
        console.error(`${colors.red}Please specify backup name${colors.reset}`);
        listBackups();
      } else {
        restoreBackup(args[1]);
      }
      break;
    case 'list-backups':
      listBackups();
      break;
    case 'export':
      exportCourse(args[1] || null);
      break;
    case 'import':
      if (!args[1]) {
        console.error(`${colors.red}Please specify import file path${colors.reset}`);
      } else {
        importCourse(args[1], args[2] === '--clear');
      }
      break;
    case 'clear':
      createBackup('before-clear');
      clearCourseStructure();
      break;
    case 'help':
      console.log(`
${colors.bright}Course Manager - Usage:${colors.reset}

${colors.cyan}Interactive mode:${colors.reset}
  node menu
  node course-manager.js
  node course-manager.js interactive

${colors.cyan}Backup & Restore:${colors.reset}
  node course-manager.js backup [backup-name]
  node course-manager.js restore <backup-name>
  node course-manager.js list-backups

${colors.cyan}Import & Export:${colors.reset}
  node course-manager.js export [filename]
  node course-manager.js import <file-path> [--clear]

${colors.cyan}Course Structure:${colors.reset}
  node course-manager.js clear

${colors.cyan}Examples:${colors.reset}
  node course-manager.js backup my-backup
  node course-manager.js restore my-backup
  node course-manager.js export my-course.json
  node course-manager.js import sample-course-structure.json
  node course-manager.js import new-course.json --clear
      `);
      break;
    default:
      console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
      console.log(`Use 'node course-manager.js help' for usage information`);
  }
}

// Run the script
main();
