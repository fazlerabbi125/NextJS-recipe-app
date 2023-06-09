import Head from "next/head";

export default function DefaultMeta() {
    const data = {
        siteName: "Faiyaz's Recipes",
        description: "A demo recipe app created using Next.js",
        url: process.env.NEXT_PUBLIC_HOST || "",
        image: (process.env.NEXT_PUBLIC_HOST || "") + "/assets/images/enjoy-food.jpg"
    }
    return (
        <Head>
            <meta property="og:title" content={data.siteName} />
            {/*Default og:type is website i.e. <meta property="og:type" content="website" /> */}
            <meta property="og:url" content={data.url} />
            <meta property="og:image" content={data.image} />
            <meta property="og:site_name" content={data.siteName} />
            <meta
                property="og:description"
                content={data.description}
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data.siteName} />
            <meta name="twitter:description" content={data.description} />
            <meta name="twitter:image" content={data.image} />
            <meta name="twitter:site" content={data.siteName} />

            <title>{data.siteName}</title>
            <meta name="title" content={data.siteName} />
            <meta
                name="description"
                content={data.description}
            />
            <meta name="url" content={data.url} />
        </Head>
    );
}
