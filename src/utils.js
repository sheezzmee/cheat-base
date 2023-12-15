import fuzzySort from 'fuzzysort';
import { cheatBase } from './cheatBase.js';
import { keyPressed } from './keyPressing.js';

/**
 * author: sabaka-babaka
 */
export const toLong = numberStr => {
	const number = BigInt(numberStr),
		low = Number(BigInt.asIntN(32, number)),
		high = Number(BigInt.asIntN(32, number >> 32n));
	return new Long(low, high);
};

export const getSimpleName = object =>
	object?.constructor?.$metadata$?.simpleName;

export const getNamedClasses = object => {
	const result = {};

	for (const [key, value] of Object.entries(object)) {
		const simpleName = getSimpleName(value);

		if (simpleName && result[simpleName]) {
			for (let index = 0; ; index++) {
				if (result[`${simpleName}:${index}`]) continue;

				result[`${simpleName}:${index}`] = value;
				break;
			}
		} else if (simpleName) result[`${simpleName}`] = value;
	}

	return result;
};

export const getRandomArbitrary = (min, max) =>
	Math.floor(Math.random() * (max - min) + min);

const getPropertyByIndex = (object, index) =>
	object ? Object.entries(object)[index] : undefined;

const getPropertyByName = (object, simpleName, returnName = false) => {
	if (!object) return;

	const named = getNamedClasses(object);

	if (!named) return;

	const results = fuzzySort.go(simpleName, Object.keys(named));

	if (!results || !results[0]?.target) return;

	let name = '';
	for (const [key, obj] of Object.entries(object)) {
		if (obj === named[results[0].target]) {
			name = key;
			break;
		}
	}

	return returnName
		? [name, named[results[0].target]]
		: named[results[0].target];
};

export const find = (object, selector) => {
	if (!object || !selector) return;

	let result = object;
	selector.split('.').forEach(property => {
		if (!result) return;

		if (typeof result[1] === 'object' ? result[1][property] : result[property])
			result = [
				property,
				typeof result[1] === 'object' ? result[1][property] : result[property]
			];
		else if (property.slice(0, 2) === 'i:')
			result = getPropertyByIndex(
				typeof result[1] === 'object' ? result[1] : result,
				property.slice(2, property.length)
			);
		else
			result = getPropertyByName(
				typeof result[1] === 'object' ? result[1] : result,
				property,
				true
			);
	});

	return result;
};

export const prototypeHook = (
	constructor,
	selector,
	callBack,
	after = false,
	args = false
) => {
	if (!constructor) return;

	const prototype = constructor.prototype,
		functionName =
			(prototype[selector] && selector) || find(prototype, selector)?.[0];

	if (!functionName) return;

	!prototype[`${functionName}_copy`] &&
		(prototype[`${functionName}_copy`] = prototype[functionName]);

	prototype[functionName] = function () {
		if (after) {
			const result = prototype[`${functionName}_copy`].apply(this, arguments);
			[].push.call(arguments, prototype[`${functionName}_copy`]);
			[].push.call(arguments, result);
			const callBackResult = args
				? callBack.call(this, arguments)
				: callBack.apply(this, arguments);

			if (callBackResult) return callBackResult;

			return result;
		}

		[].push.call(arguments, prototype[`${functionName}_copy`]);
		const callBackResult = args
			? callBack.call(this, arguments)
			: callBack.apply(this, arguments);

		if (callBackResult) return callBackResult;

		return prototype[`${functionName}_copy`].apply(this, arguments);
	};
};

export const proxyHook = (object, selector, callBack) => {
	const functionName =
		(object[selector] && selector) || find(object, selector)?.[0];

	if (!functionName) return;

	!object[`${functionName}_copy`] &&
		(object[`${functionName}_copy`] = object[functionName]);

	object[functionName] = new Proxy(
		{},
		{
			get: (target, prop, receiver) =>
				function () {
					const callBackResult = callBack(prop, arguments);

					if (callBackResult) return callBackResult;

					return object[`${functionName}_copy`][prop].apply(null, arguments);
				}
		}
	);
};

export const isKeyPressed = key =>
	!cheatBase.features.battleChat.isInputActive() &&
	keyPressed.isKeyPressed(key);

export const pressKey = code => {
	const key = { code: code };
	document.dispatchEvent(new KeyboardEvent('keydown', key));
	document.dispatchEvent(new KeyboardEvent('keyup', key));
	dispatchEvent(new KeyboardEvent('keydown', key));
	dispatchEvent(new KeyboardEvent('keyup', key));
};
