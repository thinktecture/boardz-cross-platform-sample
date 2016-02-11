import {Provider, provide} from 'angular2/core';

import {Logger} from './logger';
import {ConsoleLogger} from './consoleLogger';

export var LOGGING_PROVIDERS: Provider[] = [
    provide(Logger, { useClass: ConsoleLogger }),
];