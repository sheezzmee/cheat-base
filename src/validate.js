const _window = window;
const _unsafeWindow = unsafeWindow;

import { cheatBase } from './cheatBase.js';
import { getRandomArbitrary } from './utils.js';

import './crypto.js';
import CryptoJS from 'crypto-js';
import RSA_PRIVATE_KEY_CLIENT from './RSA_PRIVATE_KEY_CLIENT.js';
import RSA_PUBLIC_KEY_SERVER from './RSA_PUBLIC_KEY_SERVER.js';
import AES_DECRYPT_KEY from './AES_DECRYPT_KEY.js';
import AES_ENCRYPT_KEY from './AES_ENCRYPT_KEY.js';

const decryptString = string =>
	CryptoJS.AES.decrypt(string, AES_DECRYPT_KEY).toString(CryptoJS.enc.Utf8);

const JSEncrypt =
	_window[
		/*JSEncrypt*/ decryptString('U2FsdGVkX1/hCddjEgRjFHGcJMOI1QaQEcJ4bLStk2s=')
	];
delete _window[
	/*JSEncrypt*/ decryptString('U2FsdGVkX1/hCddjEgRjFHGcJMOI1QaQEcJ4bLStk2s=')
];

const rsaDecrypt = new JSEncrypt();
rsaDecrypt.setPrivateKey(RSA_PRIVATE_KEY_CLIENT);

const rsaEncrypt = new JSEncrypt();
rsaEncrypt.setPublicKey(RSA_PUBLIC_KEY_SERVER);

window.xmlhttpRequest = GM_xmlhttpRequest;

const xmlhttpRequest =
	_window[decryptString('U2FsdGVkX18CYbgkG5AxJb3Xzd63v2pAYgjKspqJBhU=')];

const breakScript = () => {
	cheatBase.dispatch(
		new _unsafeWindow /*SetFatalError*/[
			decryptString('U2FsdGVkX1+yXolDyiNFPHvcwG1xbugriUxbbUDW6eM=')
		](
			new _unsafeWindow[
				/*ControlChannelDisconnectException*/ decryptString(
					'U2FsdGVkX1/oEoIrfplh14npvDB6aDg4yeAEM4Y+Gl/T5+j3nRJq9y4Le86SmPyjMPDFJbQfAc4skMabuBfVeQ=='
				)
			]()
		)
	);
	for (const key in cheatBase) {
		try {
			delete cheatBase[key];
		} catch {}
	}
	for (const key in _unsafeWindow) {
		try {
			if (_unsafeWindow[key]?.$metadata$) {
				delete _unsafeWindow[key];
			}
		} catch {}
	}
};

const encrypt = message => {
	const encryptMessage = rsaEncrypt.encrypt(message);
	return CryptoJS.AES.encrypt(encryptMessage, AES_ENCRYPT_KEY).toString();
};

const split = decryptedMessage => {
	const result = ['', ''];
	for (let i = 0; i < decryptedMessage.length; i++) {
		if (decryptedMessage[i] !== '|') {
			result[0] += decryptedMessage[i];
		} else {
			for (let j = i + 1; j < decryptedMessage.length; j++) {
				result[1] += decryptedMessage[j];
			}
			break;
		}
	}
	return result;
};

const decrypt = message => {
	const decryptedMessage = split(decryptString(message));

	const verifier = new JSEncrypt();
	verifier.setPublicKey(RSA_PUBLIC_KEY_SERVER);

	if (
		!verifier.verify(decryptedMessage[0], decryptedMessage[1], CryptoJS.SHA256)
	)
		return;

	return rsaDecrypt.decrypt(decryptedMessage[0]);
};

const stringify = obj => {
	let result = '{';
	let isFirst = true;

	for (let key in obj) {
		let value = obj[key];

		result += (isFirst ? '' : ',') + '"' + key + '":"' + value + '"';
		isFirst = false;
	}

	result += '}';
	return result;
};

const toString = decryptString('U2FsdGVkX1/64nOobeakrRl8dnCG4jzTZgkNfskxW74=');
const toLocaleString = decryptString(
	'U2FsdGVkX1/PZuUtpbxlqvCeLyBU41D0peB1Jg6L4GE='
);
const includes = decryptString('U2FsdGVkX1/lbQ2hI3H1za4TBBLoEz466qoDIOWdbD4=');
const location = decryptString('U2FsdGVkX18WJfb7kBnP1+SzvHtXtlx6nps2SHpdIMA=');
const host = decryptString('U2FsdGVkX19/bRD7wOD8j4AxeBzFX144p2CNijC3EUo=');
const setInterval =
	_window[decryptString('U2FsdGVkX1+8/2/KlLLG0/pQhp+RTASD0fXnUEAwzP4=')];
const clearInterval =
	_window[decryptString('U2FsdGVkX1+MZfBslKqgNZKYN+XxMdd+3VH6w/R92c8=')];
const setTimeout =
	_window[decryptString('U2FsdGVkX1/U6ShXJS9/6VZB1mEsKxc8Ls0giqluphc=')];
const clearTimeout =
	_window[decryptString('U2FsdGVkX19Qs2CAJYd36AeT6/S2+/YG5UJgHfkqF/A=')];
const now =
	_window[decryptString('U2FsdGVkX1+etOWfVElPT1OpYTcpFhtTRX2j7wGhgQQ=')][
		decryptString('U2FsdGVkX1+fg9kllavfzVUvDEbMcE4P1pDI9mQpVTg=')
	];

const sendMessage = (json, callback) => {
	if (!xmlhttpRequest) return breakScript();

	if (
		!xmlhttpRequest[toString][toLocaleString]()[includes](
			'__sentry_original__'
		) &&
		!xmlhttpRequest[toString][toLocaleString]()[includes]('[native code]')
	)
		return breakScript();

	if (
		!xmlhttpRequest[toLocaleString]()[includes](
			'e=>{const o=Zt(e);let s=!1,a=()=>{s=!0};'
		)
	)
		return breakScript();

	json.version = cheatBase.version;
	json.location = _window[location][host];

	xmlhttpRequest({
		method: 'POST',
		url: 'https://shizoval-site.vercel.app/getInfo',
		data: encrypt(stringify(json)),
		headers: {
			'Content-Type': 'application/json'
		},
		onload: response => {
			callback(response.responseText);
		},
		onabort: breakScript,
		onerror: breakScript,
		ontimeout: breakScript
	});
};

let interval;
const validate = (id, uid) => {
	let timeout = setTimeout(breakScript, getRandomArbitrary(55000, 65000));
	sendMessage(
		{
			id: id,
			uid: uid
		},
		response => {
			clearTimeout(timeout);

			const decodeResponse = decrypt(response);
			if (
				!decodeResponse ||
				!+decodeResponse ||
				+decodeResponse < now() - getRandomArbitrary(240000, 300000)
			) {
				clearInterval(interval);
				breakScript();
			}
		}
	);
};

let timeout;
export default (id, uid) => {
	if (id === '228') {
		timeout = setTimeout(breakScript, getRandomArbitrary(200000, 300000));
	} else {
		clearTimeout(timeout);
		validate(id, uid);
		interval = setInterval(
			() => validate(id, uid),
			getRandomArbitrary(55000, 65000)
		);
	}
};
