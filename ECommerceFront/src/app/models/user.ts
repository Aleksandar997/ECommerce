import { Menu } from './menu';
import { Role } from './role';
import { Permission } from './permission';

export class User {
    userId: number;
    userName: string;
    password: string;
    email: string;
    active: boolean;
    menu: Array<Menu>;
    role: Array<Role>;
    permission: Array<Permission>;

    constructor() {
        this.menu = new Array<Menu>();
        this.role = new Array<Role>();
        this.permission = new Array<Permission>();
    }
}

