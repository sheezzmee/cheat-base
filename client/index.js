import { mount, unmount } from './menu/main';
import servers from './servers.json';
import { setPathName } from './cheatBase/utils';
import { modifyScript } from './modifyScript';
import { scriptLoader } from './scriptLoader';

export const execute = (code, type = 'text') => {
    const script = document.createElement('script');
    script[type] = code;
    document.body.appendChild(script);
};

export const downloadScript = url => {
    fetch(`/cors/${url}`).then(async response => {
        const responseText = await response.text();
        const [, scriptURL] = responseText.match(/defer="defer" src=\"(.+?)\"/);

        if (scriptURL) {
            fetch(`/cors/${new URL(scriptURL, url).toString()}`).then(
                async response => {
                    scriptLoader();
                    eval(modifyScript(await response.text(), url));
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

const getStartupType = () => {
    if (location.pathname.includes('/public-deploy')) {
        return 'public-deploy';
    } else if (location.pathname.includes('/main')) {
        return 'main';
    }

    return 'other';
};

switch (getStartupType()) {
    case 'public-deploy':
        const server = +location.pathname.replace('/public-deploy', '');

        if (server > 0 && server < 10) {
            const url = servers['public-deploy'].url.replace('[n]', server);
            setPathName(location.pathname + url);
            downloadScript(url);
            break;
        }
    case 'main':
        setPathName(location.pathname + servers.main.search);
        downloadScript(servers.main.url);
        break;
    default:
        setPathName();
        mount();
}
