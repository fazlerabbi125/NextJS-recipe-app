import { useState } from "react";
import CustomNavLink from "../../atoms/CustomNavLink";
import Image from "next/image";
import { Burger } from "@mantine/core";
import RecipeAutoComplete from "../../molecules/RecipeAutoComplete";
import { buildClassNames } from "@/utils/buildClassNames";
import styles from "./Navbar.module.scss";

const routes = [
    { link: "/", text: "Home" },
    { link: "/tags", text: "Tags" },
    { link: "/about", text: "About" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleNavMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__container}>
                <div className={styles.navbar__brand}>
                    <Image alt="logo" src="/assets/images/cutlery.svg" width={40} height={40} />
                </div>
                <Burger
                    opened={isOpen}
                    onClick={toggleNavMenu}
                    className={styles.navbar__toggler}
                />
                <div
                    className={buildClassNames(
                        styles.navbar__collapse,
                        isOpen && styles["navbar__collapse--show"]
                    )}
                >
                    <ul className={styles["navbar__nav-list"]}>
                        {routes.map((route) => (
                            <li className={styles["navbar__nav-item"]} key={route.link}>
                                <CustomNavLink href={route.link}>{route.text}</CustomNavLink>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles["navbar__nav-list"]}>
                        <li className="sm:min-w-[18.5rem]">
                            <RecipeAutoComplete />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
