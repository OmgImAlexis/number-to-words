import makeOrdinal from './make-ordinal';
import toWords from './to-words';

/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 * @param {number|string} number
 * @returns {string}
 */
export default number => {
	const words = toWords(number);
	return makeOrdinal(words);
};
