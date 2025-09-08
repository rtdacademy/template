import React, { useState } from 'react';
import CourseWrapper from './components/CourseWrapper';
import ComponentShowcase from './components/ComponentShowcase';
import { Button } from './components/ui/button';
import { Palette } from 'lucide-react';
import courseConfig from './course/course-config.json';
import contentRegistry from './course/content-registry';

function App() {
  const [showComponentShowcase, setShowComponentShowcase] = useState(false);

  return (
    <div className="App">
      <div className="fixed top-4 right-4 z-40">
        <Button
          onClick={() => setShowComponentShowcase(true)}
          variant="outline"
          className="shadow-lg"
        >
          <Palette className="h-4 w-4 mr-2" />
          UI Components
        </Button>
      </div>
      
      <ComponentShowcase 
        isOpen={showComponentShowcase}
        onClose={() => setShowComponentShowcase(false)}
      />
      
      <CourseWrapper 
        courseStructure={courseConfig}
        contentRegistry={contentRegistry}
      />
    </div>
  );
}

export default App;