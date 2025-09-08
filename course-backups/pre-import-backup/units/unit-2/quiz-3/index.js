import React, { useState } from 'react';

const Lesson10-CareerDevelopmentAssessment = () => {
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
        <h1 className="text-3xl font-bold mb-4">Lesson 10 - Career Development Assessment</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            📝 Quiz 3
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Unit 2
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
                    name={`question-${questions[currentQuestion].id}`}
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

export default Lesson10-CareerDevelopmentAssessment;