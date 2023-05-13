import React from "react";
import OfferCard from "@/components/OfferCard";
import homeToolsSmall from "@/images/home-tools-small.jpeg";
import petSuppliesSmall from "@/images/pet-supplies-small.jpeg";
import plumbingFixturesSmall from "@/images/plumbing-fixtures-small.jpeg";
import sportingGoodsSmall from "@/images/sporting-goods-small.jpeg";
import autoPartsSmall from "@/images/autoPartsSmall.jpg";
import autoAccessories from "@/images/autoAccessories.jpg";
import powerVehicleSportsParts from "@/images/powerVehicleSportsParts.jpg";
import outdoorLiving from "@/images/outdoorLiving.jpg";
import wirelessAccessories from "@/images/wirelessAccessories.jpg";
import digitalVideoRecorders from "@/images/digitalVideoRecorders.jpg";
import receiversAndAmplifiers from "@/images/receiversAndAmplifiers.jpg";
import personalComputers from "@/images/personalComputers.jpg";

function OfferCardLayout() {
	return (
		<div className="flex flex-wrap justify-evenly gap-4 m-8">
			<OfferCard
				cardCategory="Home"
				cardTitle="Home & more | Up to 60% off"
				childCards={[
					["Home tools", homeToolsSmall],
					["Sporting goods", sportingGoodsSmall],
					["Pet supplies", petSuppliesSmall],
					["Plumbing fixtures", plumbingFixturesSmall],
				]}
			/>
			<OfferCard
				cardCategory="Automotive products"
				cardTitle="Automotive essentials | Up to 60% off"
				childCards={[
					["Auto parts", autoPartsSmall],
					["Auto accessories", autoAccessories],
					["Powersports vehicle parts", powerVehicleSportsParts],
					["Outdoor living", outdoorLiving],
				]}
			/>
			<OfferCard
				cardCategory="Electronics"
				cardTitle="Up to 60% off | Electronics"
				childCards={[
					["Wireless accessories", wirelessAccessories],
					["Digital video recorders", digitalVideoRecorders],
					["Receivers and amplifiers", receiversAndAmplifiers],
					["Personal computers", personalComputers],
				]}
			/>
		</div>
	);
}

export default OfferCardLayout;
