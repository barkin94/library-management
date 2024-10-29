import { MikroORM } from '@mikro-orm/postgresql';
import { getConfig } from '../../config';
import { EventEmitter } from 'stream';

const emitter = new EventEmitter();

let mikroOrmPromise = new Promise<MikroORM>(async (resolve) => {
  emitter.on('mikroOrmReady', (mikroOrm) => {
    resolve(mikroOrm);
    emitter.removeAllListeners();
  })
});

export const initMikroOrm = async () => {
  const { db: { connectionString, debug } } = getConfig()

  const mikroOrm = await MikroORM.init({
    clientUrl: connectionString,
    debug: debug,
    entities: ['dist/data/mikroorm/entities/*.js'],
    entitiesTs: ['src/data/mikroorm/entities/*.ts'],
    allowGlobalContext: true,
  });

  emitter.emit('mikroOrmReady', mikroOrm)
}

export const getMikroORM = () => mikroOrmPromise;

