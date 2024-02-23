import styles from './ServerPicker.module.scss';

export default () => {
    return (
        <main className={styles.root}>
            <button className={styles.test} />
            <button
                className={styles.main}
                onClick={() => (location.pathname = '/main')}
            />
        </main>
    );
};
