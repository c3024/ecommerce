import React from "react";
import ProductResults from "@/components/ProductResults";
import { collection, query, limit, where } from "firebase/firestore";
import db from "@/lib/firebase";
import { productCategoriesMap } from "@/pages/_app";
import { getProductResults } from "@/lib/utils";
import { GetServerSidePropsContext } from "next";
import { ProductResultsProps } from "@/lib/types";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { topLevelProductCategory, searchString } = context.params as {
		topLevelProductCategory: string;
		searchString: string;
	};
	const productsRef = query(
		collection(db, productCategoriesMap[topLevelProductCategory]),
		where(
			"Title_lowerCase",
			">=",
			searchString ? searchString.toLowerCase() : ""
		),
		limit(20)
	);
	const products = await getProductResults(productsRef);
	return { props: { products } };
}

const TopLevelProductCategoryIndex = function ({
	products,
}: ProductResultsProps) {
	if (!products) {
		return <div> Loading </div>;
	}
	return (
		<>
			<Head>
				<title>{products[0].CollectionName}</title>
			</Head>
			<div>
				<ProductResults products={products} />
			</div>
		</>
	);
};

export default TopLevelProductCategoryIndex;
