export interface ProductInterface {
	Id: string;
	Title: string;
	ListPrice: string;
	Image: string;
	CollectionName: string;
	MRP: string;
}

export interface ProductResultsProps {
	products: ProductInterface[];
}