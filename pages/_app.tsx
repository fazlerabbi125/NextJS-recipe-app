import type { AppProps } from "next/app";
import AppLayout from "../components/templates/AppLayout";
import RenderGate from "@/components/templates/RenderGate";
import SEOTags from "@/seo-tags";
import "@/styles/globals.scss";
import "video.js/dist/video-js.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/videoJS-player.scss"; //custom styles to alter default from "video.js/dist/video-js.css"

export default function App({ Component, pageProps, router }: AppProps) {
    return (
        <>
            <SEOTags pageProps={pageProps} pathname={router.pathname} />
            <RenderGate>
                <AppLayout>{<Component {...pageProps} />}</AppLayout>
            </RenderGate>
        </>
    );
}
