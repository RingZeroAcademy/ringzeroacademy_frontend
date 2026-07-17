# Tutorial Page

+ This directory contains the code for the page that will contain the tutorials.

## How to view in development

+ Go to the path: `src/TutorialPage/`
+ The server will serve `index.html`, which will have `main.tsx` as its script file.
+ `main.tsx` will import and render the tutorial page from `TutorialPage.tsx`.

## How it's used in production

+ In production, `index.html` and `main.tsx` are not used.
+ A build script imports the `TutorialPage` component from `TutorialPage.tsx`, and renders it to html with the actual tutorial content passed as the `tutorialHTML` prop. This is done for every tutorial.
+ More information on this is in `/docs/tutorial_content_architecture.md`.

---
