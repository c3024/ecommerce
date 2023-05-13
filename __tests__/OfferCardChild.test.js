import { render, screen } from "@testing-library/react";
import OfferCardChild from "@/components/OfferCardChild";
import React from "react";
import autoAccessories from "@/images/autoAccessories.jpg";
import "@testing-library/jest-dom";

describe("OfferCardChild", () => {
	const mockProps = {
		image: autoAccessories,
		description: "Test Description",
	};

	it("renders without crashing", () => {
		render(<OfferCardChild {...mockProps} />);
		const offerCardChild = screen.getByTestId("offer-card-child");
		expect(offerCardChild).toBeInTheDocument();
	});

	it("renders image with correct src", () => {
		render(<OfferCardChild {...mockProps} />);
		const imageElement = screen.getByRole("img");
		expect(imageElement).toHaveAttribute("src", mockProps.image.src);
	});

	it("renders correct description", () => {
		render(<OfferCardChild {...mockProps} />);
		const descriptionElement = screen.getByText(mockProps.description);
		expect(descriptionElement).toBeInTheDocument();
	});
});
