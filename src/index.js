import { cheatBase } from './cheatBase.js';

const getMainScript = () => {
    const scripts = document.getElementsByTagName('script');
    return scripts.item(scripts.length - 1);
}

/**
 * author: sabaka-babaka
 */
const modifyScript = script => {
    const pattern = /(?<begin>function \w+\(\w,\w,\w,\w,\w,\w,\w,\w\)\{)(?<end>null!=\w&&\(\w\.prototype=Object\.create\(\w\.prototype\))/;
    script = script.replace(pattern, `$<begin>(function(s,w){if(w==='StartScreenComponentStyle'){const event=new CustomEvent("cheat-base-initialized",{bubbles:!0});dispatchEvent(event);}if(w&&s)if(window[w]){for(let i=0;;i++)if(!window[w+"_"+i]){window[w+"_"+i]=s;break}}else window[w]=s}).apply(this, arguments);$<end>`);
    return script;
}

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
    }
    unsafeWindow.define.amd = true;
}

downloadScript();