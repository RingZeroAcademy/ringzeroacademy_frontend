import "/src/global.css";
import Header from "./components/Header.tsx";
import styles from "./TutorialPage.module.css";

export default function TutorialPage({ tutorialHTML }) {
    return <>
        <Header />
        <main dangerouslySetInnerHTML={{ __html: tutorialHTML }} />
    </>;
}
