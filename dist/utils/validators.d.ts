import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';
export declare type IsUniqeInterface = {
    tableName: string;
    column: string;
};
export declare class IsUniqueConstraint implements ValidatorConstraintInterface {
    private readonly entityManager;
    constructor(entityManager: EntityManager);
    validate(value: any, args?: ValidationArguments): Promise<boolean>;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
export declare function isUnique(options: IsUniqeInterface, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
