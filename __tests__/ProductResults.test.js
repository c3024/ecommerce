import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductResults from "../components/ProductResults";
import Product from "@/components/Product";

jest.mock("@/components/Product", () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe("ProductResults", () => {
	const products = [
		{
			Id: "1",
			Title: "Test Product 1",
			ListPrice: "$100",
			MRP: "$150",
		},
		{
			Id: "2",
			Title: "Test Product 2",
			ListPrice: "$120",
			MRP: "$170",
		},
	];

	test("renders the ProductResults component without crashing", () => {
		render(<ProductResults products={products} />);
		expect(screen.getByTestId("product-results")).toBeInTheDocument();
	});

	test("renders the correct number of Product components", () => {
		Product.mockReturnValue(<div data-testid="mock-product" />);
		render(<ProductResults products={products} />);
		expect(screen.getAllByTestId("mock-product").length).toBe(products.length);
	});
});
