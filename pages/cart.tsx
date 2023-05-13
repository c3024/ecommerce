import React, { useContext } from "react";
import { CartDetailsContext } from "@/pages/_app";
import placeholderImage from "@/images/productImagePlaceHolder.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartItem } from "@/pages/_app";
import Head from "next/head";
import { ImBin } from "react-icons/im";

function Cart() {
	return <CartPage />;
}

export const getCartTotal = (cartItems: CartItem[]) =>
	cartItems
		.reduce(
			(accumulator, current) =>
				accumulator +
				Number(current.quantity) * Number(current["ListPrice"].slice(1)),
			0
		)
		.toFixed(2);

const CartPage = () => {
	const { cartItems, setCartItems } = useContext(CartDetailsContext);
	const handleQuantityChange = (productId: string, newQuantity: number) => {
		if (newQuantity < 1)
			return setCartItems((prevCartItems) =>
				prevCartItems.filter((item) => item.Id !== productId)
			);
		setCartItems((prevCartItems) =>
			prevCartItems.map((cartItem) => {
				if (cartItem.Id == productId) {
					return { ...cartItem, quantity: newQuantity };
				} else {
					return cartItem;
				}
			})
		);
	};
	const handleIncreaseQuantity = (productId: string) => {
		const product = cartItems.find((item) => item.Id === productId);
		if (!product) return;
		handleQuantityChange(productId, product.quantity + 1);
	};

	const handleDecreaseQuantity = (productId: string) => {
		const product = cartItems.find((item) => item.Id === productId);
		if (!product) return;
		if (product.quantity > 1) {
			handleQuantityChange(productId, product.quantity - 1);
		}
	};
	const router = useRouter();
	const cartTotal = Number(getCartTotal(cartItems));
	const handleCheckOutClick = () => {
		router.push(`/checkout`);
	};
	return (
		<>
			<Head>
				<title>Shopping Cart</title>
			</Head>
			<div className="flex flex-col mr-2 ml-2">
				<h1 className="text-4xl mb-12 mt-12 ml-2">Shopping Cart</h1>
				{cartItems.map((cartItem) => {
					if (cartItem.quantity > 0) {
						return (
							<div
								key={cartItem.Id}
								className="flex items-center mr-2 ml-2 mb-4"
							>
								<Image
									src={placeholderImage}
									className="hidden sm:block h-auto w-24 object-cover mr-2 rounded"
									alt=""
								/>
								<Link href={`${cartItem.CollectionName}/${cartItem.Id}`}>
									<div className="mr-4">{cartItem.Title} </div>
								</Link>

								<div className="flex ml-auto min-w-max justify-between h-8 items-center">
									<button
										onClick={() => handleQuantityChange(cartItem.Id, 0)}
										className="p-1 rounded mr-3 bg-gradient-to-b from-yellow-200 to-amber-400 hidden sm:block"
									>
										Remove
									</button>
									<button
										className="block sm:hidden mr-3"
										onClick={() => handleQuantityChange(cartItem.Id, 0)}
									>
										<ImBin />
									</button>
									<div className="flex">
										<button
											onClick={() => handleDecreaseQuantity(cartItem.Id)}
											className="p-1 rounded"
										>
											-
										</button>
										<input
											type="number"
											min={0}
											max={10}
											value={cartItem.quantity}
											readOnly
											onChange={(e) =>
												handleQuantityChange(
													cartItem.Id,
													e.target.valueAsNumber
												)
											}
											className="text-center w-10"
										/>
										<button
											onClick={() => handleIncreaseQuantity(cartItem.Id)}
											className="p-1 rounded"
										>
											+
										</button>
									</div>
									<div className="w-20 text-right">{cartItem.ListPrice}</div>
								</div>
							</div>
						);
					}
				})}
				{cartTotal > 0 ? (
					<div className="flex mr-2 mt-8 justify-end text-xl">
						<h2>Total</h2>
						<h3 className="ml-12">${cartTotal}</h3>
					</div>
				) : (
					<p className="text-center">No items in cart</p>
				)}
				<div className="flex justify-end mt-4">
					{cartTotal > 0 ? (
						<button
							className="p-1 rounded mt-12 font-bold text-black w-72 border-2 bg-gradient-to-b from-yellow-200 to-amber-400"
							onClick={handleCheckOutClick}
						>
							Checkout
						</button>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
