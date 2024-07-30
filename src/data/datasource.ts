import { DataSource } from "typeorm";
import { getConfig } from "../config";
import entities from './entities';
//import migrations from "./migrations";

const { db: { connectionString, logging }} = getConfig();

const datasource = new DataSource({
    type: 'postgres',
    url: connectionString,
    entities,
    //migrations,
    synchronize: true,
    logging
})

datasource.initialize()
    .then(() => console.log('db connection initialized'))
    .catch(err => console.log('db connection error', err))

export default datasource;