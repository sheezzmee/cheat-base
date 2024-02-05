import { downloadScript } from '../..';
import { setPathName } from '../../shared/utils';
import servers from '../../shared/servers.json';

const response = await fetch('/cors/https://test.tankionline.com/public_test');
const deploys = await response.json();

export default ({ setLoading }) => {
    return (
        <div className='server-picker'>
            {deploys.map(deploy => {
                const deployNumber =
                    +deploy.Release.match(/deploy(?<num>.+?)-/)[1];
                return (
                    <button
                        onClick={() => {
                            setLoading(true);
                            downloadScript(
                                servers['public-deploy'].url.replace(
                                    '[n]',
                                    deployNumber
                                )
                            );
                            setPathName(
                                `public-deploy${deployNumber}${servers[
                                    'public-deploy'
                                ].search.replaceAll('[n]', deployNumber)}`
                            );
                        }}
                    >
                        deploy-{deployNumber}: {deploy.UserCount}
                    </button>
                );
            })}
            <button
                onClick={() => {
                    setLoading(true);
                    downloadScript(servers.main.url);
                    setPathName(`main${servers.main.search}`);
                }}
            >
                main
            </button>
        </div>
    );
};
