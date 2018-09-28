import isFinite from './is-finite';
import isSafeNumber from './is-safe-number';

/**
 * Converts an integer into a string with an ordinal postfix.
 * If number is decimal, the decimals will be removed.
 * @example toOrdinal(12) => '12th'
 * @param {number|string} number
 * @returns {string}
 */
export default number => {
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
	const str = String(num);
	const lastTwoDigits = Math.abs(num % 100);
	const betweenElevenAndThirteen = lastTwoDigits >= 11 && lastTwoDigits <= 13;
	const lastChar = str.charAt(str.length - 1);
	return str + (betweenElevenAndThirteen ? 'th' :
		lastChar === '1' ? 'st' :
			lastChar === '2' ? 'nd' :
				lastChar === '3' ? 'rd' :
					'th');
};
