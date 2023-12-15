const getMainScript = () => {
	const scripts = document.getElementsByTagName('script');
	return scripts.item(scripts.length - 1);
};

unsafeWindow.shouldSendCommand = true;
const modifySendCommandFunction = script => {
	let sendCommandFuncTextRe =
		/function\(\w+\)\{if\(this\.\w+\.\w+\(\)\)return \w+\(\);if\(this\.\w+\.equals\(\w+\(\)\)\)\{var \w+=\w+\(\)\.\w+\(\w+\(\)\);!function\(\w+,\w+,\w+\)\{var \w+\=null\!\=\w+&&\w+\(\w+,\w+\),\w+=\w+\(\)\.\w+\(\w+\(\)\);\w+\.\w+\.\w+\(\w+,\w+\),\w+\.\w+\(\);var \w+=\w+\(\)\.\w+\(\w+\(\)\);\w+\(\w+\)\.\w+\(\w+,\w+\),\w+\(\)\.\w+\(\w+\),\(\w+\?\w+\(\)\.\w+\:\w+\.\w+\)\.\w+\(\w+,\w+\),\w+\(\)\.\w+\(\w+\)\}\(this,\w+,\w+\),\w+\.\w+\(\);var \w+\=new DataView\(\w+\.\w+\.buffer,0,\w+\.\w+\);this\.\w+\.send\(\w+\),\w+\(\)\.\w+\(\w+\)\}\}/;
	let sendCommandFuncPartsRe =
		/function\((?<argName>\w+)\){(?<returnIfClosed>if.+?return \w+\(\));if\((?<isConnected>.+?equals\(\w+\(\)\))\)\{(?<declareOutputBufferVar>.+?)=(?<getBufferFromPool>.+?);!(?<writeCommand>function.+?\(this,\w+,\w+\)),(?<flipOutputBuffer>.+?);(?<sendDataView>var.+?send\(\w+\))/;
	let sendCommandFuncText = script.match(sendCommandFuncTextRe)[0];
	let parts = sendCommandFuncText.match(sendCommandFuncPartsRe).groups;

	let modifiedSendCommand = `
	function(${parts.argName}) {
		${parts.returnIfClosed};
		if (${parts.isConnected}) {
			${parts.declareOutputBufferVar} = this.getOutputBuffer();
			let res = ${parts.writeCommand};
			if (window.shouldSendCommand) {
				${parts.flipOutputBuffer};
				${parts.sendDataView};
				this.clearOutputBuffer();
			}
		}
	}
	`;
	return script.replace(sendCommandFuncTextRe, modifiedSendCommand);
};

unsafeWindow.setMetadata = (constructor, name) => {
	if (!name || !constructor) return;

	if (name === 'WebSocketConnection') {
		const byteBufferWrapperClearFunc = Object.entries(
			unsafeWindow.ByteBufferWrapper.prototype
		).find(e => e[1].toString().match(/function\(\){this\.\w+=0/));

		constructor.prototype.getOutputBuffer = function () {
			if (!this.outputBuffer)
				this.outputBuffer = unsafeWindow.allocateByteBuffer(1280000);

			return this.outputBuffer;
		};

		constructor.prototype.clearOutputBuffer = function () {
			if (!this.outputBuffer) return;

			byteBufferWrapperClearFunc[1].call(this.outputBuffer);
		};
	}

	if (name === 'StartScreenComponentStyle') cheatBase.init();

	Object.defineProperties(constructor.prototype, {
		simpleName: {
			get: () => name
		},
		namedClasses: {
			get: function () {
				if (!this || !cheatBase) return;
				return cheatBase.utils.getNamedClasses(this);
			}
		},
		entries: {
			get: function () {
				if (!this) return;
				return Object.entries(this);
			}
		},
		string: {
			get: function () {
				if (!this || !this.toString) return;
				return this.toString();
			}
		}
	});

	if (!unsafeWindow[name]) {
		unsafeWindow[name] = constructor;
		return;
	}

	if (unsafeWindow[name] && unsafeWindow[name] === constructor) return;

	if (unsafeWindow[name] && unsafeWindow[name] !== constructor) {
		for (let i = 0; ; i++) {
			const nameWithIndex = `${name}_${i}`;
			if (
				unsafeWindow[nameWithIndex] &&
				unsafeWindow[nameWithIndex] === constructor
			)
				return;

			if (!unsafeWindow[nameWithIndex]) {
				unsafeWindow[nameWithIndex] = constructor;
				return;
			}
		}
	}
};

/**
 * author: sabaka-babaka
 */
const modifyScript = script => {
	script = script.replace(
		/(?<begin>function \w+\(\w,\w,\w,\w,\w,\w,\w,\w\)\{)(?<end>null!=\w&&\(\w\.prototype=Object\.create\(\w\.prototype\))/,
		`$<begin>window.setMetadata.apply(null, arguments);$<end>`
	);
	script = script.replace(
		/(?<begin>\(\)\)(?<clearBuffer>\w+\.\w+\(\),\w+\.\w+\(\));else try\{var (?<objectId>\w)\=\w\.\w+\.\w+\(\),(?<methodId>\w)\=\w\.\w+\.\w+\(\),\w\=this\.\w+\(\w\);.+?catch\((?<exceptionArg>\w+)\){)(?<catchBody>.+?)(?<end>}finally)/,
		'$<begin>$<clearBuffer>;$<end>'
	);
	script = modifySendCommandFunction(script);
	script = script.replace(
		/function (?<allocateFuncName>[$\w]+)\([$\w]+\)\{return function\([$\w]+,[$\w]+\)\{return [$\w]+\([$\w]+,[$\w]+,[$\w]+\([$\w]+\([$\w]+\)\)\)\}\([$\w]+,new DataView\(new ArrayBuffer\([$\w]+\)\)\)\}/,
		'$&window.allocateByteBuffer=$<allocateFuncName>;'
	);
	return script;
};

const downloadScript = () => {
	unsafeWindow.define = () => {
		delete unsafeWindow.define;

		const mainScript = getMainScript();
		fetch(mainScript.src).then(async response => {
			mainScript.remove();
			const script = document.createElement('script');
			script.text = modifyScript(await response.text());
			document.body.appendChild(script);
		});
	};
	unsafeWindow.define.amd = true;
};

downloadScript();

import { cheatBase } from './cheatBase.js';
