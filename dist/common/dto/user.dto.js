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
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnErrorResponse = exports.returnResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class returnResponse {
    constructor(success, result = undefined) {
        this.success = Number(success);
        this.result = result;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'success ( 1 : success)' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], returnResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'result' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], returnResponse.prototype, "result", void 0);
exports.returnResponse = returnResponse;
class returnErrorResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'success ( 1 : success, 0 :fail)' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], returnErrorResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'fail code(400 : code error, others : rule error' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], returnErrorResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'error message' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], returnErrorResponse.prototype, "data", void 0);
exports.returnErrorResponse = returnErrorResponse;
//# sourceMappingURL=user.dto.js.map