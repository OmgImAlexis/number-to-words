import test from 'ava';
import MAX_SAFE_INTEGER from '../src/max-safe-integer';
import toOrdinal from '../src/to-ordinal';

test('toOrdinal', t => {
	const tests = [
		{input: -121, expect: '-121st'},
		{input: -13, expect: '-13th'},
		{input: -12, expect: '-12th'},
		{input: -11, expect: '-11th'},
		{input: -3, expect: '-3rd'},
		{input: -2, expect: '-2nd'},
		{input: -1, expect: '-1st'},
		{input: 0, expect: '0th'},
		{input: 1, expect: '1st'},
		{input: 1.9, expect: '1st'},
		{input: 2, expect: '2nd'},
		{input: 3, expect: '3rd'},
		{input: 4, expect: '4th'},
		{input: 5, expect: '5th'},
		{input: 6, expect: '6th'},
		{input: 7, expect: '7th'},
		{input: 8, expect: '8th'},
		{input: 9, expect: '9th'},
		{input: 10, expect: '10th'},
		{input: 11, expect: '11th'},
		{input: 12, expect: '12th'},
		{input: 13, expect: '13th'},
		{input: 121, expect: '121st'}
	];

	tests.forEach(({input, expect}) => {
		t.is(toOrdinal(input), expect);
	});
});

test('should throw a RangeError if input is greater or lesser than MAX_SAFE_INTEGER', t => {
	const unsafe = MAX_SAFE_INTEGER + 100;

	t.throws(() => {
		toOrdinal(unsafe);
	}, /Input is not a safe number/);
	t.throws(() => {
		toOrdinal(-unsafe);
	}, /Input is not a safe number/);
});
