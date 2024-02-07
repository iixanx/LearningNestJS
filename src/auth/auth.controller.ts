import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResStructureDto } from 'src/dto/response/resStructure.dto';
import { SignInDto } from 'src/dto/request/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService,
    ) {}

    @Post()
    async signIn(@Body() signInDto: SignInDto): Promise<ResStructureDto> {
        const data = await this.authService.signIn(signInDto);

        return {
            data,
            statusCode: 201,
            statusMsg: "로그인 완료"
        }
    }
}
