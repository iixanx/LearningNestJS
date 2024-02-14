import { IsEmail, Matches } from '@nestjs/class-validator'

export class SignInDto {
    @IsEmail()
    email: string

    @Matches(/^/g)
    password: string
}