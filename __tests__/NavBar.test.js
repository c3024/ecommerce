import { render, screen } from "@testing-library/react";
import { CartDetailsContext } from "@/pages/_app";
import NavBar from "@/components/NavBar";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("@/components/SearchBar", () => () => <div>SearchBar</div>);
jest.mock("@/components/NavBarLogo", () => () => <div>NavBarLogo</div>);
jest.mock("@/components/NavBarUserCart", () => () => <div>NavBarUserCart</div>);

describe("NavBar", () => {
	const mockContext = {
		cartItems: [{ quantity: "2" }, { quantity: "3" }],
	};

	it("renders correctly", () => {
		render(
			<CartDetailsContext.Provider value={mockContext}>
				<NavBar />
			</CartDetailsContext.Provider>
		);
		const allSearchBarElements = screen.getAllByText("SearchBar");
		expect(allSearchBarElements.length).toBe(2);
		expect(screen.getByText("NavBarLogo")).toBeInTheDocument();
		expect(screen.getByText("NavBarUserCart")).toBeInTheDocument();
	});
});
