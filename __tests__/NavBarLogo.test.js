import { render, screen } from "@testing-library/react";
import NavBarLogo from "@/components/NavBarLogo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("next/image", () => () => <img />);
jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("NavBarLogo", () => {
	it("renders correctly", () => {
		render(<NavBarLogo />);

		const imgElement = screen.getByRole("img");
		expect(imgElement).toBeInTheDocument();
	});
});
