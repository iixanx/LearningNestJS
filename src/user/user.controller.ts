import { Body, Controller, Get, Headers, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequestDto } from 'src/dto/request/signUp.dto';
import { ResStructureDto } from 'src/dto/response/resStructure.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { HttpExceptionFilter } from 'src/exception/http.exception.filter';

@UseFilters(new HttpExceptionFilter())
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

    @UseGuards(AuthGuard)
    @Get('/:id')
    async userPage(@Headers('authorization') accesstoken: string, @Param('id') userId: number) {
        const data = await this.userService.userPage(userId)

        return {
            data,
            statusCode: 200,
            statusMsg: "Success to get inform"
        }
    }
}
