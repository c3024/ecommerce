import React, { useState, useEffect, useContext } from "react";
import useAuth from "@/lib/useAuth";
import { CartDetailsContext } from "@/pages/_app";
import db from "@/lib/firebase";
import { getCartTotal } from "./cart";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";

function Checkout() {
	const { cartItems, setCartItems } = useContext(CartDetailsContext);
	const { user } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [houseNo, setHouseNo] = useState("");
	const [addressLineOne, setAddressLineOne] = useState("");
	const [addressLineTwo, setAddressLineTwo] = useState("");
	const [isOrderPlaced, setIsOrderPlaced] = useState(false);
	const [isOrderFailed, setIsOrderFailed] = useState(false);
	const cartTotal = getCartTotal(cartItems);
	useEffect(() => {
		if (user) {
			setName(user.displayName ?? "");
			setEmail(user.email ?? "");
		} else {
			setName("");
			setEmail("");
		}
	}, [user]);
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handleHouseNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHouseNo(e.target.value);
	};
	const handleAddressLineOneChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setAddressLineOne(e.target.value);
	};
	const handleAddressLineTwoChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setAddressLineTwo(e.target.value);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			name,
			email,
			houseNo,
			addressLineOne,
			addressLineTwo,
			cartTotal,
			cartItems,
		};
		try {
			const usersRef = db.collection("users");
			const query = usersRef.where("email", "==", email);
			let userId;
			query.get().then(async (querySnapshot) => {
				if (querySnapshot.empty) {
					const docRef = await usersRef.add({
						name: name,
						email: email,
					});
					userId = docRef.id;
				} else {
					userId = querySnapshot.docs[0].id;
				}
				const ordersRef = usersRef.doc(userId).collection("orders");
				ordersRef
					.add({
						...data,
						id: uuidv4(),
						date: new Date(),
					})
					.then((docRef) => {
						console.log("Order placed with ID: ", docRef.id);
					})
					.catch((error) => {
						console.error("Error adding document: ", error);
					});
			});
			setIsOrderPlaced(true);
			setIsOrderFailed(false);
			setCartItems([]);
		} catch (error) {
			console.error("Error placing order: ", error);
			setIsOrderFailed(true);
		}
	};
	return (
		<>
			<Head>
				<title>Checkout</title>
			</Head>
			<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
				{!isOrderPlaced ? (
					<div className="w-full max-w-md">
						<form
							className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
							onSubmit={handleFormSubmit}
						>
							<div className="text-gray-800 text-2xl font-semibold mb-6 text-center">
								Checkout
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="name"
								>
									Full Name
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="name"
									type="text"
									placeholder="Full Name"
									value={name}
									onChange={handleNameChange}
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Email"
									value={email}
									onChange={handleEmailChange}
									required
								/>
							</div>
							<fieldset className="border rounded p-4 mb-4">
								<legend className="font-medium mb-2">Address</legend>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="houseNo"
									>
										House No
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="houseNo"
										type="text"
										placeholder="H/No"
										value={houseNo}
										onChange={handleHouseNoChange}
										required
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="addressLineOne"
									>
										Address Line 1
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="addressLine1"
										type="text"
										placeholder="Address Line"
										value={addressLineOne}
										onChange={handleAddressLineOneChange}
										required
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="addressLineTwo"
									>
										Address Line 2
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="addressLine2"
										type="text"
										placeholder="Address Line"
										value={addressLineTwo}
										onChange={handleAddressLineTwoChange}
										required
									/>
								</div>
							</fieldset>
							<div className="flex items-center justify-around">
								<button
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Pay ${cartTotal}
								</button>
							</div>
						</form>
					</div>
				) : (
					<h1>Order placed!</h1>
				)}
				{isOrderFailed ? (
					<h1 className="text-red-700 text-xl">Order failed</h1>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

export default Checkout;
