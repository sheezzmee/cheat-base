export default {
    'public-deploy': {
        url: 'https://public-deploy[n].test-eu.tankionline.com/browser-public/index.html',
        search: {
            get 'config-template'() {
                return `${window.proxy}https://c{server}.public-deploy[n].test-eu.tankionline.com/config.xml`;
            },
            get resources() {
                return `${
                    window.proxy || 'https://'
                }public-deploy[n].test-eu.tankionline.com/resources`;
            },
            get balancer() {
                return `${
                    window.proxy || 'https://'
                }balancer.public-deploy[n].test-eu.tankionline.com/balancer`;
            }
        }
    },
    main: {
        url: 'https://tankionline.com/play',
        search: {
            get 'config-template'() {
                return `${window.proxy}https://c\{server\}.eu.tankionline.com/config.xml`;
            },
            get resources() {
                return `${window.proxy || 'https://'}s.eu.tankionline.com/`;
            }
        }
    }
};
