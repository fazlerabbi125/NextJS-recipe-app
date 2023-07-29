import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles["sticky-footer"]}>
            <div className={styles["sticky-footer__content"]}>
                Copyright © Fazle Rabbi Faiyaz. All Rights Reserved.
            </div>
        </footer>
    );
}
