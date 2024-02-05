import { useState } from 'react';
import globalConfig, { saveConfig } from '../../../../shared/config';

const config = globalConfig.scriptLoader.autoConfig;

export default () => {
    const [enabled, setEnabled] = useState(config.enabled);

    return (
        <button
            onClick={() => {
                setEnabled((config.enabled = !config.enabled));
                saveConfig();
            }}
        >
            autoConfig: {String(enabled)}
        </button>
    );
};
