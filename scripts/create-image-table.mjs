import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    const client = await pool.connect();
    try {
        console.log('🔌 Connected to database...');

        // Create Images Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS wedding_images (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category TEXT NOT NULL,
        data TEXT NOT NULL,
        caption TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
        console.log('✅ Table "wedding_images" ensured.');

    } catch (err) {
        console.error('❌ Error creating image table:', err);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
