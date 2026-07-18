/*
 * The `marked` library is chosen over `markdown-it` solely because of
 * speed. `markdown-it` has many features, but I only need to convert
 * markdown to HTML. Switch to `markdown-it` only if you need features
 * that lack in `marked` and are available in `markdown-it` or if you
 * need a level of CommonMark compliance that lacks in `marked`.
 */
import { getFilesWithExtension } from "./utils.ts";
import { marked } from "marked";
import * as path from "path";
import * as fs from "fs";

/**
 * Convert all markdown files to HTML, store the HTML files in the same
 * path as the markdown files, then delete all processed markdown files.
 * @param {string} targetDir - The directory containing markdown files.
 */
export default async function convertMarkdownToHtml(targetDir: string): Promise<void> {
    const markdownFiles: string[] = getFilesWithExtension(targetDir, ".md");

    // Process markdown files.
    const voidPromises: Promise<void>[] = [];
    for (const file of markdownFiles) {
        const voidPromise: Promise<void> = convertToHtmlAndSave(file);
        voidPromises.push(voidPromise);
    }

    await Promise.all(voidPromises); // Wait for all asynchronous file operations to complete.

    // Delete all processed markdown files.
    const rmVoidPromises: Promise<void>[] = [];
    for (const file of markdownFiles) {
        const rmVoidPromise: Promise<void> = fs.rm(file, () => {});
        rmVoidPromises.push(rmVoidPromise);
    }

    await Promise.all(rmVoidPromises);
}

/**
 * Convert the given markdown file to HTML and save the HTML file in the same
 * directory as the markdown file, but with a '.html' extension instead of '.md'.
 * @param {string} file - Markdown file to convert to HTML.
 * @returns {Promise<void>} Returns a Promise object that resolves to void.
 */
async function convertToHtmlAndSave(file: string): Promise<void> {
    const markdownContent: string = fs.readFileSync(file, { encoding: "utf-8" });
    const htmlContent: string = marked.parse(markdownContent, { async: false });
    
    const htmlFilename: string = path.basename(file, ".md") + ".html";
    const dirname: string = path.dirname(file);
    const destFile: string = path.join(dirname, htmlFilename);

    fs.writeFileSync(destFile, htmlContent);
}

// await convertMarkdownToHtml("./tutorials", "./html_tutorials");
