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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./Repository/user.repository");
const User_1 = require("../entities/User");
const user_dto_1 = require("../common/dto/user.dto");
const Enum_1 = require("../common/Enum");
const moment_1 = __importDefault(require("moment"));
const tempCode_repository_1 = require("./Repository/tempCode.repository");
const tempCode_1 = require("../entities/tempCode");
const email_service_1 = require("../common/email/email.service");
const crypto = require('crypto');
let UsersService = class UsersService {
    constructor(usersRepository, tempCodeRepository, emailSerivce, user, tempCode) {
        this.usersRepository = usersRepository;
        this.tempCodeRepository = tempCodeRepository;
        this.emailSerivce = emailSerivce;
        this.user = user;
        this.tempCode = tempCode;
    }
    async join(req) {
        try {
            let user = await this.usersRepository.findOne({ email: req.email });
            if (user) {
                throw new common_1.HttpException('Exist_Email', Enum_1.Return.Exist_Email);
            }
            let uniqueNick = 0;
            let nickname = '';
            while (uniqueNick == 0) {
                nickname = req.first_name + (0, moment_1.default)().format('mmss') + req.last_name.slice(-1);
                let isExist = await this.usersRepository.findOne({ nickname: nickname });
                if (!isExist) {
                    uniqueNick = 1;
                }
            }
            const joinInfo = this.user.join(req.email, req.password, nickname, req.first_name, req.last_name);
            await this.usersRepository.save(joinInfo);
            return new user_dto_1.returnResponse(Enum_1.Return.OK);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status);
        }
    }
    async SendAuthEmail(req) {
        try {
            const max_trycnt = 4;
            const email_title = "start:T - validCode";
            const email_template = "changePWTemplate";
            const tempCode = crypto.randomBytes(6).toString('hex');
            const user = await this.usersRepository.findOne({ email: req.email });
            if (!user) {
                throw new common_1.HttpException('Not_Exist_Email', Enum_1.Return.Not_Exist_Email);
            }
            let tempInfo = await this.tempCodeRepository.findOne({ uid: user.uid, type: Enum_1.eTempType.Valid_Email });
            if (tempInfo) {
                if (tempInfo.trycnt > max_trycnt && (0, moment_1.default)().diff((0, moment_1.default)(tempInfo.send_date), 'd') > 1)
                    throw new common_1.HttpException('Over_Max_Count', Enum_1.Return.Over_Max_Count);
                else {
                    if (tempInfo.trycnt > max_trycnt) {
                        tempInfo.resetupdate();
                    }
                    tempInfo.update(tempCode);
                    let append = {
                        email: req.email,
                        password: tempCode,
                        url: `${process.env.ADMIN_URL}/login`
                    };
                    await this.emailSerivce.sendTempPW(user.email, append, email_template, email_title);
                    await this.tempCodeRepository.update({ id: tempInfo.id }, tempInfo);
                }
            }
            else if (!tempInfo) {
                let temp = this.tempCode.create(Enum_1.eTempType.Valid_Email, tempCode, user.uid);
                let append = {
                    email: req.email,
                    password: tempCode,
                    url: `${process.env.ADMIN_URL}/login`
                };
                await this.emailSerivce.sendTempPW(user.email, append, email_template, email_title);
                await this.tempCodeRepository.save(temp, { reload: false });
            }
            return new user_dto_1.returnResponse(Enum_1.Return.OK);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status);
        }
    }
    async conformValidEmail(req, currentUser) {
        try {
            const tempInfo = await this.tempCodeRepository.findOneOrFail({ uid: currentUser.uid, type: Enum_1.eTempType.Valid_Email });
            if ((0, moment_1.default)().diff((0, moment_1.default)(tempInfo.send_date), 'd') > 1) {
                throw new common_1.HttpException('Over_Time', Enum_1.Return.Over_Time);
            }
            if (tempInfo.code != req.tempCode) {
                throw new common_1.HttpException('Wrong_Code', Enum_1.Return.Wrong_Code);
            }
            return new user_dto_1.returnResponse(Enum_1.Return.OK);
        }
        catch (err) {
            throw new common_1.HttpException(err, err.status);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(tempCode_repository_1.TempCodeRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        tempCode_repository_1.TempCodeRepository,
        email_service_1.EmailService,
        User_1.User,
        tempCode_1.tempCode])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map