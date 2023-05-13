/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"m.media-amazon.com",
			"images-eu.ssl-images-amazon.com",
			"images.pexels.com",
			"images.unsplash.com",
		],
	},
};

module.exports = nextConfig;
