"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entities/User");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_repository_1 = require("./Repository/user.repository");
const tempCode_repository_1 = require("./Repository/tempCode.repository");
const email_service_1 = require("../common/email/email.service");
const TempCode_1 = require("../entities/TempCode");
const ActiveLog_1 = require("../entities/ActiveLog");
const activelogRepository_1 = require("../common/repository/activelogRepository");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository, tempCode_repository_1.TempCodeRepository, activelogRepository_1.ActiveLogRepository]),
        ],
        providers: [users_service_1.UsersService, User_1.User, TempCode_1.TempCode, email_service_1.EmailService, ActiveLog_1.ActiveLog],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map