import convertMarkdownToHtml from "./convert_markdown_to_html.ts";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

const repoRoot: string = execSync("git rev-parse --show-toplevel", { encoding: "utf-8" }).trim();

const tempDir = path.join(repoRoot, "temp");
fs.mkdirSync(tempDir);

const tutorialsRepoDir: string = path.join(tempDir, "tutorials_repo");
execSync(`git clone --depth 1 --branch main --single-branch git@github.com:RingZeroAcademy/tutorials.git ${tutorialsRepoDir}`);

const htmlTutorialsDir: string = path.join(tempDir, "html_tutorials");
convertMarkdownToHtml(tutorialsRepoDir, htmlTutorialsDir);





// Cleanup.
// fs.rmdirSync(tempDir);
