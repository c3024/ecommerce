import db from "@/lib/firebase";
import { getDoc } from "firebase/firestore";
import { productCategoriesMap } from "@/pages/_app";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
	const { topLevelProductCategory, id: Id } = req.query as {topLevelProductCategory : string, id: string};
	const docRef = db.doc(`${productCategoriesMap[topLevelProductCategory]}/${Id}`);
	const docSnap = await getDoc(docRef);
	const docData = docSnap.data();
	res.status(200).json(docData);
}
