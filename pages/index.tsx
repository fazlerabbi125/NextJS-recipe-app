import RecipeList from "../components/organisms/RecipeList";
import Header from "../components/organisms/Header";

export default function Home() {
    return (
        <section>
            <Header classNames={{ text: "text-center text-5xl mb-16" }}>
                Welcome to Faiyaz's Recipes
            </Header>
            <RecipeList />
        </section>
    );
}
