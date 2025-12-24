const fs = require("fs").promises; // or require('fs') for sync version
const path = require("path");

// Get the directory at the same level as your server
async function readFilesFromSiblingDirectory(siblingDirName, fileName) {
  if (!siblingDirName) return Promise.reject();

  try {
    // Get current directory (where your server.js is located)
    const currentDir = __dirname;

    // Go up one level (parent directory)
    const parentDir = path.dirname(currentDir);

    // Go to sibling directory (same level as server directory)
    const siblingDir = path.join(parentDir, siblingDirName);

    // Read files in the sibling directory
    const files = await fs.readdir(siblingDir);
    console.log("Files in sibling directory:", files, fileName);

    // If you need to read file contents
    for (const file of files) {
      if (file === fileName) return path.join(siblingDir, file);
    }

    return "";
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
}

module.exports = { readFilesFromSiblingDirectory };
