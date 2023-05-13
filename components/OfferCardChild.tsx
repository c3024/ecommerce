import React from "react";
import Image from "next/image";

interface OfferCardChildProps {
	image: { src: string };
	description: string;
}

const OfferCardChild = function ({ image, description }: OfferCardChildProps) {
	return (
		<div className=" pb-6 h-24 w-32 m-1" data-testid="offer-card-child">
			<Image
				src={image.src}
				alt=""
				width={256}
				height={192}
				className="w-full h-full object-cover object-top"
			/>
			<p className="text-sm m-1">{description}</p>
		</div>
	);
};

export default OfferCardChild;
