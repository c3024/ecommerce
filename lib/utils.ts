import { getDocs } from "firebase/firestore";
import { QuerySnapshot, Query } from "firebase/firestore";
import { ProductInterface } from "./types";


export const getProductResults = async (productsRef : Query) : Promise<ProductInterface[]>=> {
	const snapshot : QuerySnapshot = await getDocs(productsRef);
	const productResults : ProductInterface[] = [];
	snapshot.forEach((doc) => {
		const docData = doc.data();
		if (!!docData) {
			productResults.push(docData as ProductInterface);
		}
	});
	return productResults;
};