import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles["app-footer"]}>
            <div className={styles["app-footer__content"]}>
                Copyright © Fazle Rabbi Faiyaz. All Rights Reserved.
            </div>
        </footer>
    );
}
