import MAX_SAFE_INTEGER from './max-safe-integer';

export default value => {
	return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
};
