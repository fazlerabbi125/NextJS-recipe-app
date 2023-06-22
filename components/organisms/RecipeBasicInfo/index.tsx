import React from "react";
import { Heebo } from "next/font/google";
import {
  Text,
  List,
} from "@mantine/core";
import Image from "next/image";
import { RecipeDetailsType } from "@/pages/api/recipes/[recipeSlug]";
import styles from "./RecipeBasicInfo.module.scss";

const ubuntu = Heebo({ subsets: ["latin"] });

export interface RecipeInfoSectionProps {
  recipe: RecipeDetailsType;
}

const RecipeBasicInfo = ({ recipe }: RecipeInfoSectionProps) => {
  const ingredients = recipe.sections?.flatMap((section) => {
    return section.components.map((component: any) => ({
      name: component.raw_text,
      id: component.id,
    }));
  });
  return (
    <React.Fragment>
      <div className="mb-6">
        <Image
          src={recipe.thumbnail_url}
          alt={recipe.thumbnail_alt_text}
          unoptimized // display image optimization. May cause image to be blurry when fetched from CDN
          width={1}
          height={1}
          className={styles["recipe_basic-info__photo"]} // can override width and height attributes
        />
        <Text className={ubuntu.className}>
          <strong>Description:</strong> {recipe.description || "N/A"}
        </Text>
      </div>
      <div className={styles["recipe_basic-info__ingredients"]}>
        <Text className={styles["recipe_basic-info__ingredients__heading"]}>
          Ingredients
        </Text>
        <List className={styles["recipe_basic-info__ingredients__list"]}>
          {ingredients?.map((elem) => (
            <List.Item key={elem.id}>{elem.name}</List.Item>
          ))}
        </List>
      </div>
    </React.Fragment>
  );
};

export default RecipeBasicInfo;
