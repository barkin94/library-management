import { DataSource } from "typeorm";
import entities from './entities';
import { getConfig } from "../config";

let datasource:  DataSource;

export const constructDatasource = (
    connectionString: string,
    logging: boolean
) => {
    datasource = new DataSource({
        type: 'postgres',
        url: connectionString,
        entities: [__dirname + '/entities/**/*.{js,ts}'],
        synchronize: true,
        logging
    });
}

export const initDatasourceConn = async () => await datasource.initialize();

export const getDatasource = () => datasource;

export default (() => {
    const { db: { connectionString, logging }} = getConfig();
    constructDatasource(connectionString, logging)
    return datasource!;
})()
