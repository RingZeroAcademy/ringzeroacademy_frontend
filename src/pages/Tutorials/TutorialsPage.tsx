import Header from "./components/Header";

export default function TutorialsPage({ tutorialContent: string }) {
    return <>
        <Header/>
        <div dangerouslySetInnerHTML={{ __html: tutorialContent }} />
    </>
}
