import { DataSource } from "typeorm";
import entities from './entities';

let datasource:  DataSource;

export const constructDatasource = async (
    connectionString: string,
    logging: boolean
) => {
    datasource = new DataSource({
        type: 'postgres',
        url: connectionString,
        entities,
        //migrations,
        synchronize: true,
        logging
    });

    await datasource.initialize();
}

export const getDatasource = () => datasource;

