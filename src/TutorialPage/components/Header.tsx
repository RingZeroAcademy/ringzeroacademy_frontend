import styles from "./Header.module.css";
import Logo from "../../globalComponents/Logo.tsx";
import Input from "../../globalComponents/Input.tsx";
import { PrimaryNormalLinkButton, SecondaryNormalLinkButton } from "../../globalComponents/Buttons.tsx";

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
