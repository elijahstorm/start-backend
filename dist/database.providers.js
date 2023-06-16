"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.typeORMConfig = [
    {
        name: 'default',
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['./entities/*.{js,ts}'],
        synchronize: process.env.VER == 'DEV' ? true : false,
        logging: true,
        keepConnectionAlive: true,
        autoLoadEntities: true,
        charset: 'utf8mb4',
    },
];
//# sourceMappingURL=database.providers.js.map