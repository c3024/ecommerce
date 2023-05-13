import React, { useState } from "react";
import ProductResults from "@/components/ProductResults";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SubCategoryProducts() {
	const router = useRouter();
	const { topLevelProductCategory, subCategory } = router.query as {
		topLevelProductCategory: string;
		subCategory: string;
	};
	const [startAfterThisTitle, setStartAfterThisTitle] = useState("");
	const [startBeforeThisTitle, setStartBeforeThisTitle] = useState("");
	const [pageDirection, setPageDirection] = useState("first");
	const { data: products } = useSWR(
		`/api/subCategoryProducts?topLevelProductCategory=${encodeURIComponent(
			topLevelProductCategory
		)}&subCategory=${encodeURIComponent(
			subCategory
		)}&startAfterThisTitle=${encodeURIComponent(
			startAfterThisTitle
		)}&startBeforeThisTitle=${encodeURIComponent(
			startBeforeThisTitle
		)}&pageDirection=${encodeURIComponent(pageDirection)}`,
		fetcher
	);

	const getNextResults = () => {
		setStartAfterThisTitle(
			products[products.length - 1] ? products[products.length - 1].Title : ""
		);
		setPageDirection("next");
	};

	const getPreviousResults = () => {
		setStartBeforeThisTitle(products[0]?.Title);
		setPageDirection("previous");
	};

	if (!products) {
		return (
			<div
				className={`h-1 animate-pulse bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 sticky top-1 z-10`}
			></div>
		);
	} else if (products.length < 20 && pageDirection === "previous") {

	/* when user clicks till last page and starts clicking prev button till first page, t
	 * the first page will have less than 20 products then to avoid showing fewer products
	 * than 20, we set pageDirection to first and return the first page
	 */
		setPageDirection("first");
	}
	return (
		<>
			<Head>
				<title>{products[0]?.CollectionName}</title>
			</Head>
			<div>
				<ProductResults products={products} />
			</div>
			<div className={`flex justify-center`}>
				<button
					className={`text-right m-5 border-2 pr-2 pl-2 rounded-xl ${
						pageDirection === "first" ||
						(products.length < 20 && pageDirection === "previous")
							? "invisible"
							: "visible"
					}`}
					onClick={getPreviousResults}
				>
					{`< Prev`}
				</button>
				<button
					className={`text-right m-5 border-2 pr-2 pl-2 rounded-xl ${
						products.length < 20 &&
						(pageDirection === "next" || pageDirection === "first")
							? "invisible"
							: "visible"
					}`}
					onClick={getNextResults}
				>
					{`Next  >`}
				</button>
			</div>
		</>
	);
}

export default SubCategoryProducts;
