import { render, screen } from "@testing-library/react";
import OfferCardLayout from "@/components/OfferCardLayout";
import OfferCard from "@/components/OfferCard";
import { within } from "@testing-library/dom";
import homeToolsSmall from "@/images/home-tools-small.jpeg";
import petSuppliesSmall from "@/images/pet-supplies-small.jpeg";
import plumbingFixturesSmall from "@/images/plumbing-fixtures-small.jpeg";
import sportingGoodsSmall from "@/images/sporting-goods-small.jpeg";
import autoPartsSmall from "@/images/autoPartsSmall.jpg";
import autoAccessories from "@/images/autoAccessories.jpg";
import powerVehicleSportsParts from "@/images/powerVehicleSportsParts.jpg";
import outdoorLiving from "@/images/outdoorLiving.jpg";
import wirelessAccessories from "@/images/wirelessAccessories.jpg";
import digitalVideoRecorders from "@/images/digitalVideoRecorders.jpg";
import receiversAndAmplifiers from "@/images/receiversAndAmplifiers.jpg";
import personalComputers from "@/images/personalComputers.jpg";
import React from "react";

jest.mock("@/components/OfferCard", () => jest.fn());

describe("OfferCardLayout", () => {
	it("renders OfferCard component three times", () => {
		render(<OfferCardLayout />);
		expect(OfferCard).toHaveBeenCalledTimes(3);
	});

	it("renders OfferCard component with correct props", () => {
		render(<OfferCardLayout />);
		expect(OfferCard).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				cardCategory: "Home",
				cardTitle: "Home & more | Up to 60% off",
				childCards: [
					["Home tools", homeToolsSmall],
					["Sporting goods", sportingGoodsSmall],
					["Pet supplies", petSuppliesSmall],
					["Plumbing fixtures", plumbingFixturesSmall],
				],
			}),
			{}
		);
		expect(OfferCard).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({
				cardCategory: "Automotive products",
				cardTitle: "Automotive essentials | Up to 60% off",
				childCards: [
					["Auto parts", autoPartsSmall],
					["Auto accessories", autoAccessories],
					["Powersports vehicle parts", powerVehicleSportsParts],
					["Outdoor living", outdoorLiving],
				],
			}),
			{}
		);
		expect(OfferCard).toHaveBeenNthCalledWith(
			3,
			expect.objectContaining({
				cardCategory: "Electronics",
				cardTitle: "Up to 60% off | Electronics",
				childCards: [
					["Wireless accessories", wirelessAccessories],
					["Digital video recorders", digitalVideoRecorders],
					["Receivers and amplifiers", receiversAndAmplifiers],
					["Personal computers", personalComputers],
				],
			}),
			{}
		);
	});
});
