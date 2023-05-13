import React from "react";
import placeholderImage from "@/images/productImagePlaceHolder.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface ProductProps {
	productDetails: {
		Id: string;
		Title: string;
		ListPrice: string;
		MRP: string;
	};
}

function Product({ productDetails }: ProductProps) {
	const router = useRouter();
	const { topLevelProductCategory } = router.query;
	return (
		<div
			className="w-full sm:w-72 mt-2 text-black rounded-lg flex flex-row sm:flex-col gap-1"
			data-testid="product"
		>
			<Image
				src={placeholderImage.src}
				alt="No image"
				width={192}
				height={192}
				className="w-24 self-center sm:w-full"
			/>

			<Link
				href={`/${topLevelProductCategory}/${productDetails.Id}`}
				className="m-2"
			>
				<p className="mt-auto mb-2">{productDetails.Title}</p>
				<div className="flex items-center">
					<h2 className="mr-1 text-xl font-bold">{productDetails.ListPrice}</h2>
					<h3>
						<s>{productDetails.MRP}</s>
					</h3>
				</div>
			</Link>
		</div>
	);
}

export default Product;
