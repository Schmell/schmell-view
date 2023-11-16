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
	return website && website.startsWith('http://') ? website : `http://${website}`
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

var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/

var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/

/**
 * Loosely validate a URL `string`.
 *
 * @param {String} string
 * @return {Boolean}
 */

export function isUrl(string) {
	if (typeof string !== 'string') {
		return false
	}

	var match = string.match(protocolAndDomainRE)
	if (!match) {
		return false
	}

	var everythingAfterProtocol = match[1]
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
