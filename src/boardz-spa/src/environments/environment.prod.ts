export const environment = {
    production: true,
    authN: {
        url: 'http://13.93.89.183:80/connect/token',
        grant: 'password',
        clientId: 'ro',
        clientSecret: 'secret',
        scope: 'api'
    },
    apiRootUrl: 'https://boardzapi.azurewebsites.net/',
    offlineConfig: {
        checkInterval: 10000,
        maxDurationForGood: 50,
        maxDurationForNormal: 190,
        maxDurationForToSlow: 240,
        absoluteTimeoutAt: 320
    }
};
