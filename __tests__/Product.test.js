import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Product from "../components/Product";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Product", () => {
	const productDetails = {
		Id: "1",
		Title: "Test Product",
		ListPrice: "$100",
		MRP: "$150",
	};

	beforeEach(() => {
		useRouter.mockReturnValue({
			query: { topLevelProductCategory: "category" },
		});
	});

	test("renders the Product component without crashing", () => {
		render(<Product productDetails={productDetails} />);
		expect(screen.getByTestId("product")).toBeInTheDocument();
	});

	test("renders the image with correct src attribute", () => {
		render(<Product productDetails={productDetails} />);
		expect(screen.getByAltText("No image")).toBeInTheDocument();
	});

	test("renders the product title correctly", () => {
		render(<Product productDetails={productDetails} />);
		expect(screen.getByText(productDetails.Title)).toBeInTheDocument();
	});

	test("renders the product list price and MRP correctly", () => {
		render(<Product productDetails={productDetails} />);
		expect(screen.getByText(productDetails.ListPrice)).toBeInTheDocument();
		expect(screen.getByText(productDetails.MRP)).toBeInTheDocument();
	});
});
