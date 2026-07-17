# Tutorial Page

+ This directory contains the code for the page that will contain the tutorials.

## How to view in development

+ Go to the path: `src/TutorialPage/`
+ The server will serve `index.html`, which will have `main.tsx` as its script file.
+ `main.tsx` will import and render the tutorial page from `TutorialPage.tsx`.

## How it's used in production

+ In production, `index.html` and `main.tsx` are not used.
+ `TutorialPage.tsx` along with everything it imports (components in the `components` directory and `TutorialPage.module.css`) are bundled and the result is placed in the `./dist` directory.
  ```
  npx vite build --config ./vite.config.ts
  ```
+ A build script will import the `TutorialPage` component from the `./dist` directory and continue with the next build steps.
+ More information on this is in `/docs/tutorial_content_architecture.md`.

---
