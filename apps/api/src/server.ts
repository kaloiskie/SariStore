import Fastify from 'fastify';
import cors from '@fastify/cors';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const app = Fastify({ logger: true });
async function start() {
  await app.register(cors, { origin: true });

const databasePath = process.env.SARISTORE_DATABASE_PATH || './data/saristore.sqlite';
mkdirSync(dirname(databasePath), { recursive: true });
const db = new Database(databasePath);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS demo_users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    store_id TEXT NOT NULL
  )
`);

  app.get('/health', async () => ({ ok: true, service: 'saristore-api' }));

  app.get('/auth/demo/:role', async (request, reply) => {
  const { role } = request.params as { role: string };
  if (!['staff', 'manager', 'admin'].includes(role)) {
    return reply.code(400).send({ error: 'Unsupported demo role' });
  }
  const user = { id: `demo-${role}`, name: `Demo ${role}`, role, storeId: 'demo-store' };
  db.prepare('INSERT OR REPLACE INTO demo_users (id, name, role, store_id) VALUES (@id, @name, @role, @storeId)').run(user);
  return { user };
  });

  await app.listen({ host: process.env.SARISTORE_HOST || '127.0.0.1', port: Number(process.env.SARISTORE_API_PORT || 4300) });
}

void start();
