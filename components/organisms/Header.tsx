import React from "react";
import { Title } from "@mantine/core";

interface HeaderProps {
    classNames?: {
        container?: string;
        text?: string;
    };
    children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header
            className={["text-zinc-50", "font-bold", props.classNames?.container]
                .filter((elem) => elem)
                .join(" ")}
        >
            <Title className={props.classNames?.text}>{props.children}</Title>
        </header>
    );
};

export default Header;
