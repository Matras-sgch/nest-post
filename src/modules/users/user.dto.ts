import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator'

export class UserDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(7)
    readonly password: string;

}