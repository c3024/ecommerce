import React from "react";
import Product from "@/components/Product";
import { ProductResultsProps } from "@/lib/types";

function ProductResults({ products }: ProductResultsProps) {
	return (
		<div
			className="flex flex-wrap gap-1 justify-start sm:justify-around"
			data-testid="product-results"
		>
			{products.map((productDetails) => (
				<div key={productDetails.Id}>
					<Product productDetails={productDetails} />
				</div>
			))}
		</div>
	);
}

export default ProductResults;
