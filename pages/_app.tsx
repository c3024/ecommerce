import "@/styles/globals.css";
import { useState, createContext, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ProductInterface } from "@/lib/types";
import React from "react";
import Head from "next/head";

export const subCategoriesMap: CategoriesMap = {
	"Auto parts": "AUTO_PART",
	"Auto accessories": "AUTO_ACCESSORY",
	"Powersports vehicle parts": "POWERSPORTS_VEHICLE_PART",
	"Outdoor living": "OUTDOOR_LIVING",
	"Home tools": "TOOLS",
	"Sporting goods": "SPORTING_GOODS",
	"Pet supplies": "PET_SUPPLIES",
	"Plumbing fixtures": "PLUMBING_FIXTURE",
	"Wireless accessories": "WIRELESS_ACCESSORY",
	"Digital video recorders": "DIGITAL_VIDEO_RECORDER",
	"Receivers and amplifiers": "RECEIVER_OR_AMPLIFIER",
	"Personal computers": "PERSONAL_COMPUTER",
};

interface CategoriesMap {
	[key: string]: string;
}

export const productCategoriesMap: CategoriesMap = {
	"Automotive products": "automotiveProducts",
	"automotive products": "automotiveProducts",
	automotiveProducts: "automotiveProducts",
	All: "all",
	all: "all",
	electronics: "electronics",
	Home: "home",
	home: "home",
	Electronics: "electronics",
};

export interface CartItem extends ProductInterface {
	quantity: number;
}

interface CartDetailsContextType {
	cartItems: CartItem[];
	setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartDetailsContext = createContext<CartDetailsContextType>({
	cartItems: [],
	setCartItems: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	/*  on page load from server, set justLoadedFromServer to true 
		so that useEffect doesn't save nil cartItems after server render to localStorage
		first cartItems will update from localStorage
		then setJustLoadedFromServer will be set to false
		then useEffect will save cartItems to localStorage
	*/

	const [justLoadedFromServer, setJustLoadedFromServer] = useState(true);

	// Update cartItems state from localStorage on client-side mßount
	useEffect(() => {
		const savedCartItems = localStorage.getItem("cartItems");
		if (savedCartItems) {
			setCartItems(JSON.parse(savedCartItems));
		}
		setJustLoadedFromServer(false);
	}, []);

	// Save cartItems to localStorage when cartItems change
	useEffect(() => {
		if (!justLoadedFromServer)
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const router = useRouter();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true);
		const handleRouteChangeComplete = () => setLoading(false);
		const handleRouteChangeError = () => setLoading(false);

		router.events.on("routeChangeStart", handleRouteChangeStart);
		router.events.on("routeChangeComplete", handleRouteChangeComplete);
		router.events.on("routeChangeError", handleRouteChangeError);

		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart);
			router.events.off("routeChangeComplete", handleRouteChangeComplete);
			router.events.off("routeChangeError", handleRouteChangeError);
		};
	}, [router]);

	return (
		<div>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<CartDetailsContext.Provider value={{ cartItems, setCartItems }}>
				<NavBar />
				<div
					className={`h-1 animate-pulse bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 sticky top-0 ${
						loading ? "block" : "invisible"
					}`}
				></div>
				<Component {...pageProps} key={router.asPath} />
			</CartDetailsContext.Provider>
		</div>
	);
}
