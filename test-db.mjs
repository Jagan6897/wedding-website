import pg from 'pg';

const { Pool } = pg;

// Node 20+ loads .env automatically with --env-file
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: { rejectUnauthorized: false }
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to database!');
        const res = await client.query('SELECT NOW()');
        console.log('Current time from DB:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error connecting to database:', err);
    } finally {
        await pool.end();
    }
}

testConnection();
