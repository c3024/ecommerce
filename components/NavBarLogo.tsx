import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/amazon-dark-logo-black-and-white-cropped.png";

const NavBarLogo = () => {
	return (
		<div className="p-1">
			<Link href="/">
				<Image src={logo} width={100} alt="" />
			</Link>
		</div>
	);
};

export default NavBarLogo;
