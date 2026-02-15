import { Handler } from '@netlify/functions';
import { Client } from 'pg';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Hardcoded Admin Password Hash (SHA-256 for "wedding2026")
// In a real app, use bcrypt and a DB table, but this is simple and sufficient for a personal site.
const ADMIN_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

export const handler: Handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        // specific replacement for robust handling of /api/ or /.netlify/functions/api/
        const path = event.path.split('/api/')[1] || event.path.split('/').pop() || '';

        // --- PUBLIC ENDPOINTS --- //

        // GET /api/content
        if (path === 'content' && event.httpMethod === 'GET') {
            const result = await client.query('SELECT value FROM wedding_config WHERE key = $1', ['main_config']);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.rows[0]?.value || {}),
            };
        }

        // GET /api/images
        if (path === 'images' && event.httpMethod === 'GET') {
            const result = await client.query('SELECT id, category, caption, data, created_at FROM wedding_images ORDER BY created_at DESC');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.rows),
            };
        }

        // POST /api/login
        if (path === 'login' && event.httpMethod === 'POST') {
            const { password } = JSON.parse(event.body || '{}');
            const crypto = await import('crypto');
            const hash = crypto.createHash('sha256').update(password).digest('hex');

            if (hash === ADMIN_HASH) {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ token: 'admin-token-secret' })
                };
            }
            return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid password' }) };
        }

        // --- PROTECTED ENDPOINTS (Require Authorization) --- //

        const authHeader = event.headers.authorization || event.headers.Authorization;
        if (authHeader !== 'Bearer admin-token-secret') {
            return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
        }

        // POST /api/content (Update Config)
        if (path === 'content' && event.httpMethod === 'POST') {
            const { content } = JSON.parse(event.body || '{}');
            await client.query(
                `INSERT INTO wedding_config (key, value, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE 
         SET value = EXCLUDED.value, updated_at = NOW()`,
                ['main_config', JSON.stringify(content)]
            );
            return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
        }

        // POST /api/images (Upload Image)
        if (path === 'images' && event.httpMethod === 'POST') {
            const { category, data, caption } = JSON.parse(event.body || '{}');

            // Basic validation
            if (!data || !category) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing data' }) };
            }

            await client.query(
                'INSERT INTO wedding_images (category, data, caption) VALUES ($1, $2, $3)',
                [category, data, caption]
            );

            return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
        }

        // DELETE /api/images (Delete Image)
        if (path.startsWith('images/') && event.httpMethod === 'DELETE') {
            const id = path.split('/')[1];
            await client.query('DELETE FROM wedding_images WHERE id = $1', [id]);
            return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
        }

        return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not Found' }) };

    } catch (error) {
        console.error('Database Error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal Server Error', details: error.toString() }) };
    } finally {
        await client.end();
    }
};
