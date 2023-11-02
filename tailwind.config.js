import sailCloth from '$lib/assets/Kevlyar-Mylar-300x219.jpg'
/** @type {import('tailwindcss').Config}*/

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],

	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'valentine', 'halloween', 'bumblebee']
		// themes: themes
	}
}

module.exports = config
