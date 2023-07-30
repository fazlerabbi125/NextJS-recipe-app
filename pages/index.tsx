import RecipeList from "@/components/organisms/RecipeList";
import Header from "../components/organisms/Header";
import HeroCarousel from "@/components/organisms/HeroCarousel";

export default function Home() {
    return (
        <section>
            <HeroCarousel />
            <Header classNames={{ content: "text-center text-5xl my-8" }}>
                Welcome to Faiyaz's Recipes
            </Header>
            <RecipeList />
        </section>
    );
}
