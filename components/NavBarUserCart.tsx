import React from "react";
import useAuth from "@/lib/useAuth";
import Link from "next/link";
import { useContext } from "react";
import { CartDetailsContext } from "@/pages/_app";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartItem } from "@/pages/_app";

const NavBarUserCart = () => {
	const { user, signInWithGoogle, signOut } = useAuth();
	const getFirstName = (displayName: string) => {
		if (!displayName) return "";
		return displayName.split(" ")[0];
	};
	const { cartItems } = useContext(CartDetailsContext);
	const getCartCount = (cartItems: CartItem[]) =>
		cartItems.reduce(
			(accumulator, current) => accumulator + Number(current.quantity),
			0
		);
	const cartQuantity = getCartCount(cartItems);
	return (
		<div
			className="flex items-center justify-end h-full"
			data-testid="navbar-user-cart"
		>
			{!user && (
				<div className="flex flex-col m-1 pl-1">
					<p className="mb-1">Hi, there</p>
					<button onClick={() => signInWithGoogle()} className="">
						Sign in
					</button>
				</div>
			)}
			{user && (
				<>
					<div className="flex flex-col m-1 pl-1">
						<p className="mb-1">
							Hi, {getFirstName(user.displayName ? user.displayName : "")}
						</p>
						<button onClick={() => signOut()}>Sign out</button>
					</div>
				</>
			)}
			<Link href={`/orders`}>
				<div className="text-center ml-1">
					Your <br /> Orders
				</div>
			</Link>
			<Link href="/cart">
				<div className="mr-1 mt-2 flex items-center h-full">
					<div
						className={`${
							cartQuantity < 10 ? "text-lg left-6" : "text-base left-7"
						}
							relative bottom-6 font-bold text-orange-400`}
					>
						{cartQuantity}
					</div>
					<ShoppingCartOutlinedIcon sx={{ fontSize: 40 }} />
				</div>
			</Link>
		</div>
	);
};

export default NavBarUserCart;
