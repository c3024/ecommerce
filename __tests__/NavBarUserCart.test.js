import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBarUserCart from "@/components/NavBarUserCart";
import { CartDetailsContext } from "@/pages/_app";
import useAuth from "@/lib/useAuth";

jest.mock("@/lib/useAuth", () => jest.fn());

describe("NavBarUserCart", () => {
	const mockCartItems = [
		{ id: "1", quantity: 2 },
		{ id: "2", quantity: 5 },
	];

	beforeEach(() => {
		useAuth.mockImplementation(() => {
			return { user: null, signInWithGoogle: jest.fn(), signOut: jest.fn() };
		});
	});

	test("renders the NavBarUserCart component without crashing", () => {
		render(
			<CartDetailsContext.Provider value={{ cartItems: mockCartItems }}>
				<NavBarUserCart />
			</CartDetailsContext.Provider>
		);
		expect(screen.getByTestId("navbar-user-cart")).toBeInTheDocument();
	});

	test("displays the sign-in button when user is not signed in", () => {
		render(
			<CartDetailsContext.Provider value={{ cartItems: mockCartItems }}>
				<NavBarUserCart />
			</CartDetailsContext.Provider>
		);
		expect(screen.getByText("Sign in")).toBeInTheDocument();
	});
	test("displays the sign-out button when user is signed in", () => {
		useAuth.mockReturnValue({
			user: { displayName: "John Doe" },
			signInWithGoogle: jest.fn(),
			signOut: jest.fn(),
		});

		render(
			<CartDetailsContext.Provider value={{ cartItems: mockCartItems }}>
				<NavBarUserCart />
			</CartDetailsContext.Provider>
		);
		expect(screen.getByText("Sign out")).toBeInTheDocument();
	});

	test("displays the correct cart quantity", () => {
		render(
			<CartDetailsContext.Provider value={{ cartItems: mockCartItems }}>
				<NavBarUserCart />
			</CartDetailsContext.Provider>
		);
		expect(screen.getByText("7")).toBeInTheDocument();
	});
});
