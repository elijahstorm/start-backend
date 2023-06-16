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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let User = User_1 = class User {
    join(email, password, nickname, first_name, last_name) {
        const user = new User_1;
        user.email = email;
        user.password = password;
        user.nickname = nickname;
        user.first_name = first_name;
        user.last_name = last_name;
        return user;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'uid' }),
    __metadata("design:type", Number)
], User.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'nickname', unique: true }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'first_name', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'last_name', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { name: 'email_varification_time', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email_varification_time", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'joindate' }),
    __metadata("design:type", String)
], User.prototype, "joindate", void 0);
User = User_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.Entity)({ schema: 'user', name: 'user' })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map