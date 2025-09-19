#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Prepare package src/ directory from functions/ before npm pack/publish.
 * Copies:
 * - functions/manifest.json -> src/manifest.json
 * - each template directory under functions/* -> src/<template>/
 *   - esa.jsonc
 *   - readme.md (or README.md)
 *   - src/** (recursively)
 */

const projectRoot = path.resolve(__dirname, '..');
const functionsDir = path.join(projectRoot, 'functions');
const outDir = path.join(projectRoot, 'src');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function copyFileSync(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDirRecursiveSync(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      ensureDir(destPath);
      copyDirRecursiveSync(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFileSync(srcPath, destPath);
    }
  }
}

function findReadmeFile(templateDir) {
  const candidates = ['readme.md', 'README.md'];
  for (const name of candidates) {
    const p = path.join(templateDir, name);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

function copyTemplate(templateName) {
  const srcTemplateDir = path.join(functionsDir, templateName);
  const destTemplateDir = path.join(outDir, templateName);

  // esa.jsonc
  const esaPath = path.join(srcTemplateDir, 'esa.jsonc');
  if (fs.existsSync(esaPath)) {
    copyFileSync(esaPath, path.join(destTemplateDir, 'esa.jsonc'));
  } else {
    // Skip directories that are not templates
    return false;
  }

  // readme.md (optional)
  const readmePath = findReadmeFile(srcTemplateDir);
  if (readmePath) {
    copyFileSync(readmePath, path.join(destTemplateDir, 'readme.md'));
  }

  // src/** (optional)
  const innerSrcDir = path.join(srcTemplateDir, 'src');
  if (fs.existsSync(innerSrcDir) && fs.statSync(innerSrcDir).isDirectory()) {
    copyDirRecursiveSync(innerSrcDir, path.join(destTemplateDir, 'src'));
  }
  return true;
}

function main() {
  if (!fs.existsSync(functionsDir)) {
    console.error('Missing functions/ directory.');
    process.exit(1);
  }

  // Clean output dir
  removeDir(outDir);
  ensureDir(outDir);

  // Copy manifest.json
  const manifestSrc = path.join(functionsDir, 'manifest.json');
  if (fs.existsSync(manifestSrc)) {
    copyFileSync(manifestSrc, path.join(outDir, 'manifest.json'));
  } else {
    console.warn('Warning: functions/manifest.json not found.');
  }

  // Copy templates
  const entries = fs.readdirSync(functionsDir, { withFileTypes: true });
  let copiedCount = 0;
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'node_modules') continue;
    if (entry.name.startsWith('.')) continue;
    const ok = copyTemplate(entry.name);
    if (ok) copiedCount += 1;
  }

  console.log(`Prepared src/ with ${copiedCount} templates.`);
}

main();


