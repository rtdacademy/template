import React, { useState, useEffect } from 'react';

const MidtermExam = () => {
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
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            <h1 className="text-3xl font-bold mb-4">Midterm Exam</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                📝 Exam 1
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Unit 3
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
            style={{ width: `${calculateProgress()}%` }}
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

export default MidtermExam;