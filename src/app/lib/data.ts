import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { User, InventoryItem } from './types';

dotenv.config();

const config = {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'xspire-database',
    port: 3306
}

export async function getConnection() {
    return await mysql.createConnection(config);
}

// User-related functions
export async function getUserById(id: number): Promise<User | null> {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT id, email, name, created_at, updated_at FROM users WHERE id = ?',
            [id]
        );
        const users = rows as User[];
        return users.length > 0 ? users[0] : null;
    } finally {
        await connection.end();
    }
}

// Inventory-related functions
export async function getInventoryByUserId(userId: number): Promise<InventoryItem[]> {
    const connection = await getConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT id, user_id, name, bought, expires, priority, uuid FROM inventory WHERE user_id = ? ORDER BY expires ASC',
            [userId]
        );
        return rows as InventoryItem[];
    } finally {
        await connection.end();
    }
}

export async function addInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<number> {
    const connection = await getConnection();
    try {
        const [result] = await connection.execute(
            'INSERT INTO inventory (user_id, name, bought, expires, priority, uuid) VALUES (?, ?, ?, ?, ?, ?)',
            [item.user_id, item.name, item.bought, item.expires, item.priority, item.uuid]
        );
        const insertResult = result as mysql.ResultSetHeader;
        return insertResult.insertId;
    } finally {
        await connection.end();
    }
}

export async function updateInventoryItem(id: number, item: Partial<InventoryItem>): Promise<boolean> {
    const connection = await getConnection();
    try {
        const updates: string[] = [];
        const values: any[] = [];

        if (item.name !== undefined) {
            updates.push('name = ?');
            values.push(item.name);
        }
        if (item.bought !== undefined) {
            updates.push('bought = ?');
            values.push(item.bought);
        }
        if (item.expires !== undefined) {
            updates.push('expires = ?');
            values.push(item.expires);
        }
        if (item.priority !== undefined) {
            updates.push('priority = ?');
            values.push(item.priority);
        }

        if (updates.length === 0) return false;

        values.push(id);
        const [result] = await connection.execute(
            `UPDATE inventory SET ${updates.join(', ')} WHERE id = ?`,
            values
        );
        const updateResult = result as mysql.ResultSetHeader;
        return updateResult.affectedRows > 0;
    } finally {
        await connection.end();
    }
}

export async function deleteInventoryItem(uuid: string, userId: number): Promise<boolean> {
    const connection = await getConnection();
    try {
        const [result] = await connection.execute(
            'DELETE FROM inventory WHERE uuid = ? AND user_id = ?',
            [uuid, userId]
        );
        const deleteResult = result as mysql.ResultSetHeader;
        return deleteResult.affectedRows > 0;
    } finally {
        await connection.end();
    }
}
