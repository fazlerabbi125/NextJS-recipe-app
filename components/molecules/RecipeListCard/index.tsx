import { Card, Stack, Text } from "@mantine/core";
import { RecipeDetailsType } from "@/pages/api/recipes/[recipeSlug]";
import Image from "next/image";
import CustomRating from "@/components/atoms/CustomRating";
import Link from "next/link";
import styles from "./RecipeListCard.module.scss";

interface RecipeListCardProps {
    recipe: RecipeDetailsType;
}

export default function RecipeListCard({ recipe }: RecipeListCardProps) {
    return (
        <Card shadow="sm" p="sm" radius="md" className={styles["recipe-list-card"]}>
            <Card.Section className={styles["recipe-list-card__photo"]}>
                <Image src={recipe.thumbnail_url} alt={recipe.thumbnail_alt_text} fill />
            </Card.Section>
            <Stack justify="flex-start" spacing={6}>
                <Text weight={500}>{recipe.name}</Text>
                <CustomRating value={recipe.user_ratings?.score} />
                <Text size="sm" color="dimmed" className="truncate">
                    {recipe.description || "No description"}
                </Text>
            </Stack>
            <div className={styles["recipe-list-card__footer"]}>
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
    );
}
