import { UsersData } from "./users-data";

export interface UsersParams {
    limit: number,
    skip: number,
    total: number,
    users: UsersData[]
}
