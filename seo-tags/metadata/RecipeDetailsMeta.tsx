import { RecipeDetailsType } from "@/pages/api/recipes/[recipeSlug]";
import Head from "next/head";

interface RecipeDetailsMetaProps {
    recipe: RecipeDetailsType;
}

export default function RecipeDetailsMeta({ recipe }: RecipeDetailsMetaProps) {
    const data = {
        title: recipe.name,
        url: (process.env.NEXT_PUBLIC_HOST || "") + "/recipes/" + recipe.slug,
        thumbnail: recipe.thumbnail_url,
        description: recipe.description || "",
        siteName: "Faiyaz's Recipes",
    };
    return (
        <Head>
            <title>{`Recipe | ${data.title}`}</title>
            <meta name="url" content={data.url} />
            <meta name="title" content={data.title} />
            <meta name="description" content={data.description} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data.title} />
            <meta name="twitter:description" content={data.description} />
            <meta name="twitter:image" content={data.thumbnail} />
            <meta name="twitter:site" content={data.siteName} />

            <meta property="og:image" content={data.thumbnail} />
            <meta property="og:site_name" content={data.siteName} />
            <meta property="og:url" content={data.url} />
            <meta property="og:title" content={data.title} />
            <meta property="og:type" content="article" />
            <meta property="og:description" content={data.description} />
        </Head>
    );
}
