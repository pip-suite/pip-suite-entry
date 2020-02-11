import { Role } from './Role';

export class Account {
    public roles: string[];
    public theme: string;
    public language: string;
    public time_zone: string;
    public create_time: string; // JSON date
    public change_pwd_time: string; // JSON date
    public login: string;
    public name: string;
    public id: string;
    public custom_hdr?: any;
    public custom_dat?: any;
    public settings?: any;
}