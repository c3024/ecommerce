import db from "@/lib/firebase";
import {
	collection,
	where,
	query,
	orderBy,
	limit,
} from "firebase/firestore";
import { productCategoriesMap } from "@/pages/_app";
import { getProductResults } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
	const { topLevelProductCategory, searchString } = req.query as { topLevelProductCategory : string, searchString: string};
	const productsRef = query(
		collection(db, productCategoriesMap[topLevelProductCategory]),
		where("Title_lowerCase", ">=", searchString.toLowerCase()),
		orderBy("Title_lowerCase"),
		limit(10)
	);
	const products = await getProductResults(productsRef);
	res.status(200).json(products);
}