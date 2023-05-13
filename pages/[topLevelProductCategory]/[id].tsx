import React, { useContext } from "react";
import { useRouter } from "next/router";
import placeHolderImage from "@/images/productImagePlaceHolder.jpg";
import { CartDetailsContext } from "@/pages/_app";
import { doc, getDoc } from "firebase/firestore";
import db from "@/lib/firebase";
import { productCategoriesMap } from "@/pages/_app";
import { GetServerSidePropsContext } from "next";
import { ProductInterface } from "@/lib/types";
import Head from "next/head";
import Image from "next/image";

interface ProductDetailsInterface extends ProductInterface {
	Brand: string;
	Feature: string;
}

interface ProductPageProps {
	productDetails: ProductDetailsInterface;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { topLevelProductCategory, id: Id } = context.params as {
		topLevelProductCategory: string;
		id: string;
	};
	const docRef = doc(db, productCategoriesMap[topLevelProductCategory], Id);
	const docSnap = await getDoc(docRef);
	const productDetails = docSnap.data();
	return { props: { productDetails } };
}

const ProductPage = function ({ productDetails }: ProductPageProps) {
	const { cartItems, setCartItems } = useContext(CartDetailsContext);
	const router = useRouter();
	const { id } = router.query;
	let productId = id as string;

	const addNewItemToCart = (productDetails: ProductInterface) => {
		const productAdded = {
			Id: productDetails.Id,
			Title: productDetails.Title,
			ListPrice: productDetails.ListPrice,
			Image: productDetails.Image,
			quantity: 1,
			MRP: productDetails.MRP,
			CollectionName: productDetails.CollectionName,
		};
		setCartItems((prevCartItems) => [...prevCartItems, productAdded]);
	};
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
		if (product.quantity > 0) {
			handleQuantityChange(productId, product.quantity - 1);
		}
	};
	const product = cartItems.find((cartItem) => cartItem.Id == id);
	if (!productDetails) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex">
			<Head>
				<title>{productDetails.Title}</title>
			</Head>
			<div className="flex flex-col md:flex-row gap-y-2 p-2 items-start ml-auto mr-auto md:ml-0 md:mr-auto">
				<Image
					className="w-96 h-96 object-cover self-center md:self-start"
					width={576}
					height={576}
					src={placeHolderImage.src}
					alt="No image"
				/>
				<div className=" text-black gap-x-1 h-auto grow p-2">
					<h1 className="text-2xl font-bold">{productDetails.Title}</h1>
					<p className="mb-2">{productDetails.Brand}</p>
					<h2 className="text-xl font-bold">{productDetails.ListPrice}</h2>
					<h3 className="mb-2">
						<s>{productDetails.MRP}</s>
					</h3>
					<h4 className="mb-2">{productDetails.Feature}</h4>
					{product && product.quantity > 0 ? (
						<div>
							<button
								onClick={() => handleDecreaseQuantity(productId)}
								className="p-2"
							>
								-
							</button>
							<input
								type="number"
								min={0}
								max={10}
								value={product.quantity}
								readOnly
								onChange={(e) =>
									handleQuantityChange(productId, e.target.valueAsNumber)
								}
								className="h-full p-1 text-center bg-white border-black border-2 rounded w-10"
							/>
							<button
								onClick={() => handleIncreaseQuantity(productId)}
								className="p-2"
							>
								+
							</button>
						</div>
					) : (
						<button
							className="p-2 mt-auto rounded border-2 bg-gradient-to-b from-yellow-200 to-amber-400"
							onClick={() => addNewItemToCart(productDetails)}
						>
							Add to Cart
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
