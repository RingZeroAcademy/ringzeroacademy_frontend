import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TutorialPage from "./TutorialPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TutorialPage tutorialHTML="Hello World" />
  </StrictMode>,
)
