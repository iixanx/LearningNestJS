import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequestDto } from 'src/dto/request/signUp.dto';

@Controller('user')
export class UserController {
    constructor (
        private userService : UserService,
    ) { }

    @Post()
    async signUp(signUpDto: SignUpRequestDto): Promise<object> {
        const data = await this.userService.signUp(signUpDto)

        return {
            data,
            statusCode: 201,
            statusMsg: "Created"
        }
    }
}
