import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './input.scss'

let root,
    reactRoot,
    isMount = false;

export const mount = () => {
    if (isMount) {
        return;
    }
    root = document.createElement('div');
    root.classList.add('cheat-base-wrapper');
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
