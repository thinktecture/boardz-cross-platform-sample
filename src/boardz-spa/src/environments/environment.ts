// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    authN: {
        url: 'http://13.80.18.87/',
        grant: 'password',
        clientId: 'ro',
        clientSecret: 'secret',
        scope: 'api'
    },
    apiRootUrl: 'http://10.211.55.4:8000/',
    offlineConfig: {
        checkInterval: 5000,
        maxDurationForGood: 50,
        maxDurationForNormal: 190,
        maxDurationForToSlow: 300,
        absoluteTimeoutAt: 375
    }

};
