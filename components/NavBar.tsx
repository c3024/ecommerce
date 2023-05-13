import React from "react";
import SearchBar from "@/components/SearchBar";
import { useContext } from "react";
import { CartDetailsContext } from "@/pages/_app";
import NavBarLogo from "@/components/NavBarLogo";
import NavBarUserCart from "./NavBarUserCart";

function NavBar() {
	const { cartItems } = useContext(CartDetailsContext);
	cartItems.reduce(
		(accumulator, current) => accumulator + Number(current.quantity),
		0
	);
	return (
		<nav className="text-white p-1 bg-black">
			<div className=" flex items-center h-16 justify-between">
				<NavBarLogo />
				<div className="hidden sm:block flex-1 p-1">
					<SearchBar />
				</div>
				<NavBarUserCart />
			</div>
			<div className="block sm:hidden m-1">
				<SearchBar />
			</div>
		</nav>
	);
}

export default NavBar;
