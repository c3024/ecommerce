import React, { useState, ChangeEvent } from "react";
import AutoComplete from "@/components/AutoComplete";
import SearchIconComponent from "@/components/SearchIconComponent";

function SearchBar() {
	const [autoCompleteVisibility, setAutoCompleteVisibility] = useState(false);
	const [topLevelProductCategory, setTopLevelProductCategory] = useState("All");
	const [searchString, setSearchString] = useState("");
	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setTopLevelProductCategory(e.target.value);
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAutoCompleteVisibility(true);
		setSearchString(e.target.value);
	};
	return (
		<div
			className="flex items-center bg-black text-black h-10"
			data-testid="search-input"
		>
			<select
				name="searchCategory"
				className="shrink-1 basis-auto rounded-bl rounded-tl h-full text-center bg-white border-black border-solid w-12 p-1"
				onChange={handleSelectChange}
			>
				<option value="All">All</option>
				<option value="Automotive products">Automotive products</option>
				<option value="Electronics">Electronics</option>
				<option value="Home">Home</option>
			</select>

			<div className="flex-1 h-full z-50">
				<input
					className="text-base p-2 text-black h-full bg-white w-full"
					placeholder={"Search Amazon"}
					value={searchString}
					onChange={handleInputChange}
					onBlur={() => setTimeout(() => setAutoCompleteVisibility(false), 200)}
				/>
				{searchString ? (
					<AutoComplete
						initialData={[]}
						searchString={searchString}
						topLevelProductCategory={topLevelProductCategory}
						autoCompleteVisibility={autoCompleteVisibility}
						setAutoCompleteVisibility={setAutoCompleteVisibility}
					/>
				) : (
					<></>
				)}
			</div>
			<SearchIconComponent
				topLevelProductCategory={topLevelProductCategory}
				searchString={searchString}
			/>
		</div>
	);
}

export default SearchBar;
