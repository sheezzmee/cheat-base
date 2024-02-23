import styles from './App.module.scss';
import example from '!raw-loader!../../shared/example.user.js';

import Editor from '@monaco-editor/react';
import { useState } from 'react';
import ServerPicker from './ServerPicker';

export default () => {
    const [choiceServer, setChoiceServer] = useState(false);

    return (
        <div className={styles.root}>
            <header>
                <div className={styles.logo}>
                    <div className={styles.image} />
                    <span className={styles.text}>cheat-base</span>
                </div>
                <nav>
                    <span>Документация</span>
                    <span>Скрипты</span>
                    <div className={styles.icons}>
                        <a
                            href='https://discord.gg/shizoval'
                            className={styles.discord_ico}
                        />
                        <a
                            href='https://github.com/sheezzmee/'
                            className={styles.github_ico}
                        />
                    </div>
                </nav>
            </header>
            {!choiceServer ? (
                <main className={styles.home}>
                    <h1>
                        ПЕРЕСТАНЬ{' '}
                        <span className={styles.copycat}>КОПИКОТИТЬ</span>
                        🐈, НАЧНИ СОЗДАВАТЬ{' '}
                        <span className={styles.red}>СВОИ</span> ЧИТЫ 🤬!
                    </h1>
                    <p>
                        Набор читов и инструментов, которые помогут вам раскрыть
                        полный потенциал виртуального мира и сделать ваши
                        игровые сессии более увлекательными
                    </p>
                    <button
                        onClick={() => {
                            setChoiceServer(true);
                        }}
                    >
                        PLAY
                    </button>
                    <Editor
                        width='42.125em'
                        height='20.313em'
                        theme='vs-dark'
                        defaultLanguage='javascript'
                        defaultValue={example}
                        options={{
                            readOnly: true,
                            minimap: {
                                enabled: false
                            },
                            links: false
                        }}
                    />
                </main>
            ) : (
                <ServerPicker />
            )}
        </div>
    );
};
