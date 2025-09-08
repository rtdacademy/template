import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Menu } from 'lucide-react';

const CourseWrapper = ({ courseStructure, contentRegistry }) => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [navExpanded, setNavExpanded] = useState(true);
  
  // Set initial lesson on mount
  useEffect(() => {
    if (courseStructure?.units?.[0]?.lessons?.[0]) {
      setActiveLesson(courseStructure.units[0].lessons[0].id);
    }
  }, [courseStructure]);

  // Get the active lesson component
  const getActiveLessonComponent = () => {
    if (!activeLesson || !contentRegistry[activeLesson]) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Welcome to {courseStructure.title}
            </h2>
            <p className="text-gray-500">
              Select a lesson from the navigation menu to begin
            </p>
          </div>
        </div>
      );
    }
    
    const LessonComponent = contentRegistry[activeLesson];
    return <LessonComponent />;
  };

  // Find active lesson details
  const getActiveLessonDetails = () => {
    for (const unit of courseStructure.units) {
      const lesson = unit.lessons.find(l => l.id === activeLesson);
      if (lesson) {
        return { unit, lesson };
      }
    }
    return null;
  };

  const lessonDetails = getActiveLessonDetails();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Navigation Sidebar */}
      <Navigation
        courseStructure={courseStructure}
        activeLesson={activeLesson}
        onLessonSelect={setActiveLesson}
        expanded={navExpanded}
        onToggleExpand={() => setNavExpanded(!navExpanded)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!navExpanded && (
                <button
                  onClick={() => setNavExpanded(true)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              {lessonDetails && (
                <div>
                  <div className="text-sm text-gray-500">{lessonDetails.unit.title}</div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {lessonDetails.lesson.title}
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {getActiveLessonComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWrapper;