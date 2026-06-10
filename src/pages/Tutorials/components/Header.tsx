import styles from "./Header.module.css";
import Logo from "/src/components/Logo";
import Input from "/src/components/Input";
import { PrimaryLinkButton, SecondaryLinkButton } from "/src/components/Buttons";

export default function Header() {
    return <header className={styles.header} >
        <div>
            <Logo/>
        </div>
        <div className={styles.headerMid} >
            <Input placeholder="Search tutorials..." />
        </div>
        <div className={styles.headerRight} >
            <SecondaryLinkButton text="Login" />
            <PrimaryLinkButton text="Sign Up" />
        </div>
    </header>
}
