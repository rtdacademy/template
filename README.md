# Template Course - Front-End Course Development Platform

## 🎯 Overview

This is a simplified, front-end only course development platform designed for non-technical educators to create engaging course content without worrying about complex React code or backend systems.

## 🚀 Quick Start

### Prerequisites
- Node.js installed on your computer (Download from https://nodejs.org/)
- A text editor (VS Code recommended: https://code.visualstudio.com/)

### Getting Started

1. **Install Dependencies**
   Open a terminal in this folder and run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```
   The course will open automatically in your browser at http://localhost:3000

3. **Start Creating Content!**
   Navigate to the lesson folders and start editing!

## 📁 Project Structure

```
TemplateCourse/
├── src/
│   ├── course/                    # Your course content goes here!
│   │   ├── course-config.json    # Course structure and metadata
│   │   ├── content-registry.js   # Links lessons to the course
│   │   └── units/                # Course units and lessons
│   │       ├── unit-1/
│   │       │   ├── lesson-1/
│   │       │   │   ├── index.js      # Lesson React component
│   │       │   │   ├── notes.txt     # Your teaching notes
│   │       │   │   └── questions.txt # Assessment questions
│   │       │   └── lesson-2/
│   │       │       └── ...
│   │       └── unit-2/
│   │           └── ...
│   └── components/                # Reusable UI components (don't edit)
```

## 📝 Creating and Editing Lessons

### Step 1: Update Course Structure
Edit `src/course/course-config.json` to define your units and lessons:

```json
{
  "title": "Your Course Title",
  "units": [
    {
      "id": "unit-1",
      "title": "Unit 1 Title",
      "lessons": [
        {
          "id": "unit1-lesson1",
          "title": "Lesson Title",
          "type": "lesson"
        }
      ]
    }
  ]
}
```

### Step 2: Create Lesson Folder
Create a new folder for each lesson:
```
src/course/units/unit-1/lesson-3/
```

### Step 3: Create Lesson Component
Copy an existing lesson's `index.js` file and modify the content. Use this template:

```javascript
import React from 'react';

const YourLessonName = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Lesson Title</h1>
        <p className="text-xl mb-6">Lesson subtitle</p>
      </section>

      {/* Content Sections */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Section Title</h2>
        <p className="text-gray-700">
          Your content here...
        </p>
      </section>
    </div>
  );
};

export default YourLessonName;
```

### Step 4: Add Teaching Notes
Create a `notes.txt` file in the lesson folder with:
- Teaching tips
- Common questions
- Time estimates
- Additional resources
- Assessment ideas

### Step 5: Add Questions
Create a `questions.txt` file with:
- Multiple choice questions
- Short answer questions
- Discussion prompts
- Practical exercises

### Step 6: Register the Lesson
Add your lesson to `src/course/content-registry.js`:

```javascript
import YourLessonName from './units/unit-1/lesson-3';

const contentRegistry = {
  // ... existing lessons
  'unit1-lesson3': YourLessonName,
};
```

## 🎨 Styling Guide

### Pre-built Styles You Can Use

**Backgrounds:**
- `bg-white` - White background
- `bg-gray-50` - Light gray
- `bg-blue-50` - Light blue
- `bg-green-50` - Light green
- `bg-yellow-50` - Light yellow

**Text Colors:**
- `text-gray-700` - Body text
- `text-gray-900` - Headings
- `text-blue-600` - Links or emphasis
- `text-white` - White text (on dark backgrounds)

**Sections:**
- Hero: `bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8`
- Content Box: `bg-white rounded-lg border border-gray-200 p-6`
- Alert: `bg-yellow-50 border border-yellow-200 rounded-lg p-6`
- Success: `bg-green-50 border border-green-200 rounded-lg p-6`

**Text Sizes:**
- `text-3xl font-bold` - Main headings
- `text-2xl font-bold` - Section headings
- `text-xl` - Subtitles
- `text-lg` - Large body text
- `text-base` or no class - Normal text
- `text-sm` - Small text

## 💡 Tips for Non-Technical Users

1. **Start Simple**: Copy an existing lesson and modify it rather than starting from scratch.

2. **Use the Browser Preview**: Save your changes and the browser will automatically refresh to show your updates.

3. **Keep Notes Organized**: Use the notes.txt file to document everything about the lesson for future reference.

4. **Test Your Content**: Navigate through your course as a student would to ensure everything flows well.

5. **Version Control**: Keep backups of your work or use Git if you're comfortable with it.

## 🛠 Troubleshooting

**Problem: Changes not showing**
- Solution: Save the file and wait a moment for the browser to refresh

**Problem: Error messages in browser**
- Solution: Check that all `{` have matching `}` and all `<div>` tags are closed with `</div>`

**Problem: Lesson not appearing in navigation**
- Solution: Make sure you've added it to both course-config.json and content-registry.js

**Problem: Styling looks wrong**
- Solution: Make sure you're using the correct className values from the styling guide

## 📚 Additional Resources

- **React Documentation**: https://reactjs.org/docs
- **Tailwind CSS Classes**: https://tailwindcss.com/docs
- **Markdown Guide**: https://www.markdownguide.org/

## 🤝 Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Look at existing lessons for examples
3. Consult with your technical team lead
4. Keep a list of questions for your next meeting with developers

## 📄 License

This template is designed for internal educational use.

---

Happy course creating! 🎓