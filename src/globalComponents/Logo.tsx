import styles from "./Logo.module.css";

export default function Logo() {
    return <a href="#" className={styles.logo}>
    {/*        <div className={styles.logoIcon}></div> */}
        <h3 className={styles.logoText}>RingZeroAcademy</h3>
    </a>
}
