import db from "@/lib/firebase";
import { collection, where, query, limit, startAfter, orderBy, endBefore, limitToLast } from "firebase/firestore";
import { productCategoriesMap, subCategoriesMap } from "@/pages/_app";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProductResults } from "@/lib/utils";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
	const { topLevelProductCategory, subCategory, startAfterThisTitle, startBeforeThisTitle, pageDirection } = req.query as { topLevelProductCategory: string, subCategory: string, startAfterThisTitle: string, startBeforeThisTitle: string, pageDirection: string };
	let productsRef;
	if (pageDirection == "first") {
		productsRef = query(
			collection(db, productCategoriesMap[topLevelProductCategory]),
			where("ProductTypeName", "==", subCategoriesMap[subCategory]),
			orderBy("Title"),
			limit(20),
		);
	}
	else if (pageDirection == "next") {
		productsRef = query(
			collection(db, productCategoriesMap[topLevelProductCategory]),
			where("ProductTypeName", "==", subCategoriesMap[subCategory]),
			orderBy("Title"),
			startAfter(startAfterThisTitle),
			limit(20),
		);
	}
	else {
		productsRef = query(
			collection(db, productCategoriesMap[topLevelProductCategory]),
			where("ProductTypeName", "==", subCategoriesMap[subCategory]),
			orderBy("Title"),
			endBefore(startBeforeThisTitle),
			limitToLast(20),
		);

	}
	const products = await getProductResults(productsRef);
	res.status(200).json(products);
}