import { mount, unmount } from './menu/main';
import servers from './shared/servers.json';
import { setPathName, execute, getStartupType } from './shared/utils';
import { modifyScript } from './scriptModification';
import { scriptLoader } from './scriptLoader';
import './formatter';

export const downloadScript = url => {
    fetch(`/cors/${url}`).then(async response => {
        const responseText = await response.text();
        const [, scriptURL] = responseText.match(/defer="defer" src=\"(.+?)\"/);

        if (scriptURL) {
            fetch(`/cors/${new URL(scriptURL, url).toString()}`).then(
                async response => {
                    scriptLoader();
                    execute(modifyScript(await response.text(), url));
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
                    servers['public-deploy'].search.replaceAll('[n]', server)
            );
            downloadScript(url);
            break;
        }

        setPathName();
        mount();
        break;
    case 'main':
        setPathName(location.pathname + servers.main.search);
        downloadScript(servers.main.url);
        break;
    default:
        setPathName();
        mount();
}
