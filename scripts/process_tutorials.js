/* Clone the `tutorials` repository,
 * convert all markdown files to HTML files and,
 * place them in the `dist/tutorials/` directory.
 */

/*
 * The `marked` library is chosen over `markdown-it` solely because of
 * speed. `markdown-it` has many features, but I only need to convert
 * markdown to HTML. Switch to `markdown-it` only if you need features
 * that lack in `marked` and are available in `markdown-it` or if you
 * need a level of CommonMark compliance that lacks in `marked`.
 */
import { readdir, stat, mkdir, writeFile, readFile, access } from 'fs/promises';
import { join, relative, dirname, parse } from 'path';
import { marked } from 'marked';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Recursively walk through a directory and find all markdown files
 * @param {string} dir - Directory to walk through
 * @returns {string[]} Array of markdown file paths
 */
async function walkDirectory(dir) {
  let markdownFiles = [];
  
  try {
    const items = await readdir(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        const subDirFiles = await walkDirectory(fullPath);
        markdownFiles = markdownFiles.concat(subDirFiles);
      } else if (stats.isFile() && item.endsWith('.md')) {
        markdownFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return markdownFiles;
}

/**
 * Convert a markdown file to HTML and save it to the dist directory
 * @param {string} mdFilePath - Path to the markdown file
 * @param {string} sourceRoot - Root directory of the source files
 * @param {string} distRoot - Root directory for output files
 */
async function convertMarkdownToHtml(mdFilePath, sourceRoot, distRoot) {
  try {
    const markdown = await readFile(mdFilePath, 'utf8');
    const htmlContent = await marked.parse(markdown);
    
    // Determine the output path.
    const relativePath = relative(sourceRoot, mdFilePath);
    const parsedPath = parse(relativePath);
    const outputPath = join(distRoot, parsedPath.dir, `${parsedPath.name}.html`);
    
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }
    
    await writeFile(outputPath, htmlContent, 'utf-8');
    
    console.log(`Converted: ${relativePath} → ${relativePath.replace('.md', '.html')}`);
  } catch (error) {
    console.error(`Error converting ${mdFilePath}:`, error.message);
  }
}

/**
 * Main build function
 * @param {string} sourceDir - Source directory containing markdown files
 * @param {string} distDir - Destination directory for HTML files
 */
async function build(sourceDir, distDir) {
  console.log(`Scanning for markdown files in: ${sourceDir}`);
  
  const markdownFiles = await walkDirectory(sourceDir);
  
  if (markdownFiles.length === 0) {
    console.log('No markdown files found.');
    return;
  }
  
  console.log(`Found ${markdownFiles.length} markdown file(s)`);
  
  if (!existsSync(distDir)) {
    await mkdir(distDir, { recursive: true });
  }
  
  // Convert each file concurrently.
  const conversions = markdownFiles.map(file => 
    convertMarkdownToHtml(file, sourceDir, distDir)
  ); // `conversions` is a list of Promises that resolve to `undefined`.
  
  await Promise.all(conversions); // Waits for all promises in `conversions` to resolve to `undefined`.
  
  console.log(`Build complete! HTML files are in: ${distDir}`);
}

/*
// CLI execution
const sourceDirectory = process.argv[2] || './';
const distDirectory = process.argv[3] || './dist';
*/

const sourceDirectory = join(__dirname, "tutorials");
const distDirectory = join(__dirname, "../dist");
const tutorialsDirectory = join(distDirectory, "content" , "tutorials");

// Prepare the destination directory.
if (existsSync(distDirectory)) rmSync(distDirectory, { recursive: true, force: true });
mkdirSync(tutorialsDirectory, { recursive: true });

try {
  await access(sourceDirectory);
  await build(sourceDirectory, tutorialsDirectory);
} catch (error) {
  console.error(`Error: Source directory "${sourceDirectory}" does not exist or is not accessible.`);
  process.exit(1);
}
