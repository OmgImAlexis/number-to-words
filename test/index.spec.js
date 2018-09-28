import test from 'ava';
import index from '../src';
import toOrdinal from '../src/to-ordinal';
import toWords from '../src/to-words';
import toWordsOrdinal from '../src/to-words-ordinal';

test('should expose a toOrdinal method', t => {
    t.is(index.toOrdinal, toOrdinal);
});

test('should expose a toWords method', t => {
	t.is(index.toWords, toWords);
});

test('should expose a toWordsOrdinal method', t => {
    t.is(index.toWordsOrdinal, toWordsOrdinal);
});
