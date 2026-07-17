import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";

export function PrimaryLinkButton({ text, to }) {
    return <Link to={to} className={styles.primaryLinkButton} >{text}</Link>
}

export function SecondaryLinkButton({ text, to }) {
    return <Link to={to} className={styles.secondaryLinkButton} >{text}</Link>
}
