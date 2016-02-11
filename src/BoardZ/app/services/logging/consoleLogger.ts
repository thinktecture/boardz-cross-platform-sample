import {Injectable} from 'angular2/core';
import {Logger} from './logger';

@Injectable()
export class ConsoleLogger extends Logger {

    protected doLog(formattedMessage: string): void {
        console.log(formattedMessage);
    }

}
