import SlickCarousel from "@/components/SlickCarousel";
import OfferCardLayout from "@/components/OfferCardLayout";
import Head from "next/head";
import React from "react";

export default function Home() {
	return (
		<>
			<Head>
				<title>Online Shopping on Amazon</title>
			</Head>
			<SlickCarousel />
			<OfferCardLayout />
		</>
	);
}
