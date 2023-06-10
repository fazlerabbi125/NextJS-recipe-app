import React from "react";
import { TextInput, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useAxios, CustomAxiosResponse } from "@/hooks/useAxios";
import { TagListType } from "../api/tags";
import { TagDetailType } from "../api/tags";
import NavButton from "@/components/atoms/NavButton";
import ListPagination from "@/components/molecules/ListPagination";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";
import styles from "./Tags.module.scss";

type TagListResponse = CustomAxiosResponse<TagListType>;

export default function TagList() {
  const router = useRouter();
  const itemsPerPage = 40;
  const page = React.useMemo<number>(() => Number(router.query?.page || 1), [router.query?.page]);
  const [tagName, setTagName] = React.useState("");
  const [debouncedTagName] = useDebouncedValue(tagName, 500);

  const start = (page - 1) * itemsPerPage;
  const end = (page - 1) * itemsPerPage + itemsPerPage;

  const handleTagClick = (tag: TagDetailType) => {
    localStorage.setItem(
      "tagInfo",
      JSON.stringify({
        tagName: tag.display_name,
        tagType: tag.type.split("_").join(" "),
      })
    );
  };

  const {
    data: tagList,
    error,
    isLoading,
  }: TagListResponse = useAxios("/tags", {
    start,
    end,
    tagName: debouncedTagName,
  });

  const totalTags = tagList?.count || 0;

  function handlePageChange(page: number) {
    const { page: _, ...rest } = router.query;
    router.push({
      pathname: router.pathname,
      query: page > 1 ? {
        page,
        ...rest
      } : rest
    })
  }

  return (

    <section>
      {isLoading && (
        <div className="flex justify-center">
          <Loader color="dark" />
        </div>
      )}
      {error && <div className="response-error">{error.message}</div>}
      {!error && tagList && (
        <>
          <TextInput
            placeholder="Search tag by name or type"
            radius="xl"
            size="md"
            className="w-4/12 mx-auto"
            value={tagName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTagName(e.target.value)
            }
          />
          <Header className="text-center text-4xl mt-10 mb-12">
            {tagList.results.length > 0 ? "Available Tags" : "No tags found"}
          </Header>
          {tagList.results.length > 0 && (
            <>
              <div className={styles["tag-list"]}>
                {tagList.results.map((tag) => {
                  return (
                    <NavButton
                      color="dark"
                      radius="xl"
                      key={tag.id}
                      className={styles["tag-list__item"]}
                      styles={{
                        label: {
                          whiteSpace: "unset",
                        }
                      }}
                      url={{
                        pathname: "/tags/[tagID]/recipes",
                        query: {
                          tagID: tag.id,
                        },
                      }}
                      handleClick={() => handleTagClick(tag)}
                    >
                      {tag.display_name} ({tag.type.split("_").join(" ")})
                    </NavButton>
                  );
                })}
              </div>
              <ListPagination
                page={page}
                onPageChange={handlePageChange}
                totalPages={Math.ceil(totalTags / itemsPerPage)}
                className="my-5"
                itemClassName="pagination_items"
              />
            </>
          )}
        </>
      )}
    </section>
  );
}
