import {CanActivate} from 'angular2/router';
import {isLoggedIn} from '../services/routing/isLoggedIn';

export const NeedsAuthentication = () => {
    return CanActivate(isLoggedIn);
}