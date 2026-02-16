export interface User {
    id: string;
    email: string;
    name?: string;
}

export type Role = "admin" | "user";
