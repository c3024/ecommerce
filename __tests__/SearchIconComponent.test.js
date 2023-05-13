import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchIcon from "../components/SearchIconComponent";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("SearchIcon", () => {
	const searchString = "test";
	const topLevelProductCategory = "category";

	test("renders the SearchIcon component without crashing", () => {
		render(
			<SearchIcon
				searchString={searchString}
				topLevelProductCategory={topLevelProductCategory}
			/>
		);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("calls useRouter.push with correct parameters when clicked", () => {
		const push = jest.fn();
		useRouter.mockReturnValue({ push });

		render(
			<SearchIcon
				searchString={searchString}
				topLevelProductCategory={topLevelProductCategory}
			/>
		);
		fireEvent.click(screen.getByRole("button"));

		expect(push).toHaveBeenCalledWith(
			`/${topLevelProductCategory}?searchString=${encodeURIComponent(
				searchString
			)}`
		);
	});

	test("renders the BsSearch icon", () => {
		render(
			<SearchIcon
				searchString={searchString}
				topLevelProductCategory={topLevelProductCategory}
			/>
		);
		expect(screen.getByTestId("search-icon")).toBeInTheDocument();
	});
});
