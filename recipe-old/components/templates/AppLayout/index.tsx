import { ReactNode } from "react";
import Footer from "../../organisms/Footer";
import Navbar from "../../organisms/Navbar";
import styles from "./AppLayout.module.scss";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
    return (
        <div className={styles["app-layout"]}>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
}
