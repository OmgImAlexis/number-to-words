// Simplified https://gist.github.com/marlun78/885eb0021e980c6ce0fb
export default value => {
	return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
};
