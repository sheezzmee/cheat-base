import { useState } from 'react';
import config, { saveConfig } from '../../../../shared/config';

export default () => {
    const [enabled, setEnabled] = useState(config.scriptLoader.shizoval);

    return (
        <button
            onClick={() => {
                setEnabled(
                    (config.scriptLoader.shizoval =
                        !config.scriptLoader.shizoval)
                );
                saveConfig();
            }}
        >
            shizoval: {String(enabled)}
        </button>
    );
};
