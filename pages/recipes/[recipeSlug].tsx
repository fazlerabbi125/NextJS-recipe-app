import React from "react";
import Head from "next/head";
import { fetchData } from "../../hooks/useAxios";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Card, Title, Stack, Text, Tabs } from "@mantine/core";
import NavButton from "../../components/atoms/NavButton";
import { TagDetailType } from "../api/tags";
import CustomRating from "../../components/atoms/CustomRating";
import RecipeBasicInfo from "../../components/organisms/RecipeBasicInfo";
import RecipeInstructions from "../../components/organisms/RecipeInstructions";
import styles from "./RecipeDetails.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext<{ recipeSlug?: string }>) {
    const recipe: RecipeDetailsType = await fetchData(
        `/recipes/${context.params?.recipeSlug}`
    );

    if (!recipe) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            recipe,
        },
    };
}

export default function RecipeDetails({
    recipe,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [activeTab, setActiveTab] = React.useState<string | null>("info");
    const [publishDate, setPublishDate] = React.useState<string>("");

    const handleTagClick = (tag: TagDetailType) => {
        localStorage.setItem(
            "tagInfo",
            JSON.stringify({
                tagName: tag.display_name,
                tagType: tag.type.split("_").join(" "),
            })
        );
    };

    React.useEffect(
        () => setPublishDate(new Date(recipe.created_at).toLocaleDateString()),
        []
    ); //For hydration error due to getServerSideProps

    return (
        <React.Fragment>
            <Head>
                <title>Recipe Details</title>
            </Head>
            <Card p="md" mb={"5em"} className={styles.recipe_details__card}>
                <Stack justify="flex-start" spacing={6} mb="sm">
                    <Title className={styles.recipe_details__card__header}>
                        {recipe.name}
                    </Title>
                    <CustomRating value={recipe.user_ratings?.score} />
                    <Text size="md" color="dimmed">
                        <strong>Published:</strong> {publishDate}
                    </Text>
                </Stack>
                <Card.Section
                    px="md"
                    pt={3}
                    pb="md"
                    className="border border-solid border-gray-400 mb-8"
                >
                    {recipe.tags.length > 0 ? (
                        <>
                            <Text size={21} weight={600}>
                                Tags:
                            </Text>
                            <div className={styles.recipe_details__card__tags}>
                                {recipe.tags.map((tag) => (
                                    <NavButton
                                        color="dark"
                                        radius="xl"
                                        key={tag.id}
                                        className={styles.recipe_details__card__tags__item}
                                        url={`/tags/${tag.id}/recipes`}
                                        handleClick={() => handleTagClick(tag)}
                                    >
                                        {tag.display_name} ({tag.type.split("_").join(" ")})
                                    </NavButton>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Text size={21} weight={600}>
                            Tags: N/A
                        </Text>
                    )}
                </Card.Section>
                <section className="mb-8">
                    <Tabs
                        value={activeTab}
                        variant="outline"
                        onTabChange={setActiveTab}
                        classNames={{
                            tabLabel: "text-[18px]",
                        }}
                    >
                        <Card.Section>
                            <Tabs.List mb="xl">
                                <Tabs.Tab value="info">Basic Info</Tabs.Tab>
                                <Tabs.Tab value="instructions">Instructions</Tabs.Tab>
                            </Tabs.List>
                        </Card.Section>
                        <Tabs.Panel value="info">
                            <RecipeBasicInfo recipe={recipe} />
                        </Tabs.Panel>
                        <Tabs.Panel value="instructions">
                            <RecipeInstructions recipe={recipe} />
                        </Tabs.Panel>
                    </Tabs>
                </section>
            </Card>
        </React.Fragment>
    );
}
