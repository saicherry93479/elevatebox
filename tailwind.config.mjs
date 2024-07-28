/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {

			boxShadow: {
				'card': '0px 5px 0px 0px #191A23',
			},
			fontFamily: {
				SpaceGrotesk: ["EB Garamond", "sans-serif"],
			},
		},
	},
};
