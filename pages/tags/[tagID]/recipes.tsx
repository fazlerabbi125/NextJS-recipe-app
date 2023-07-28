import RecipeList from "@/components/organisms/RecipeList";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";
import { Text } from "@mantine/core";
import { GetServerSidePropsContext, NextPage } from "next";
import { TagDetailType } from "@/pages/api/tags/[tagID]";
import { fetchData } from "@/hooks/useAxios";

interface TagRecipesProps {
    tagInfo: TagDetailType;
}

const TagRecipes: NextPage<TagRecipesProps> = ({ tagInfo }) => {
    const router = useRouter();

    return (
        <>
            <Header className="text-3xl mb-2">{tagInfo.display_name} recipes</Header>
            <Text size={20} weight={600} mb="md" className="text-yellow-100">
                Type:{" "}
                {tagInfo.type.charAt(0).toUpperCase() + tagInfo.type.slice(1, tagInfo.type.length)}
            </Text>
            <RecipeList tags={parseInt(router.query?.tagID as string)} />
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext<{ tagID?: string }>) {
    const tagInfo: TagDetailType = await fetchData(`/tags/${context.params?.tagID}`);

    if (!tagInfo) {
        return {
            notFound: true,
        };
    }

    tagInfo.type = tagInfo.type.split("_").join(" ");

    return {
        props: {
            tagInfo,
        },
    };
}

export default TagRecipes;
