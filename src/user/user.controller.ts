import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from 'src/dto/signUp.dto';

@Controller('user')
export class UserController {
    constructor (
        private userService: UserService
    ) {}

    // Json Request Body

    @Post()
    async signUP(@Body() signUpDto: SignUpDto): Promise<void> {
        return await this.userService.signUp(signUpDto)
    }
}
