# Tutorial Content Architecture

## Overview

RingZeroAcademy will use a build-time content generation approach.

Tutorials will be authored and stored in a separate GitHub repository. During the website build process, tutorial source files will be converted into static HTML files and included in the website deployment.

The frontend application will load these generated HTML files and display them within the tutorial page.

---

## URL Structure

Tutorial URLs follow the pattern:

```text
/tutorials/<tutorial-path>
```

Examples:

```text
/tutorials/assembly_instructions/mov
/tutorials/c/variables
/tutorials/javascript/functions
```

The portion of the URL after `/tutorials/` is treated as the tutorial path.

For example:

```text
/tutorials/assembly_instructions/mov
```

maps to:

```text
assembly_instructions/mov
```

The frontend uses this path to locate and load the corresponding generated HTML file.

---

## Build Process

### Source Repository

Tutorial content is maintained in a dedicated GitHub repository.

Example structure:

```text
tutorials/
├── assembly_instructions/
│   ├── mov.md
│   └── add.md
├── c/
│   ├── variables.md
│   └── loops.md
```

### Generation Step

During the website build:

1. The tutorial repository is downloaded or made available to the build environment.
2. Each tutorial source file is converted into HTML.
3. Generated HTML files are copied into the website's public assets directory.

Example output:

```text
public/
└── tutorial-content/
    ├── assembly_instructions/
    │   ├── mov.html
    │   └── add.html
    └── c/
        ├── variables.html
        └── loops.html
```

### Deployment

The generated HTML files are deployed together with the website.

Because they are static assets, they are served directly by Vercel's CDN.

---

## Runtime Loading

When a user visits a tutorial URL:

```text
/tutorials/assembly_instructions/mov
```

the application extracts:

```text
assembly_instructions/mov
```

and loads:

```text
/tutorial-content/assembly_instructions/mov.html
```

The returned HTML is then rendered inside the tutorial page.

---

## Reasons for This Approach

### Performance

Tutorial content is served as static files from the CDN.

No GitHub requests are required at runtime.

No API calls are required.

No backend services are required.

This results in fast page loading and low operational complexity.

### Simplicity

The architecture consists of:

* Tutorial repository
* Build process
* Static assets
* React frontend

No database, content API, or server-side infrastructure is required.

### Reliability

The website remains fully functional even if GitHub is temporarily unavailable, since tutorial content is included in the deployment.

### Scalability

Static HTML files can be efficiently cached and delivered by the CDN, allowing the platform to support a large number of tutorials with minimal infrastructure requirements.

### Search Engine Optimization (SEO)

Tutorial content exists as pre-generated HTML rather than raw Markdown.

This improves crawlability and indexing compared to rendering Markdown in the browser after page load.

The approach provides a strong foundation for search engine visibility and organic discovery of tutorial content.

---

## Future Metadata Support

A separate metadata file may be introduced in the future.

Example:

```text
public/tutorial-index.json
```

Example structure:

```json
[
  {
    "path": "assembly_instructions/mov",
    "title": "MOV Instruction",
    "difficulty": "Beginner",
    "category": "Assembly"
  }
]
```

This metadata file can support features such as:

* Search
* Navigation
* Categories
* Tags
* Difficulty levels
* Reading time estimates
* Related tutorials

The tutorial HTML files and metadata will remain independent, allowing content delivery and metadata management to evolve separately.

---
