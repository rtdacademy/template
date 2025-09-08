# Course Manager Guide

## Overview
The Course Manager is a command-line tool that makes it easy to add, remove, and organize course content. It automatically handles file creation, ID management, and updates to configuration files.

## Quick Start

### Interactive Mode (Easiest for Non-Technical Users)
Simply run:
```bash
node course-manager.js
```

This will start an interactive menu where you can:
1. Add units
2. Add lessons
3. Add assignments
4. Add quizzes
5. Add exams
6. List all content

### Command Line Mode
For faster operation, use direct commands:

#### Add a New Unit
```bash
node course-manager.js add unit --title "Unit 3: Advanced Topics" --description "Deep dive into advanced concepts"
```

#### Add a Lesson
```bash
node course-manager.js add lesson --unit 2 --title "Functions and Scope" --description "Learn about JavaScript functions"
```

#### Add an Assignment
```bash
node course-manager.js add assignment --unit 1 --title "Build Your First Webpage" --description "Create a simple HTML page"
```

#### Add a Quiz
```bash
node course-manager.js add quiz --unit 2 --title "JavaScript Basics Quiz" --description "Test your knowledge"
```

#### Add an Exam
```bash
node course-manager.js add exam --unit 2 --title "Midterm Exam" --description "Comprehensive exam covering Units 1-2"
```

#### List All Content
```bash
node course-manager.js list
```

## What Gets Created

### For Lessons
Creates a folder with:
- `index.js` - React component with lesson template
- `notes.txt` - Instructor notes and teaching tips
- `questions.txt` - Assessment questions for the lesson

### For Assignments
Creates a folder with:
- `index.js` - React component with assignment display
- `instructions.txt` - Detailed assignment instructions
- `rubric.txt` - Grading rubric

### For Quizzes
Creates a folder with:
- `index.js` - Interactive quiz component
- `questions.txt` - Quiz questions and settings
- `answers.txt` - Answer key with explanations

### For Exams
Creates a folder with:
- `index.js` - Timed exam component
- `questions.txt` - Exam questions (multiple choice, short answer, essay)
- `answers.txt` - Complete answer key
- `rubric.txt` - Detailed grading rubric

## File Locations

All content is created in:
```
src/course/units/
  unit-1/
    lesson-1/
    lesson-2/
    assignment-1/
    quiz-1/
  unit-2/
    lesson-1/
    lesson-2/
    lesson-3/
    exam-1/
```

## Automatic Updates

The Course Manager automatically:
1. **Updates `course-config.json`** - Adds the new content with proper IDs
2. **Updates `content-registry.js`** - Adds imports and registry entries (for lessons/assignments only)
3. **Creates all necessary files** - With helpful templates and placeholders
4. **Maintains consistent IDs** - Automatically numbers content sequentially

## ID System

The tool uses a consistent ID pattern:
- Units: `unit-1`, `unit-2`, etc.
- Lessons: `unit1-lesson1`, `unit1-lesson2`, etc.
- Assignments: `unit1-assignment1`, `unit1-assignment2`, etc.
- Quizzes: `unit1-quiz1`, `unit1-quiz2`, etc.
- Exams: `unit1-exam1`, `unit1-exam2`, etc.

## Tips for Non-Technical Users

1. **Use Interactive Mode**: It's the easiest way - just answer the prompts!
   ```bash
   node course-manager.js
   ```

2. **Start with Units**: Always create a unit before adding content to it

3. **Edit the Text Files**: After creating content, edit the `.txt` files to add:
   - Questions and answers
   - Instructions
   - Notes for teaching

4. **Edit the React Components**: The `index.js` files have clear placeholders marked with `[brackets]` - just replace them with your content

5. **Test Your Changes**: After adding content, run `npm start` to see it in the app

## Common Tasks

### Adding a Complete Unit with Content
```bash
# 1. Create the unit
node course-manager.js add unit --title "Unit 4: React Basics"

# 2. Add lessons
node course-manager.js add lesson --unit 4 --title "Introduction to React"
node course-manager.js add lesson --unit 4 --title "Components and Props"
node course-manager.js add lesson --unit 4 --title "State and Hooks"

# 3. Add an assignment
node course-manager.js add assignment --unit 4 --title "Build a React Component"

# 4. Add a quiz
node course-manager.js add quiz --unit 4 --title "React Fundamentals Quiz"
```

### Viewing Course Structure
```bash
node course-manager.js list
```

This shows all units and their content with icons:
- 📖 Lessons
- 📝 Assignments
- ❓ Quizzes
- 📋 Exams

## Troubleshooting

**Content not showing up?**
- Make sure you've restarted the dev server (`npm start`)
- Check that the content was added to `course-config.json`
- For lessons/assignments, verify they're in `content-registry.js`

**Getting errors?**
- Make sure you're in the project root directory
- Verify the unit number exists before adding content to it
- Check that Node.js is installed (`node --version`)

**Need to remove content?**
- Currently, removal must be done manually:
  1. Delete the folder from `src/course/units/`
  2. Remove the entry from `course-config.json`
  3. Remove the import and registry entry from `content-registry.js`

## Examples

### Creating a Programming Basics Course
```bash
# Unit 1: Introduction
node course-manager.js add unit --title "Unit 1: Getting Started"
node course-manager.js add lesson --unit 1 --title "What is Programming?"
node course-manager.js add lesson --unit 1 --title "Setting Up Your Environment"
node course-manager.js add assignment --unit 1 --title "Hello World Program"

# Unit 2: Variables and Data
node course-manager.js add unit --title "Unit 2: Variables and Data Types"
node course-manager.js add lesson --unit 2 --title "Variables and Constants"
node course-manager.js add lesson --unit 2 --title "Data Types"
node course-manager.js add quiz --unit 2 --title "Variables Quiz"

# Unit 3: Control Flow
node course-manager.js add unit --title "Unit 3: Control Flow"
node course-manager.js add lesson --unit 3 --title "If Statements"
node course-manager.js add lesson --unit 3 --title "Loops"
node course-manager.js add assignment --unit 3 --title "Create a Calculator"
node course-manager.js add exam --unit 3 --title "Midterm Exam"
```

## Next Steps

After creating content:
1. Edit the `.txt` files to add questions, instructions, and notes
2. Customize the `index.js` files with your actual content
3. Test everything with `npm start`
4. Commit your changes to Git

---

**Remember**: The Course Manager handles all the complex file management and configuration updates automatically. You just need to provide the content!