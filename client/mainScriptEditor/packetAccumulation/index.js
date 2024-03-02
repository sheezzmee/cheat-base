import { modifications } from '..';

window.shouldSendCommand = true;
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

// сори за ебланство но import вызывается раньше чем export))
requestAnimationFrame(() => {
    modifications.push(code => {
        code = modifySendCommandFunction(code);
        code = code.replace(
            /function (?<allocateFuncName>[$\w]+)\([$\w]+\)\{return function\([$\w]+,[$\w]+\)\{return [$\w]+\([$\w]+,[$\w]+,[$\w]+\([$\w]+\([$\w]+\)\)\)\}\([$\w]+,new DataView\(new ArrayBuffer\([$\w]+\)\)\)\}/,
            '$&window.allocateByteBuffer=$<allocateFuncName>;'
        );
        return code;
    });
});
