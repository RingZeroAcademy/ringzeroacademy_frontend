/*
 * For every html file in 'targetDir':
 *   - render the tutorials page with the html file's contents.
 *   - Overwrite the original html file with the rendered html content.
 */

import { getFilesWithExtension } from "./utils.ts";
import { renderToString } from "react-dom/server";
import { execSync } from "child_process";
import React from "react"; // To avoid "ReferenceError: React is not defined".

/* Bundle the tutorial page using vite.
 * Everything in the 'TutorialPage' directory is bundled into javascript and css.
 * This is done because Nodejs, used to run this script, cannot process css or css modules.
 * Importing the original TutorialPage directly will import multiple css files
 * that will cause the script to fail and throw an error:
 *     TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css"
 * To avoid this, bundle first, then import from the resulting javascript file. That file
 * will not import any css files. The css will be in a separate file. The css will be imported
 * by an html file.
 * The javascript file is stored in the temporary directory created in 'main.ts'.
 */
const tutorialPagePath = "../../src/TutorialPage";
execSync(
    `npx vite build --config ./vite.config.ts`,
    { cwd: tutorialPagePath, stdio: "inherit" }
);
import TutorialPage from "../../temp/TutorialPage.js";

// const tutorialPageHTMLString = renderToString(<TutorialPage tutorialHTML="Hello World" />);

export default function insertTutorialsInTutorialPage(tutorialContentDir) {
    const tutorialFiles = getFilesWithExtension(tutorialContentDir, ".html");
    console.log();
    console.log(tutorialFiles);
}
