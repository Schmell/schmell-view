/** @type {import('tailwindcss').Config}*/

const config = {
	content: ['./src/**/*.{html,js,ts,svelte}'],

	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],

	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'valentine', 'halloween', 'bumblebee']
		// themes: themes
	}
};

module.exports = config;
