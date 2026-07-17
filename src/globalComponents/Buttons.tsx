import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";

export function PrimaryReactRouterLinkButton({ text, to }) {
    return <Link to={to} className={styles.primaryLinkButton} >{text}</Link>
}

export function SecondaryReactRouterLinkButton({ text, to }) {
    return <Link to={to} className={styles.secondaryLinkButton} >{text}</Link>
}

export function PrimaryNormalLinkButton({ text, to }) {
    return <a className={styles.primaryLinkButton} href={to} >{text}</a>
}

export function SecondaryNormalLinkButton({ text, to }) {
    return <a className={styles.secondaryLinkButton} href={to} >{text}</a>
}
