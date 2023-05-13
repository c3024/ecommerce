import React from "react";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";

interface SearchIconProps {
	searchString: string;
	topLevelProductCategory: string;
}

function SearchIcon({
	searchString,
	topLevelProductCategory,
}: SearchIconProps) {
	const router = useRouter();
	const handleClick = () => {
		router.push(
			`/${topLevelProductCategory}?searchString=${encodeURIComponent(
				searchString
			)}`
		);
	};
	return (
		<IconContext.Provider
			value={{
				className: "bg-orange-300 h-full w-12 p-2 rounded-tr rounded-br",
			}}
		>
			<button
				className="h-full border-none text-black p-0"
				onClick={handleClick}
			>
				<BsSearch data-testid="search-icon" />
			</button>
		</IconContext.Provider>
	);
}

export default SearchIcon;
