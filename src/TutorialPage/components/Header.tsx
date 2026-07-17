import styles from "./Header.module.css";
import Logo from "/src/globalComponents/Logo";
import Input from "/src/globalComponents/Input";
import { PrimaryNormalLinkButton, SecondaryNormalLinkButton } from "/src/globalComponents/Buttons";

export default function Header() {
    return <header className={styles.header} >
        <div>
            <Logo/>
        </div>
        <div className={styles.headerMid} >
            <Input placeholder="Search tutorials..." />
        </div>
        <div className={styles.headerRight} >
            <SecondaryNormalLinkButton text="Login" />
            <PrimaryNormalLinkButton text="Sign Up" />
        </div>
    </header>;

}
