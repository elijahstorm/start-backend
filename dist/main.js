"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const winston_1 = __importDefault(require("winston"));
const morgan_1 = __importDefault(require("morgan"));
const nest_winston_1 = require("nest-winston");
require("winston-daily-rotate-file");
const httpException_filter_1 = require("./middlewares/httpException.filter");
const common_1 = require("@nestjs/common");
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
async function bootstrap() {
    dotenv_1.default.config();
    const transport = new winston_1.default.transports.DailyRotateFile({
        filename: 'log/%DATE%.log',
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.ms(), winston_1.default.format.printf((info) => {
            return `${info.timestamp} [${info.level}] ${info.message}`;
        }))
    });
    const transportError = new winston_1.default.transports.DailyRotateFile({
        filename: 'err/%DATE%.log',
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.ms(), winston_1.default.format.printf((info) => {
            return `${info.timestamp} [${info.level}] ${info.message}`;
        })),
    });
    const logger = nest_winston_1.WinstonModule.createLogger({
        transports: [
            new winston_1.default.transports.Console({
                level: 'debug',
                format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.colorize(), winston_1.default.format.printf((info) => {
                    console.log();
                    return `${info.timestamp} [${info.level}] ${info.message} -  `;
                })),
            }),
            transport,
            transportError
        ],
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true, logger: logger });
    const port = process.env.PORT || 3001;
    const httpLogStream = {
        write: (message) => { logger.log(message.substring(0, message.lastIndexOf("\n"))); }
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle('START:T')
        .setDescription('START:t api document')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
        },
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidUnknownValues: false,
        transform: true
    }));
    app.useGlobalFilters(new httpException_filter_1.HttpExceptionFilter());
    app.useLogger(logger);
    app.use((0, morgan_1.default)(':method :url HTTP/:http-version :status :res[content-length] :remote-addr - :remote-user  :response-time ms', { stream: httpLogStream }));
    await app.listen(port);
    console.log(`listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map