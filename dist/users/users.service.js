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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./Repository/user.repository");
const User_1 = require("../entities/User");
let UsersService = class UsersService {
    constructor(usersRepository, user) {
        this.usersRepository = usersRepository;
        this.user = user;
    }
    async join(req) {
        try {
            let user = await this.usersRepository.findOne({ email: req.email });
            if (user) {
                throw new common_1.HttpException('already-exists', 400);
            }
            const joinInfo = this.user.join(req.email, req.password, req.nickname);
            await this.usersRepository.save(joinInfo);
            return joinInfo;
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        User_1.User])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map