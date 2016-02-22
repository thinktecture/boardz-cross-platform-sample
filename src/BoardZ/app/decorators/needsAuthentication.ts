import {CanActivate} from 'angular2/router';
import {isLoggedIn} from '../middlewares/isloggedin.middleware';

export const NeedsAuthentication = () => {
    return CanActivate(isLoggedIn);
}