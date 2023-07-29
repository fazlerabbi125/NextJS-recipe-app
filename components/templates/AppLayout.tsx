import React from "react";
import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";
import { Container } from "@mantine/core";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
    return (
        <React.Fragment>
            <Navbar />
            <Container size="xl" pt="xl">
                {props.children}
            </Container>
            <Footer />
        </React.Fragment>
    );
}
