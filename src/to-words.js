import makeOrdinal from './make-ordinal';
import isFinite from './is-finite';
import isSafeNumber from './is-safe-number';

const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000; //         1.000.000.000 (9)
const ONE_TRILLION = 1000000000000; //     1.000.000.000.000 (12)
const ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
const MAX = 9007199254740992; // 9.007.199.254.740.992 (15)

const LESS_THAN_TWENTY = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED = [
	'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const generateWords = (number, words) => {
	let remainder;
	let word;

	// We’re done
	if (number === 0) {
		return words ? words.join(' ').replace(/,$/, '') : 'zero';
	}

	// First run
	if (!words) {
		words = [];
	}

	// If negative, prepend "minus"
	if (number < 0) {
		words.push('minus');
		number = Math.abs(number);
	}

	if (number < 20) {
		remainder = 0;
		word = LESS_THAN_TWENTY[number];
	} else if (number < ONE_HUNDRED) {
		remainder = number % TEN;
		word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
		// In case of remainder, we need to handle it here to be able to add the “-”
		if (remainder) {
			word += '-' + LESS_THAN_TWENTY[remainder];
			remainder = 0;
		}
	} else if (number < ONE_THOUSAND) {
		remainder = number % ONE_HUNDRED;
		word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';
	} else if (number < ONE_MILLION) {
		remainder = number % ONE_THOUSAND;
		word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';
	} else if (number < ONE_BILLION) {
		remainder = number % ONE_MILLION;
		word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';
	} else if (number < ONE_TRILLION) {
		remainder = number % ONE_BILLION;
		word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';
	} else if (number < ONE_QUADRILLION) {
		remainder = number % ONE_TRILLION;
		word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';
	} else if (number <= MAX) {
		remainder = number % ONE_QUADRILLION;
		word = generateWords(Math.floor(number / ONE_QUADRILLION)) +
            ' quadrillion,';
	}

	words.push(word);
	return generateWords(remainder, words);
};

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
export default (number, asOrdinal) => {
	const num = parseInt(number, 10);

	if (!isFinite(num)) {
		throw new TypeError(
			'Not a finite number: ' + number + ' (' + typeof number + ')'
		);
	}
	if (!isSafeNumber(num)) {
		throw new RangeError(
			'Input is not a safe number, it’s either too large or too small.'
		);
	}
	const words = generateWords(num);
	return asOrdinal ? makeOrdinal(words) : words;
};
