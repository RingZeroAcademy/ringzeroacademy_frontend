# Repo Structure

```
src/
├── assets/               # Static files
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/           # Reusable UI components
│   ├── Button.jsx
│   └── Input.jsx
│
├── pages/                # Route-level components
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.module.css (or .styled.js)
│   │   └── components/   # Components used only on Home page
│   ├── Tutorials/
│   │   ├── Tutorials.jsx
│   │   ├── TutorialsList.jsx
│   │   └── components/
│   ├── TutorialDetail/
│   │   ├── TutorialDetail.jsx
│   │   └── components/
│   └── Landing/
│       ├── Landing.jsx
│       └── components/
│
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   └── useTutorials.js
│
├── services/             # API calls, business logic
│   ├── api.js
│   └── tutorialsService.js
│
├── contexts/             # React Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── utils/                # Helper functions
│   ├── formatters.js
│   └── validators.js
│
├── routes/               # Route configuration
│   └── AppRoutes.jsx
│
├── styles/               # Global styles
│   ├── globals.css
│   └── variables.css
│
├── App.jsx               # Main App component
└── main.jsx              # Entry point
```

## Key Principles

1. **Pages vs Components**
   - `pages/`: Route-level components (connected to routes)
   - `components/`: Reusable across multiple pages
   - Page-specific components go inside that page's folder

2. **Feature-based grouping**
   - For larger apps, consider grouping by feature instead of type:
   ```
   features/
   ├── tutorials/
   │   ├── TutorialsPage.jsx
   │   ├── TutorialCard.jsx
   │   ├── tutorialsService.js
   │   └── tutorialsSlice.js (if using Redux)
   ├── auth/
   └── landing/
   ```

3. **Additional folders** (if needed):
   - `types/` or `interfaces/` for TypeScript
   - `constants/` for app-wide constants
   - `lib/` for third-party library configurations

---
