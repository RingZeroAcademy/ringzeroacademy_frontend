import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TutorialContent() {
    const [tutorialContent, setTutorialContent] = useState(null);

    useEffect(() => {
        const tutorialUrl: string = `${window.location.origin}/content${window.location.pathname}`;
        fetch(tutorialUrl).then((response) => {
            response.text().then((text) => setTutorialContent(text));
        });
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: tutorialContent }} />;
}
