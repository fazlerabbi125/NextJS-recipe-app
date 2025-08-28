import type { AppProps } from "next/app";
import { NextPage } from "next";
import AppLayout from "@/components/templates/AppLayout";
import RenderGate from "@/components/templates/RenderGate";
import { Container } from "@mantine/core";
import SEOTags from "@/seo-tags";
import "@/styles/globals.scss";
import "video.js/dist/video-js.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/videoJS-player.scss"; //custom styles to alter default from "video.js/dist/video-js.css"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps, router }: AppPropsWithLayout) {
    //   Use the layout defined at the page level, if available:
    //   const getLayout = Component.getLayout ?? ((page) => page)
    //   return getLayout(<Component {...pageProps} />)

    return (
        <>
            <SEOTags pageProps={pageProps} pathname={router.pathname} />
            <RenderGate>
                <AppLayout>
                    {router.pathname !== "/" ? (
                        <Container size="xl" pt="xl">
                            <Component {...pageProps} />
                        </Container>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </AppLayout>
            </RenderGate>
        </>
    );
}
