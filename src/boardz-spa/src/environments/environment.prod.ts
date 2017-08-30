export const environment = {
    production: true,
    apiRootUrl: 'https://boardzapi.azurewebsites.net/',
    offlineConfig: {
        checkInterval: 10000,
        maxDurationForGood: 50,
        maxDurationForNormal: 190,
        maxDurationForToSlow: 240,
        absoluteTimeoutAt: 320
    }
};
