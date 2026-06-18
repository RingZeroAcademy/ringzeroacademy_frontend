/* Export a function that takes two paths; source path, and destination path.
 * The source path is the directory containing markdown files. All markdown files in this directory will be converted to HTML files and placed in the destination path, while maintaining the directory structure.
 *
 * Key Steps
 *
 * 1. Scan the directory and get all markdown files.
 * 2. Convert all markdown files to HTML files and place them in destination path.
 */

import { join } from "path";
import * as fs from "fs";

export default function convertMarkdownToHtml(sourceDir: string, destDir: string): void {
    scanDir(sourceDir);
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
        const fullPath: string = join(targetDir, item);
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
