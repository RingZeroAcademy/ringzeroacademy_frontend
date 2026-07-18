import * as path from "path";
import * as fs from "fs";

/**
 * Recursively scan `targetDir` and return a list of all files with the given extension.
 * @param {string} targetDir - The directory to scan.
 * @param {string} extension - The target extension. Should include the '.' (e.g. ".md", ".html").
 * @returns {string[]} An array of all files in `targetDir` with the given extension.
 */
export function getFilesWithExtension(targetDir: string, extension: string): string[] {
    let wantedFiles: string[] = [];

    const dirContents: string[] = fs.readdirSync(targetDir);
    for (const item of dirContents) {
        const fullPath: string = path.join(targetDir, item);
        const itemStats = fs.statSync(fullPath);

        if (itemStats.isDirectory()) {
            const subDirFiles = getFilesWithExtension(fullPath);
            wantedFiles = wantedFiles.concat(subDirFiles);
        } else if (itemStats.isFile() && fullPath.endsWith(extension)) {
            wantedFiles.push(fullPath)
        }
    }

    return wantedFiles;
}
