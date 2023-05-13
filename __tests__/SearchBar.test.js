import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";
import AutoComplete from "@/components/AutoComplete";
import SearchIconComponent from "@/components/SearchIconComponent";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("@/components/AutoComplete", () => jest.fn());
jest.mock("@/components/SearchIconComponent", () => jest.fn());

describe("SearchBar", () => {
	it("renders without crashing", () => {
		render(<SearchBar />);
		const searchInput = screen.getByTestId("search-input");
		expect(searchInput).toBeInTheDocument();
	});

	it("changes topLevelProductCategory on select change", () => {
		render(<SearchBar />);
		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "Electronics" } });
		expect(select.value).toBe("Electronics");
	});

	it("changes searchString and autoCompleteVisibility on input change", () => {
		render(<SearchBar />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "test" } });
		expect(input.value).toBe("test");
		expect(AutoComplete).toHaveBeenCalledTimes(1);
	});
});
