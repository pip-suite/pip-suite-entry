import { Session } from './Session';
import { Account } from './Account';

export class SessionData extends Session {
    public user: Account;
    public data: any; // todo
    public change_pwd_time?: string; // JSON date
}

