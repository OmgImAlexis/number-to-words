import test from 'ava';
import MAX_SAFE_INTEGER from '../src/max-safe-integer';
import isSafeNumber from '../src/is-safe-number';

test('should return true if input is a number between -MAX_SAFE_INTEGER and MAX_SAFE_INTEGER (including)', t => {
	t.true(isSafeNumber(-MAX_SAFE_INTEGER));
	t.true(isSafeNumber(-1));
	t.true(isSafeNumber(0));
	t.true(isSafeNumber(1));
	t.true(isSafeNumber(MAX_SAFE_INTEGER));
});

test('should return false if input is too large or too small', t => {
	const unsafe = MAX_SAFE_INTEGER + 100;

	t.false(isSafeNumber(unsafe));
	t.false(isSafeNumber(-unsafe));
});

test('should return false if input is not a number', t => {
	t.false(isSafeNumber());
	t.false(isSafeNumber(null));
	t.false(isSafeNumber([]));
	t.false(isSafeNumber({}));
	t.false(isSafeNumber(''));
	t.false(isSafeNumber('x'));
	t.false(isSafeNumber(() => {}));
	t.false(isSafeNumber(NaN));
});
