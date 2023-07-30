import React from "react";
import { useRouter } from "next/router";
import { Loader, Text } from "@mantine/core";
import ListPagination from "../../molecules/ListPagination";
import { RecipeListType } from "@/pages/api/recipes";
import { RecipeDetailsType } from "@/pages/api/recipes/[recipeSlug]";
import RecipeListCard from "@/components/molecules/RecipeListCard";
import { useAxios, CustomAxiosResponse } from "@/hooks/useAxios";
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
            query: page > 1 ? { page, ...rest } : rest,
        });
    }

    if (isLoading) {
        return (
            <div className={styles["recipe-list__loading"]}>
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
                    <div className={styles["recipe-list__container"]}>
                        {recipeList.results.map((recipe: RecipeDetailsType) => (
                            <RecipeListCard recipe={recipe} key={recipe.id} />
                        ))}
                    </div>
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
