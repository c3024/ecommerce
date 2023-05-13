import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string): Promise<Product[]> =>
	fetch(url).then((res) => res.json());

// Type for the product data
interface Product {
	Id: number;
	Title: string;
}

// Type for the component props
interface AutoCompleteProps {
	initialData: Product[];
	searchString: string;
	topLevelProductCategory: string;
	autoCompleteVisibility: boolean;
	setAutoCompleteVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const AutoComplete = ({
	initialData,
	searchString,
	topLevelProductCategory,
	autoCompleteVisibility,
	setAutoCompleteVisibility,
}: AutoCompleteProps) => {
	const router = useRouter();
	const handleClick = (id: number) => {
		router.push(`/${topLevelProductCategory}/${id}`);
	};
	const { data: searchResults, error } = useSWR(
		`/api/searchBarProductsSearch?topLevelProductCategory=${encodeURIComponent(
			topLevelProductCategory
		)}&searchString=${encodeURIComponent(searchString)}`,
		fetcher,
		{ fallbackData: initialData }
	);
	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			router.push(
				`/${topLevelProductCategory}?searchString=${encodeURIComponent(
					searchString
				)}`
			);
			setAutoCompleteVisibility(false);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);
	if (autoCompleteVisibility) {
		if (!searchResults && !error) {
			return <div>Loading...</div>;
		}
		if (error) {
			return <div>Error: {error.message}</div>;
		}
		return (
			<div className="text-black-500 text-left border-2 bg-slate-200 ">
				{searchResults.map((product) => (
					<button
						key={product.Id}
						className="text-left text-base w-full p-1"
						onClick={() => handleClick(product.Id)}
					>
						{product.Title}
					</button>
				))}
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default AutoComplete;
