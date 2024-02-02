import './App.css';

import { downloadScript } from '..';
import { useState } from 'react';
import { Watch } from 'react-loader-spinner';
import servers from '../servers.json';
import { setPathName } from '../cheatBase/utils';
import config, { saveConfig } from '../config';

let deploys = await fetch('/cors/https://test.tankionline.com/public_test');
deploys = await deploys.json();

function App() {
	const [isLoading, setLoading] = useState(false);
	const [shizoval, setShizoval] = useState(config.scriptLoader.shizoval);

	return !isLoading ? (
		<div className='server-picker'>
			{deploys.map(deploy => {
				const deployNumber = +deploy.Release.match(/deploy(?<num>.+?)-/)[1];
				return (
					<button
						onClick={() => {
							setLoading(true);
							downloadScript(
								servers['public-deploy'].url.replace('[n]', deployNumber)
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
			<button
				onClick={() => {
					setShizoval(
						(config.scriptLoader.shizoval = !config.scriptLoader.shizoval)
					);
					saveConfig();
				}}
			>
				shizoval: {String(shizoval)}
			</button>
		</div>
	) : (
		<Watch
			visible={true}
			width='200'
			height='200'
			radius='48'
			color='#4fa94d'
			wrapperClass='loader'
		/>
	);
}

export default App;
