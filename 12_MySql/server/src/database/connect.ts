import { sequelize } from "./sequelize";
import { models } from './models';

export function connect() {
    return sequelize.authenticate().then(() => {
        console.log('Successfully connected to the database');
        return models;
    });
}