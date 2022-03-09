import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'mac',
    password: '',
    database: 'tutorial',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
}

export default config;
