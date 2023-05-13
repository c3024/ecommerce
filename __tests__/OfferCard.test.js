import { render, screen } from "@testing-library/react";
import OfferCard from "@/components/OfferCard";
import { useRouter } from "next/router";
import React from "react";
import autoAccessories from "@/images/autoAccessories.jpg";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("OfferCard", () => {
	const mockPush = jest.fn();

	beforeEach(() => {
		useRouter.mockImplementation(() => ({
			push: mockPush,
		}));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockProps = {
		cardCategory: "category",
		cardTitle: "Card Title",
		childCards: [
			["description1", autoAccessories],
			["description2", autoAccessories],
		],
	};

	it("renders card title correctly", () => {
		render(<OfferCard {...mockProps} />);
		const titleElement = screen.getByText(mockProps.cardTitle);
		expect(titleElement).toBeInTheDocument();
	});

	it("renders correct number of child cards", () => {
		render(<OfferCard {...mockProps} />);
		const childCardElements = screen.getAllByRole("img"); // Assuming OfferCardChild renders an img element
		expect(childCardElements.length).toBe(mockProps.childCards.length);
	});
});
