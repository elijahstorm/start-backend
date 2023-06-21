"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const ActiveLog_1 = require("../entities/ActiveLog");
const typeorm_1 = require("typeorm");
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('finish', async () => {
            const { statusCode } = response;
            const requests = JSON.stringify(request.body);
            common_1.Logger.log(`${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`);
            common_1.Logger.log(requests);
            if (request.method != 'GET' && request.body.uid) {
                const queryRunner = (0, typeorm_1.getConnection)().createQueryRunner();
                try {
                    await queryRunner.connect();
                    const active_log = new ActiveLog_1.ActiveLog();
                    active_log.api = originalUrl.split('/api/')[1];
                    active_log.uid = request.body.uid;
                    active_log.request = request.body;
                    await queryRunner.manager.save(active_log, { reload: false });
                }
                catch (err) {
                    common_1.Logger.log("fail leave active log : " + err);
                }
            }
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map