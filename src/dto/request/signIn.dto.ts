import { IsEmail, Matches } from 'class-validator'

export class SignInDto {
    @IsEmail()
    email: string

    @Matches(/^/g)
    password: string
}