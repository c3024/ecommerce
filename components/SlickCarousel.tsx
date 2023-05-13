import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/SlickCarousel.module.css";
import { useRouter } from "next/router";
import millionProducts from "@/images/millionProducts.jpg";
import computers from "@/images/computers.jpg";
import Image from "next/image";

export default function SlickCarousel() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	};
	const router = useRouter();

	return (
		<div>
			<Slider {...settings} className={styles.slider}>
				<div className="pointer-events-none">
					<Image
						src={millionProducts.src}
						alt=""
						height={464}
						width={1944}
						className="max-h-72 ml-auto mr-auto"
					/>

					<div
						className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer pointer-events-auto"
						onClick={() => router.push("/all")}
					/>
				</div>
				<div className="pointer-events-none">
					<Image
						src={computers.src}
						height={464}
						width={1944}
						alt=""
						className="max-h-72 ml-auto mr-auto"
					/>

					<div
						className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer pointer-events-auto"
						onClick={() => router.push("/electronics")}
					/>
				</div>
			</Slider>
		</div>
	);
}
