import { Role } from "../enums/roles.enums";

export class UserModel {
    id!: number;
    email!: string;
    username!: string;
    role!: Role;
}