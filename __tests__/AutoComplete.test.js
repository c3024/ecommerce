import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useRouter } from "next/router";
import AutoComplete from "../components/AutoComplete";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("AutoComplete component", () => {
	const initialData = [
		{ Id: 1, Title: "Product 1" },
		{ Id: 2, Title: "Product 2" },
	];

	const autoCompleteProps = {
		initialData,
		searchString: "Product",
		topLevelProductCategory: "category",
		autoCompleteVisibility: true,
	};

	it("should render loading state when data is not available and there is no error", () => {
		const router = { push: jest.fn() };
		useRouter.mockImplementation(() => router);

		render(<AutoComplete {...autoCompleteProps} initialData={null} />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should render the search results when autoCompleteVisibility is true", () => {
		const router = { push: jest.fn() };
		useRouter.mockImplementation(() => router);

		render(<AutoComplete {...autoCompleteProps} />);

		expect(screen.getByText("Product 1")).toBeInTheDocument();
		expect(screen.getByText("Product 2")).toBeInTheDocument();
	});

	it("should not render search results when autoCompleteVisibility is false", () => {
		const router = { push: jest.fn() };
		useRouter.mockImplementation(() => router);

		render(
			<AutoComplete {...autoCompleteProps} autoCompleteVisibility={false} />
		);

		expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
		expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
	});

	it("should call router.push with correct parameters when a search result is clicked", () => {
		const router = { push: jest.fn() };
		useRouter.mockImplementation(() => router);

		render(<AutoComplete {...autoCompleteProps} />);

		fireEvent.click(screen.getByText("Product 1"));

		expect(router.push).toHaveBeenCalledWith("/category/1");
	});
});
