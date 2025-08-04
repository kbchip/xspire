export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export type InventoryItem = {
    user_id: number;
    name: string;
    bought: Date;
    expires: Date;
    priority: number;
    uuid: string;
}