import { useState } from 'react';
import { Watch } from 'react-loader-spinner';
import ServerPicker from './ServerPicker';
import ScriptLoader from './ScriptLoader';
import styles from './App.module.scss';

export default () => {
	const [isLoading, setLoading] = useState(false);

	return !isLoading ? (
		<>
			<ServerPicker setLoading={setLoading} />
			<ScriptLoader />
		</>
	) : (
		<Watch
			visible={true}
			width='200'
			height='200'
			radius='48'
			color='#4fa94d'
			wrapperClass={styles.loader}
		/>
	);
};
