
export class Configuration {
    apiEndpoint: string;
}

export class ApplicationConfiguration extends Configuration {
    //apiEndpoint: string = 'http://localhost:50464/';
    public apiEndpoint: string = 'https://boardzapi.azurewebsites.net/';
    //public apiEndpoint: string = 'http://windows10vm.local:8080/';
}
