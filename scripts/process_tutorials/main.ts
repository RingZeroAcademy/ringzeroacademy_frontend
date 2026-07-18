import convertMarkdownToHtml from "./convert_markdown_to_html.ts";
import insertTutorialsInTutorialPage from "./processTutorialPage.tsx";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

/* Get the root directory of the repository containing all the frontend code.
 * A temporary working directory (`temp`) will be created there, and later deleted after
 * all the tutorials are processed.
 */
const repoRoot: string = execSync("git rev-parse --show-toplevel", { encoding: "utf-8" }).trim();
const tempDir = path.join(repoRoot, "temp");
// fs.mkdirSync(tempDir);

const tutorialContentDir: string = path.join(tempDir, "tutorials");
execSync(
    `git clone --depth 1 --branch main --single-branch git@github.com:RingZeroAcademy/tutorials.git ${tutorialContentDir}`,
    { stdio: "inherit" }
);

convertMarkdownToHtml(tutorialContentDir);

/* Combine the tutorial page html with the tutorial html.
 * Overwrites the initial tutorial files after processing all of them successfully.
 */
insertTutorialsInTutorialPage(tutorialContentDir);


// Cleanup.
// fs.rmdirSync(tempDir);
