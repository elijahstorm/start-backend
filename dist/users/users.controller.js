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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const not_logged_in_guard_1 = require("../auth/not-logged-in.guard");
const logged_in_guard_1 = require("../auth/logged-in.guard");
const CurrentUser_decorator_1 = require("../common/decorators/CurrentUser.decorator");
const user_request_dto_1 = require("./dto/user.request.dto");
const users_service_1 = require("./users.service");
const User_1 = require("../entities/User");
const user_dto_1 = require("../common/dto/user.dto");
const Enum_1 = require("../common/Enum");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(user) {
        return user || false;
    }
    async join(req) {
        return await this.usersService.join(req);
    }
    async login(user) {
        return new user_dto_1.returnResponse(Enum_1.Return.OK, user);
    }
    async sendAuthEmail(req) {
        return await this.usersService.SendAuthEmail(req);
    }
    async conformAuthEmail(req) {
        return await this.usersService.conformValidEmail(req);
    }
    async logout(res) {
        res.clearCookie('connect.sid', { httpOnly: true });
        return res.send('ok');
    }
};
__decorate([
    (0, swagger_1.ApiCookieAuth)('connect.sid'),
    (0, swagger_1.ApiOperation)({ summary: 'currentUser' }),
    (0, common_1.Get)(),
    __param(0, (0, CurrentUser_decorator_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'join' }),
    (0, common_1.UseGuards)(not_logged_in_guard_1.NotLoggedInGuard),
    (0, common_1.Post)('join'),
    (0, swagger_1.ApiCreatedResponse)({ type: user_dto_1.returnResponse, description: ' result is undefined' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: `
    10000 : already exist email error`, type: user_dto_1.returnErrorResponse
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.JoinRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "join", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'login' }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiBadRequestResponse)({
        description: `
    2 : NOT_EMAIL_VARIFI_USER,
    11000 : fail login`, type: user_dto_1.returnErrorResponse
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, CurrentUser_decorator_1.currentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'sendAuthEmail' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: `
    1 : Not_Exist_Email,
    12000 : Over_Max_Count`, type: user_dto_1.returnErrorResponse
    }),
    (0, common_1.Post)('/sendEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.SendAuthEmailRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendAuthEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'conformAuthEmail' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: `
    1 : Not_Exist_Email,
    13000 : Over_Time,
    13001 : Wrong_Code,
    `, type: user_dto_1.returnErrorResponse
    }),
    (0, common_1.Post)('/conform'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.ConformAuthEmailRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "conformAuthEmail", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)('connect.sid'),
    (0, swagger_1.ApiOperation)({ summary: 'logout' }),
    (0, common_1.UseGuards)(logged_in_guard_1.LoggedInGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('USERS'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map