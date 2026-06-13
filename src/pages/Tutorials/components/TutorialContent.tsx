import { useEffect, useState } from "react";
import styles from "./TutorialContent.module.css";

export default function TutorialContent() {
    const [tutorialContent, setTutorialContent] = useState(null);

    useEffect(() => {
        const tutorialUrl: string = `${window.location.origin}/content${window.location.pathname}`;
        fetch(tutorialUrl).then((response) => {
            response.text().then((text) => setTutorialContent(text));
        });
    }, []);

    return <div className={styles.tutorialContent} dangerouslySetInnerHTML={{ __html: tutorialContent }} />;
}
