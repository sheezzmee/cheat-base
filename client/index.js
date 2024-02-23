import { mount, unmount } from './menu/main';
import servers from './shared/servers';
import {
    setPathName,
    execute,
    getStartupType,
    createQueryString
} from './shared/utils';
import { scriptLoader } from './scriptLoader';
import './formatter';
import { editScript } from './mainScriptEditor';

try {
    await fetch('https://google.com');
    window.proxy = '';
} catch (e) {
    window.proxy = '/cors/';
}

export const downloadScript = url => {
    location.source = url;

    fetch(`${window.proxy}${url}`).then(async response => {
        const responseText = await response.text();
        const [, scriptURL] = responseText.match(/defer="defer" src=\"(.+?)\"/);

        if (scriptURL) {
            fetch(`${window.proxy}${new URL(scriptURL, url).toString()}`).then(
                //fetch('./public/test.js').then(
                async response => {
                    scriptLoader();
                    execute(editScript(await response.text()));
                    unmount();
                }
            );
        } else {
            alert('main.js not found :(\nmb server is down?');
            setPathName();
            mount();
        }
    });
};

switch (getStartupType()) {
    case 'public-deploy':
        const server = +location.pathname.replace('/public-deploy', '');

        if (server > 0 && server < 10) {
            const url = servers['public-deploy'].url.replace('[n]', server);
            setPathName(
                location.pathname +
                    createQueryString(
                        servers['public-deploy'].search
                    ).replaceAll('[n]', server)
            );
            downloadScript(url);
            break;
        }

        setPathName();
        mount();
        break;
    case 'main':
        setPathName(location.pathname + createQueryString(servers.main.search));
        downloadScript(servers.main.url);
        break;
    default:
        setPathName();
        mount();
}
