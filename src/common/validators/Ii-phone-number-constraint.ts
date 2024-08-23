import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(phoneNumber: string, args: ValidationArguments) {
        const phoneRegex = /^7\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultMessage(args: ValidationArguments) {
        return 'Phone number must be in the format 79134567891';
    }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneNumberConstraint,
        });
    };
}
