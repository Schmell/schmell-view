export function svelog(item: any, title?: string) {
	console.log(`${title ? title : 'svelog'}: `, item)
	return ''
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function from(url: URL) {
	const from = url.searchParams.get('from')
	if (from) {
		return from
	}
	return ''
}

export function addOrdinalsuffix(i: number) {
	var j = i % 10,
		k = i % 100
	if (j == 1 && k != 11) {
		return i + 'st'
	}
	if (j == 2 && k != 12) {
		return i + 'nd'
	}
	if (j == 3 && k != 13) {
		return i + 'rd'
	}
	return i + 'th'
}

export function getHref(website: string | null) {
	if (!website) return null
	if (isUrl(website)) website
	return `http://${website}`
}

export const serializeNonPOJOs = (value: object | null) => {
	return structuredClone(value)
}

/** Dispatch event on click outside of node */
export function clickOutside(node) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node))
		}
	}
	document.addEventListener('click', handleClick, true)
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}

/**
 * Add some delay to your async functions
 *  @example
 * // Wait for 1 second
 * await delay(1000);
 * @param {number} duration delay time in milliseconds
 * @returns {Promise<void>} Promise<void>
 *
 */
export async function delay(duration: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), duration)
	})
}

export const themes = [
	'dark',
	'light',
	'cupcake',
	'bumblebee',
	'emerald',
	'coporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter'
]

// Regex
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/

/**
 * Loosely validate a URL `string`.
 *
 * @param {String} string
 * @return {Boolean} boolean
 */
export function isUrl(string: string | null | undefined): boolean {
	if (typeof string !== 'string') {
		return false
	}

	const match = string.match(protocolAndDomainRE)
	if (!match) {
		return false
	}

	const everythingAfterProtocol = match[1]
	if (!everythingAfterProtocol) {
		return false
	}

	if (
		localhostDomainRE.test(everythingAfterProtocol) ||
		nonLocalhostDomainRE.test(everythingAfterProtocol)
	) {
		return true
	}

	return false
}
