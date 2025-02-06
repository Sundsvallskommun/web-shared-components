import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const baseDir = 'dist/esm';

function getFileDir(filePath) {
  // Normalize the path to use forward slashes consistently.  This handles Windows paths with backslashes.
  const normalizedPath = filePath.replace(/\\/g, '/');

  // Get the last index of the forward slash.
  const lastSlashIndex = normalizedPath.lastIndexOf('/');

  // If a slash is found, return the directory part. Otherwise, return an empty string (or handle as you see fit).
  if (lastSlashIndex !== -1) {
    return normalizedPath.substring(0, lastSlashIndex);
  } else {
    return '/'; // Or perhaps throw an error: throw new Error("Invalid file path");
  }
}

// Get the directory path from the command-line argument
const distDir = process.argv[2] || path.join(__dirname, baseDir); // Default to 'dist/esm' if no argument is provided

// Function to read files in dist/esm and fix import paths
async function fixESMImports(directory) {
  const normalizedDirectory = directory.replace(/\\/g, '/');
  const files = glob.sync(`${normalizedDirectory}/**/*.js`);
  files.forEach((file) => {
    const fileDir = getFileDir(file);
    let content = fs.readFileSync(file, 'utf-8');

    // Replace imports without file extensions with the correct file extensions
    content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
      if (!p1.endsWith('.js')) {
        const fullPath = path.resolve(normalizedDirectory.replace(`${baseDir}/`, ''), fileDir, p1);
        if (fs.existsSync(`${fullPath}.js`)) {
          p1 = `${p1}.js`; // Add file extension
        } else if (fs.existsSync(path.join(fullPath, 'index.js'))) {
          p1 = `${p1}/index.js`; // Add /index.js if it's a directory
        }
      }
      return `from '${p1}'`;
    });

    // Write the updated content back to the file
    fs.writeFileSync(file, content, 'utf-8');
  });
}

// Run the fix for the dist/esm directory
fixESMImports(path.resolve(distDir)).then(() => {
  console.log('ESM imports fixed');
});
