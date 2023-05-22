"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSerializer = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth.service");
const user_repository_1 = require("src/users/Repository/user.repository");
let LocalSerializer = class LocalSerializer extends passport_1.PassportSerializer {
    authService;
    usersRepository;
    constructor(authService, usersRepository) {
        super();
        this.authService = authService;
        this.usersRepository = usersRepository;
    }
    serializeUser(user, done) {
        console.log(user);
        done(null, user.uid);
    }
    async deserializeUser(uid, done) {
        return await this.usersRepository
            .findOneOrFail({ uid: uid }, {
            select: ['uid', 'email'],
        })
            .then((user) => {
            console.log('user', user);
            done(null, user);
        })
            .catch((error) => done(error));
    }
};
LocalSerializer = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_repository_1.UserRepository])
], LocalSerializer);
exports.LocalSerializer = LocalSerializer;
//# sourceMappingURL=local.serializer.js.map