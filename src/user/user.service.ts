import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/dto/signUp.dto';

@Injectable()
export class UserService {
    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { name, email, password } = signUpDto;

        console.log(name, email, password)

        return
    }
}