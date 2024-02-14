import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequestDto } from 'src/dto/request/signUp.dto';
import { ResStructureDto } from 'src/dto/response/resStructure.dto';

@Controller('user')
export class UserController {
    constructor (
        private userService : UserService,
    ) { }

    @Post() // '/'
    async signUp(@Body() signUpDto: SignUpRequestDto): Promise<ResStructureDto> {
        const data = await this.userService.signUp(signUpDto)

        return {
            data,
            statusCode: 201,
            statusMsg: "Created"
        }
    }
}
