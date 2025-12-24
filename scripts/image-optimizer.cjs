const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

/**
 * Resize and convert image to AVIF format, overwriting the original file
 * @param {string} filePath - Path to the image file
 * @param {Object} options - Resize options
 * @param {number} options.width - Target width (optional)
 * @param {number} options.height - Target height (optional)
 * @param {number} options.quality - AVIF quality (1-100, default: 80)
 * @param {boolean} options.keepAspectRatio - Whether to maintain aspect ratio (default: true)
 * @returns {Promise<Object>} - Optimization results
 */
async function optimizeImageToAvif(filePath, options = {}) {
  const {
    width = null,
    height = null,
    quality = 80,
    keepAspectRatio = true,
  } = options;

  // Validate input
  if (!filePath) {
    throw new Error("File path is required");
  }

  if (!width && !height) {
    throw new Error("Either width or height must be specified");
  }

  // Check if file exists
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`File not found: ${filePath}`);
  }

  // Get file info
  const originalStats = await fs.stat(filePath);
  const originalSize = originalStats.size;

  // Generate temporary file path
  const tempFilePath = filePath + ".tmp.png";

  try {
    // Process image
    let pipeline = sharp(filePath);

    // Resize with specified options
    const resizeOptions = {};
    if (width) resizeOptions.width = width;
    if (height) resizeOptions.height = height;

    if (keepAspectRatio) {
      resizeOptions.fit = "inside";
      resizeOptions.withoutEnlargement = true;
    } else {
      resizeOptions.fit = "fill";
    }

    pipeline = pipeline.resize(resizeOptions);

    // Convert to AVIF
    pipeline = pipeline.avif({
      quality: Math.min(Math.max(quality, 1), 100),
      lossless: false,
    });

    // Save to temporary file
    await pipeline.toFile(tempFilePath);

    // Get optimized file info
    const tempStats = await fs.stat(tempFilePath);
    const optimizedSize = tempStats.size;

    // Get image dimensions
    const metadata = await sharp(tempFilePath).metadata();

    // Replace original file with optimized one
    await fs.unlink(filePath);
    await fs.rename(tempFilePath, filePath.replace(/\.[^/.]+$/, ".png"));

    // Calculate savings
    const reductionPercentage =
      ((originalSize - optimizedSize) / originalSize) * 100;

    return {
      success: true,
      originalPath: filePath,
      newPath: filePath.replace(/\.[^/.]+$/, ".avif"),
      originalSize,
      optimizedSize,
      reductionPercentage: parseFloat(reductionPercentage.toFixed(1)),
      width: metadata.width,
      height: metadata.height,
      format: "avif",
      quality,
    };
  } catch (error) {
    // Clean up temp file if it exists
    try {
      await fs.unlink(tempFilePath);
    } catch (e) {
      // Ignore cleanup errors
    }

    throw new Error(`Image processing failed: ${error.message}`);
  }
}

/**
 * Batch process multiple images to AVIF
 * @param {Array<string>} filePaths - Array of image file paths
 * @param {Object} options - Resize options
 * @returns {Promise<Array<Object>>} - Results for each file
 */
async function batchOptimizeToAvif(filePaths, options = {}) {
  const results = [];

  for (const filePath of filePaths) {
    try {
      const result = await optimizeImageToAvif(filePath, options);
      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        filePath,
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * Process all images in a directory
 * @param {string} directoryPath - Path to directory
 * @param {Object} options - Resize options
 * @returns {Promise<Array<Object>>} - Results for each file
 */
async function optimizeDirectoryToAvif(directoryPath, options = {}) {
  try {
    const files = await fs.readdir(directoryPath);

    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".tiff"].includes(
          ext
        );
      })
      .map((file) => path.join(directoryPath, file));

    return await batchOptimizeToAvif(imageFiles, options);
  } catch (error) {
    throw new Error(`Failed to process directory: ${error.message}`);
  }
}

async function processMultiple() {
  const files = [
    `C:\\Users\\kakal\\OneDrive\\Desktop\\Ty-Projs\\web-cv\\public\\logo\\Claude.png`,
    "C:\\Users\\kakal\\OneDrive\\Desktop\\Ty-Projs\\web-cv\\public\\logo\\Pixijs.png",
  ];

  const results = await batchOptimizeToAvif(files, {
    width: 60,
    height: 60,
    quality: 90,
  });

  results.forEach((result) => {
    if (result.success) {
      console.log(`${result.newPath}: ${result.reductionPercentage}% smaller`);
    } else {
      console.error(`${result.filePath}: ${result.error}`);
    }
  });
}

processMultiple();

module.exports = {
  optimizeImageToAvif,
  batchOptimizeToAvif,
  optimizeDirectoryToAvif,
};
