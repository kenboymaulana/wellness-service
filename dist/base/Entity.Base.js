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
exports.BaseEntityUuid = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
class BaseEntityUuid {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BaseEntityUuid.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], BaseEntityUuid.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], BaseEntityUuid.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], BaseEntityUuid.prototype, "deleted_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BaseEntityUuid.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ onUpdate: 'CURRENT_TIMESTAMP(6)' }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BaseEntityUuid.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], BaseEntityUuid.prototype, "deleted_at", void 0);
exports.BaseEntityUuid = BaseEntityUuid;
//# sourceMappingURL=Entity.Base.js.map