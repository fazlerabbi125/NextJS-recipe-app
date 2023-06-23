import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Card, Loader, Text, Stack } from "@mantine/core";
import ListPagination from "../../molecules/ListPagination";
import CustomRating from "../../atoms/CustomRating";
import { RecipeListType } from "../../../pages/api/recipes";
import { RecipeDetailsType } from "../../../pages/api/recipes/[recipeSlug]";
import { useAxios, CustomAxiosResponse } from "../../../hooks/useAxios";
import styles from "./RecipeList.module.scss";

interface RecipeListProps {
    tags?: number;
}

type RecipeListResponse = CustomAxiosResponse<RecipeListType>;

const RecipeList = (props: RecipeListProps) => {
    const router = useRouter();
    const itemsPerPage = 9;
    const page = React.useMemo<number>(() => Number(router.query?.page || 1), [router.query?.page]);
    const start = (page - 1) * itemsPerPage;
    const end = (page - 1) * itemsPerPage + itemsPerPage;
    const {
        data: recipeList,
        error,
        isLoading,
    }: RecipeListResponse = useAxios("/recipes", {
        start,
        end,
        tags: props.tags || "",
    });
    const total = React.useMemo(() => recipeList?.count || 0, [recipeList?.count]);

    function handlePageChange(page: number) {
        const { page: _, ...rest } = router.query;
        router.push({
            pathname: router.pathname,
            query:
                page > 1
                    ? {
                          page,
                          ...rest,
                      }
                    : rest,
        });
    }

    if (isLoading) {
        return (
            <div className={styles.recipe_list__loading}>
                <Loader color="dark" />
            </div>
        );
    }

    if (error) {
        return <div className="response-error">{error.message}</div>;
    }

    return (
        <div className="mt-12 mb-10">
            {recipeList && recipeList.results.length > 0 ? (
                <React.Fragment>
                    <Flex className="gap-20" justify="center" direction="row" wrap="wrap">
                        {recipeList.results.map((recipe: RecipeDetailsType) => (
                            <Card
                                shadow="sm"
                                p="sm"
                                radius="md"
                                className={styles.recipe_list__card}
                                key={recipe.id}
                            >
                                <Card.Section className={styles.recipe_list__card__photo}>
                                    <Image
                                        src={recipe.thumbnail_url}
                                        alt={recipe.thumbnail_alt_text}
                                        fill
                                    />
                                </Card.Section>
                                <Stack justify="flex-start" spacing={6}>
                                    <Text weight={500}>{recipe.name}</Text>
                                    <CustomRating value={recipe.user_ratings?.score} />
                                    <Text size="sm" color="dimmed" className="truncate">
                                        {recipe.description || "No description"}
                                    </Text>
                                </Stack>
                                <div className={styles.recipe_list__card__footer}>
                                    <Link
                                        className="btn btn--danger w-8/12"
                                        href={{
                                            pathname: "/recipes/[recipeSlug]",
                                            query: { recipeSlug: recipe.slug },
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </Flex>
                    <ListPagination
                        page={page}
                        onPageChange={handlePageChange}
                        totalPages={Math.ceil(total / itemsPerPage)}
                        className="my-5"
                        itemClassName="pagination_items"
                    />
                </React.Fragment>
            ) : (
                <Text align="center" weight={600} className="text-3xl">
                    No recipes found
                </Text>
            )}
        </div>
    );
};

export default RecipeList;
