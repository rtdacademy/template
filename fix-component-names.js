const fs = require('fs');
const path = require('path');

// Function to clean component name
function cleanComponentName(name) {
  // Remove special characters and spaces, keep only alphanumeric
  return name.replace(/[^a-zA-Z0-9]/g, '');
}

// Function to fix a single file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find component declaration
    const componentMatch = content.match(/const\s+([^=\s]+)\s*=\s*\(\)/);
    if (componentMatch) {
      const oldName = componentMatch[1];
      const cleanName = cleanComponentName(oldName);
      
      if (oldName !== cleanName) {
        console.log(`Fixing ${filePath}: ${oldName} -> ${cleanName}`);
        
        // Replace component declaration
        content = content.replace(
          new RegExp(`const\\s+${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*\\(\\)`, 'g'),
          `const ${cleanName} = ()`
        );
        
        // Replace export statement
        content = content.replace(
          new RegExp(`export\\s+default\\s+${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
          `export default ${cleanName}`
        );
        
        fs.writeFileSync(filePath, content);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find and fix all index.js files
function fixAllFiles(dir) {
  let fixedCount = 0;
  
  function processDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (item === 'index.js') {
        if (fixFile(itemPath)) {
          fixedCount++;
        }
      }
    });
  }
  
  processDirectory(dir);
  return fixedCount;
}

// Run the fix
const unitsPath = path.join(__dirname, 'src', 'course', 'units');
console.log('Scanning for component name issues...');
const fixed = fixAllFiles(unitsPath);
console.log(`\nFixed ${fixed} files with invalid component names.`);
console.log('Done!');