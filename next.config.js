/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "development" ? "" : "/Schriftsteller"
const nextConfig = {
	output: 'export',
	distDir: 'dist',
	basePath,
	env: {
		basePath
	},
	images: {
		unoptimized: true,
	}
}

module.exports = nextConfig
