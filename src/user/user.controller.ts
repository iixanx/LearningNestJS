import { Body, Controller, Get, Headers, Logger, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequestDto } from 'src/dto/request/signUp.dto';
import { ResStructureDto } from 'src/dto/response/resStructure.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HttpExceptionFilter } from 'src/exception/http.exception.filter';
import { AuthInterceptor } from 'src/auth/auth.interceptor';

@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UserController {
    constructor (
        private userService : UserService,
        private logger: Logger
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

    @UseGuards(new AuthGuard())
    @UseInterceptors(new AuthInterceptor())
    @Get()
    async userPage(@Headers('authorization') accesstoken: string, userId) {

        const data = await this.userService.userPage(userId)

        return {
            data,
            statusCode: 200,
            statusMsg: "Success to get inform"
        }
    }
}
