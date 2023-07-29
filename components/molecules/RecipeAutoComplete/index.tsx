import { FC, useState, useEffect, useRef, useId } from "react";
import { Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { fetchData } from "@/hooks/useAxios";
import { withRouter, NextRouter } from "next/router";
import { RecipeAutoCompleteTypeItem } from "@/pages/api/recipes/search";
import { TbSearch } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import styles from "./RecipeAutoComplete.module.scss";

const RecipeAutoComplete: FC<{ router: NextRouter }> = ({ router }) => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<RecipeAutoCompleteTypeItem[] | null>(null);
    const parentID = useId();
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch] = useDebouncedValue(search, 1000);

    function redirectToRecipe(item: RecipeAutoCompleteTypeItem) {
        setSearch("");
        setOpen(false);
        router.push(`/recipes/${item.slug}`);
    }

    useEffect(() => {
        // Make API call and update suggestions
        let isApiSubscribed = true;

        const fetchSuggestions = async () => {
            if (isApiSubscribed) {
                try {
                    const data = await fetchData("/recipes/search", {
                        search: debouncedSearch,
                    });
                    setSuggestions(data);
                } catch (err: any) {
                    console.log(err.message);
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (debouncedSearch.length > 0) {
            setLoading(true);
            fetchSuggestions();
        } else {
            setLoading(false);
            setSuggestions(null);
        }

        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }, [debouncedSearch]);

    useEffect(() => {
        const closeMenu = (e: any) => {
            if (e.target && !parentRef.current?.contains(e.target)) {
                setOpen(false); // close menu when clicked anywhere outside of the component
            }
        };
        document.body.addEventListener("mousedown", closeMenu); // as click event may give wrong behaviour
        return () => document.body.removeEventListener("mousedown", closeMenu);
    }, [parentRef]);

    return (
        <div className={styles["recipe-autocomplete"]} id={parentID} ref={parentRef}>
            <div
                className={styles["recipe-autocomplete__field"]}
                tabIndex={0}
                onFocus={() => setOpen(true)}
            >
                <TbSearch size={16} color="#8e8e93" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles["recipe-autocomplete__field-input"]}
                    placeholder="Search recipes by name or ingredients"
                />
                {loading ? (
                    <Loader size={16} color="gray" />
                ) : (
                    search && (
                        <RxCross2
                            className={styles["recipe-autocomplete__field-clear"]}
                            onClick={() => setSearch("")}
                        />
                    )
                )}
            </div>
            <div
                className={[
                    styles["recipe-autocomplete__dropdown"],
                    search && !loading && open && suggestions
                        ? styles["recipe-autocomplete__dropdown--show"]
                        : "",
                ].join(" ")}
            >
                {suggestions?.length === 0 ? (
                    <div className="text-center">No recipes found</div>
                ) : (
                    <>
                        {suggestions?.map((item) => (
                            <div
                                key={item.value}
                                onClick={() => redirectToRecipe(item)}
                                className={styles["recipe-autocomplete__dropdown-item"]}
                            >
                                {item.value}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default withRouter(RecipeAutoComplete);
