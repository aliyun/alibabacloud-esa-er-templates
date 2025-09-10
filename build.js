const fs = require("fs");
const path = require("path");

// Build function: copy directory
function copyDir(src, dest) {
  // Ensure destination directory exists
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory contents
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directory, but exclude node_modules
      if (entry.name !== "node_modules") {
        copyDir(srcPath, destPath);
      }
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Build function: copy file
function copyFile(src, dest) {
  // Ensure destination directory exists
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(src, dest);
}

// Main build function
function build() {
  console.log("Starting build...");

  const rootDir = __dirname;
  const srcDir = path.join(rootDir, "src");

  // Clear src directory
  if (fs.existsSync(srcDir)) {
    console.log("Clearing src directory...");
    fs.rmSync(srcDir, { recursive: true, force: true });
  }

  // Create src directory
  fs.mkdirSync(srcDir, { recursive: true });

  // Flatten functions directory contents to src directory
  console.log("Copying functions directory contents...");
  const functionsSrc = path.join(rootDir, "functions");
  if (fs.existsSync(functionsSrc)) {
    // Read all subdirectories under functions directory
    const functionDirs = fs
      .readdirSync(functionsSrc, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== "node_modules");

    // Copy each function template directory to src directory
    for (const dirEntry of functionDirs) {
      const srcPath = path.join(functionsSrc, dirEntry.name);
      const destPath = path.join(srcDir, dirEntry.name);
      copyDir(srcPath, destPath);
    }
  }

  // Copy manifest.json to src directory
  console.log("Copying manifest.json...");
  const manifestSrc = path.join(rootDir, "manifest.json");
  const manifestDest = path.join(srcDir, "manifest.json");
  if (fs.existsSync(manifestSrc)) {
    copyFile(manifestSrc, manifestDest);
  }

  console.log("Build completed!");
  console.log("src directory structure:");
  console.log("- src/");
  console.log("  - AB_test/ (function template)");
  console.log("  - ai_templates/ (function template)");
  console.log("  - cache_api/ (function template)");
  console.log("  - ... (other function templates)");
  console.log("  - manifest.json");
}

// Execute build
build();
