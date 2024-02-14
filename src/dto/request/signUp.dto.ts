import { IsDate, IsDateString, IsEmail, IsISO8601, IsString, Matches } from "class-validator"

export class SignUpRequestDto {
    @IsEmail()
    email: string

    @Matches(/^*./g)
    password: string

    @IsString()
    name: string

    @IsISO8601()
    birth: string
}