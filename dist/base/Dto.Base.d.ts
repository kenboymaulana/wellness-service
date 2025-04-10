import { DeepPartial } from 'typeorm';
import { BaseEntityUuid } from './Entity.Base';
export declare type ResponseDto<Entity> = Readonly<DeepPartial<Entity>>;
export declare type CreateDto<Entity> = Readonly<Omit<Entity, keyof BaseEntityUuid>>;
export declare type PatchDto<Entity> = Readonly<DeepPartial<CreateDto<Entity>>>;
export declare type PutDto<Entity> = Readonly<Omit<Entity, keyof BaseEntityUuid>>;
export declare class BaseDto {
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
}
export declare class PaginationQuery {
    page?: number;
    limit?: number;
}
