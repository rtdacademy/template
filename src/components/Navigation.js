import React from 'react';
import { ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from './ui/accordion';
import { Badge } from './ui/badge';

const Navigation = ({
  courseStructure,
  activeLesson,
  onLessonSelect,
  expanded = true,
  onToggleExpand
}) => {
  if (!expanded) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col py-4">
        <button
          onClick={onToggleExpand}
          className="mx-auto mb-4 p-2 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="font-semibold text-base text-blue-800 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          {courseStructure.title}
        </h2>
        <button 
          onClick={onToggleExpand}
          className="p-1 hover:bg-white/50 rounded"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex-1 p-3">
        <Accordion type="multiple" defaultValue={["unit-0"]} className="space-y-2">
          {courseStructure.units.map((unit, unitIndex) => (
            <AccordionItem
              key={`unit-${unitIndex}`}
              value={`unit-${unitIndex}`}
              className="border border-gray-100 rounded-md shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline py-2 px-3">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    {unitIndex + 1}
                  </div>
                  <span className="text-sm font-medium text-blue-800">
                    {unit.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-2 pt-1">
                {unit.lessons.map((lesson) => {
                  const isActive = activeLesson === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onLessonSelect(lesson.id)}
                      className={`p-2 mb-1.5 rounded-md text-sm transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${isActive ? 'text-blue-800' : ''}`}>
                          {lesson.title}
                        </span>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {lesson.type}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Navigation;