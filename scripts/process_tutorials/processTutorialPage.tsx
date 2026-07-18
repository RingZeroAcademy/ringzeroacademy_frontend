/*
 * For every html file in 'targetDir':
 *   - render the tutorials page with the html file's contents.
 *   - Overwrite the original html file with the rendered html content.
 */

import TutorialPage from "../../src/TutorialPage/dist/TutorialPage.js";
import { renderToString } from "react-dom/server";
import React from "react"; // To avoid "ReferenceError: React is not defined".

const output = renderToString(<TutorialPage tutorialHTML="Hello World" />);
console.log(output);
