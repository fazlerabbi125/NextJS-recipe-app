import React from "react";
import { useRouter } from "next/router";
import { fetchData } from "@/hooks/useAxios";
import { RecipeDetailsType } from "../api/recipes/[recipeSlug]";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Card, Title, Stack, Text, Tabs, Flex } from "@mantine/core";
import NavButton from "@/components/atoms/NavButton";
import CustomRating from "@/components/atoms/CustomRating";
import RecipeBasicInfo from "@/components/organisms/RecipeBasicInfo";
import RecipeInstructions from "@/components/organisms/RecipeInstructions";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import { buildClassNames } from "@/utils/buildClassNames";
import styles from "./RecipeDetails.module.scss";

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ recipeSlug?: string }>
) {
    const recipe: RecipeDetailsType = await fetchData(`/recipes/${context.params?.recipeSlug}`);

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
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<"info" | "instructions" | null>("info");

    return (
        <React.Fragment>
            <Card p="md" mb={"5em"} className={styles["recipe-details__card"]}>
                <Stack justify="flex-start" spacing={6} mb="sm">
                    <Title className={styles["recipe-details__card-header"]}>{recipe.name}</Title>
                    <CustomRating value={recipe.user_ratings?.score} />
                    <Flex justify={"space-between"} align={"center"} gap={10} wrap={"wrap"}>
                        <Text size="md" color="dimmed">
                            <strong>Published:</strong>{" "}
                            {new Date(recipe.created_at).toLocaleDateString()}
                        </Text>
                        <div className={styles["recipe-details__share"]}>
                            <FacebookShareButton
                                url={(process.env.NEXT_PUBLIC_HOST || "") + router.asPath}
                                resetButtonStyle={false}
                                className={buildClassNames(
                                    styles["recipe-details__share-btn"],
                                    styles["recipe-details__share-btn--fb"]
                                )}
                            >
                                <FacebookIcon size={35} />
                                <span>Share</span>
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={(process.env.NEXT_PUBLIC_HOST || "") + router.asPath}
                                resetButtonStyle={false}
                                className={buildClassNames(
                                    styles["recipe-details__share-btn"],
                                    styles["recipe-details__share-btn--twitter"]
                                )}
                            >
                                <TwitterIcon size={35} />
                                <span>Tweet</span>
                            </TwitterShareButton>
                        </div>
                    </Flex>
                </Stack>
                <Card.Section
                    px="md"
                    pt={3}
                    pb="md"
                    className={`${styles["recipe-details__tags"]} mb-8`}
                >
                    {recipe.tags.length > 0 ? (
                        <>
                            <Text size={21} weight={600}>
                                Tags:
                            </Text>
                            <div className={styles["recipe-details__tags-list"]}>
                                {recipe.tags.map((tag) => (
                                    <NavButton
                                        color="dark"
                                        radius="xl"
                                        key={tag.id}
                                        className={styles["recipe-details__tags-item"]}
                                        url={`/tags/${tag.id}/recipes`}
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
                        onTabChange={(value) => setActiveTab(value as typeof activeTab)}
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
