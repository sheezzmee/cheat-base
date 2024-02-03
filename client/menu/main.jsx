import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

let root,
	reactRoot,
	isMount = false;

export const mount = () => {
	if (isMount) {
		return;
	}
	root = document.createElement('div');
	root.style.cssText =
		'z-index: 100; position: fixed; background-color: black; width: 100%; height: 100%; margin: 0;';
	document.body.appendChild(root);

	reactRoot = ReactDOM.createRoot(root);

	reactRoot.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);

	isMount = true;
};

export const unmount = () => {
	if (isMount) {
		reactRoot.unmount();
		root.remove();
		isMount = false;
	}
};
