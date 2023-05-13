import useAuth from "@/lib/useAuth";
import db from "@/lib/firebase";
import { getDocs } from "firebase/firestore";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { CartItem } from "@/pages/_app";
import Head from "next/head";

async function fetchOrders(userEmail: string) {
	const usersRef = db.collection("users");
	const query = usersRef.where("email", "==", userEmail);
	const querySnapshot = await getDocs(query);

	if (querySnapshot.docs.length !== 0) {
		const userId = querySnapshot.docs[0].id;
		const ordersRef = usersRef
			.doc(userId)
			.collection("orders")
			.orderBy("date", "desc");
		const ordersSnapshot = await getDocs(ordersRef);
		const ordersData = ordersSnapshot.docs.map((doc) => {
			return doc.data();
		});
		return ordersData;
	} else {
		return [];
	}
}

function Orders() {
	const { user } = useAuth();
	const { data: orders } = useSWR(user ? user.email : null, fetchOrders);

	return (
		<>
			<Head>
				<title>Your orders</title>
			</Head>
			<div>
				<h1 className="text-4xl m-4">Your previous orders</h1>
				{user ? (
					orders?.map((order) => (
						<div key={order.id} className="m-2 p-2 bg-slate-200">
							<div className="text-right">{`Order ID: ${order.id}`}</div>
							{order.cartItems.map((cartItem: CartItem) => (
								<div key={cartItem.Id} className="flex justify-between m-1">
									<Link href={`/${cartItem.CollectionName}/${cartItem.Id}`}>
										<div>{cartItem.Title}</div>
									</Link>
									<div className="ml-auto w-48 flex justify-between flex-end">
										<div>{cartItem.quantity}</div>
										<div>{cartItem.ListPrice}</div>
									</div>
								</div>
							))}
							<div className="text-right">{`Total: $${order.cartTotal}`}</div>
							<div className="text-right">{`Placed on ${order.date
								?.toDate()
								.toLocaleString()} for address: 	${order.name}, ${
								order.houseNo
							}, ${order.addressLineOne}, ${order.addressLineTwo}`}</div>
						</div>
					))
				) : (
					<div className="flex items-center justify-center">
						You need to sign in see your previous orders
					</div>
				)}
			</div>
		</>
	);
}

export default Orders;
