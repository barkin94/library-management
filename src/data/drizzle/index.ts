import { getConfig } from '../../config';
import { drizzle, NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schemas'

let db: NodePgDatabase<typeof schema> & {
  $client: NodePgClient;
}

export const initDrizzle = async () => {
  const { db: { connectionString, debug } } = getConfig()

  db = drizzle({ 
    connection: { 
      connectionString,
    },
    logger: debug,
    schema,
  });
}

export const getDb = () => db;

