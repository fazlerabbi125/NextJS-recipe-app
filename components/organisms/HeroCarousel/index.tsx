import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import carouselData from "@/public/assets/carousel.json";
import styles from "./HeroCarousel.module.scss";
import Image from "next/image";

interface HeroCarouselProps {}

export default function HeroCarousel(props: HeroCarouselProps) {
    const sliderRef = useRef<Slider | null>(null);

    const settings: Settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 3500,
        centerMode: true,
        pauseOnHover: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        centerPadding: "150px", // pad centre slide and change the width it consumes
        className: styles["hero-carousel"],
        dotsClass: ["slick-dots", styles["hero-carousel__dots"]].join(" "),
        responsive: [
            {
                breakpoint: 767.95,
                settings: {
                    centerPadding: "55px",
                },
            },
        ],
    };

    return (
        <div className={styles["hero-carousel__container"]}>
            <Slider {...settings} ref={sliderRef}>
                {carouselData.map((elem) => (
                    <div className={styles["hero-carousel__image-wrapper"]} key={elem.id}>
                        <Image
                            src={elem.src}
                            alt={`recipe-${elem.id}`}
                            fill
                            className={styles["hero-carousel__image"]}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
