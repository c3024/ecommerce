import React from "react";
import OfferCardChild from "./OfferCardChild";
import Link from "next/link";

interface OfferCardProps {
	cardCategory: string;
	cardTitle: string;
	childCards: [string, { src: string }][]; // [description, image]
}

const OfferCard = function ({
	cardCategory,
	cardTitle,
	childCards,
}: OfferCardProps) {
	return (
		<div className="flex flex-col w-80 pb-5 bg-slate-200 items-start justify-center text-black ml-1 mr-1">
			<Link href={`/${cardCategory}`} className="mb-auto">
				<div className="m-2 text-lg cursor-pointer p-1">{cardTitle}</div>
			</Link>

			<div className="flex flex-wrap justify-around gap-x-5">
				{childCards.map((childCard) => {
					return (
						<div key={childCard[0]} className="mb-8">
							<Link href={`/${cardCategory}/categories/${childCard[0]}`}>
								<OfferCardChild
									image={childCard[1]}
									description={childCard[0]}
								/>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OfferCard;
