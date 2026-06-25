/*
 * The `marked` library is chosen over `markdown-it` solely because of
 * speed. `markdown-it` has many features, but I only need to convert
 * markdown to HTML. Switch to `markdown-it` only if you need features
 * that lack in `marked` and are available in `markdown-it` or if you
 * need a level of CommonMark compliance that lacks in `marked`.
 */
import { marked } from "marked";
import * as path from "path";
import * as fs from "fs";

/**
 * Convert all markdown files in 'sourceDir' to HTML files and place them
 * in 'destDir' while maintaining the directory structure.
 * @param {string} sourceDir - The directory containing markdown files.
 * @param {string} destDir - Where HTML files will be placed.
 */
export default async function convertMarkdownToHtml(sourceDir: string, destDir: string): Promise<void> {
    const markdownFiles: string[] = scanDir(sourceDir);

    const voidPromises: Promise<void>[] = [];
    for (const file of markdownFiles) {
        const voidPromise: Promise<void> = convertToHtmlAndSave(file, sourceDir, destDir);
        voidPromises.push(voidPromise);
    }

    await Promise.all(voidPromises); // Wait for all asynchronous file operations to complete.
}

/**
 * Recursively scan `targetDir` and return a list of all markdown files in the dirctory.
 * @param {string} targetDir - The directory to scan.
 * @returns {string[]} An array of all markdown files in 'targetDir'.
 */
function scanDir(targetDir: string): string[] {
    let markdownFiles: string[] = [];

    const dirContents: string[] = fs.readdirSync(targetDir);
    for (const item of dirContents) {
        const fullPath: string = path.join(targetDir, item);
        const itemStats = fs.statSync(fullPath);

        if (itemStats.isDirectory()) {
            const subDirFiles = scanDir(fullPath);
            markdownFiles = markdownFiles.concat(subDirFiles);
        } else if (itemStats.isFile() && fullPath.endsWith(".md")) {
            markdownFiles.push(fullPath)
        }
    }

    return markdownFiles;
}

/**
 * Convert the given markdown file to HTML and save it in 'destRoot' while
 * maintaining the directory structure.
 * @param {string} file - Markdown file to convert to HTML.
 * @param {string} sourceRoot - The root source directory.
 * @param {string} destRoot - The root destination directory.
 */
async function convertToHtmlAndSave(file: string, sourceRoot: string, destRoot:string): Promise<void> {
    const markdownContent: string = fs.readFileSync(file, { encoding: "utf-8" });
    const htmlContent: string = marked.parse(markdownContent, { async: false });
    
    const fileDirname: string = path.dirname(file);
    const relativePath: string = path.relative(sourceRoot, fileDirname);
    const destDir: string = path.join(destRoot, relativePath);

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const filename: string = path.basename(file, ".md") + ".html";
    const destFile: string = path.join(destDir, filename);

    fs.writeFileSync(destFile, htmlContent);
}

// await convertMarkdownToHtml("./tutorials", "./html_tutorials");
