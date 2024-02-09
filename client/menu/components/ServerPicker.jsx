import { downloadScript } from '../..';
import { createQueryString, setPathName } from '../../shared/utils';
import servers from '../../shared/servers';
import { useEffect, useState } from 'react';

export default ({ setLoading }) => {
    const [deploys, setDeploys] = useState([]);

    useEffect(() => {
        const loadDeploys = async () => {
            const response = await fetch(
                `${window.proxy}https://test.tankionline.com/public_test`
            );

            setDeploys(await response.json());
        };

        loadDeploys();
    }, []);

    return (
        <div className='server-picker'>
            {deploys?.map(deploy => {
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
                                `public-deploy${deployNumber}${createQueryString(
                                    servers['public-deploy'].search
                                ).replaceAll('[n]', deployNumber)}`
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
                    setPathName(
                        `main${createQueryString(servers.main.search)}`
                    );
                }}
            >
                main
            </button>
        </div>
    );
};
