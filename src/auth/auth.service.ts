import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/dto/request/signIn.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRedis() private readonly redis: Redis,
        private readonly jwt: JwtService,
    ) {}

    generateAccessToken = async (userId: number) => {
        const accesstoken = await this.jwt.signAsync({ id: userId }, {
            expiresIn: '3h',
            secret: process.env.SECRET
        })

        await this.redis.set(String(userId), accesstoken);

        return accesstoken;
    }

    generateRefreshToken = async (accesstoken: string) => {
        const refreshtoken = await this.jwt.signAsync({ accesstoken }, {
            expiresIn: '2d',
            secret: process.env.SECRET
        })

        await this.redis.set(refreshtoken, accesstoken);

        return refreshtoken;
    }

    signIn = async (signInDto: SignInDto) => {
        const { email, password } = signInDto;

        const thisUser = await this.userRepository.findOneBy({ email });
        if(!thisUser) throw new NotFoundException(); // 회원 존재 여부
        if(!compareSync(password, thisUser.password)) throw new BadRequestException(); // 비밀번호 일치 여부

        const accesstoken = await this.generateAccessToken(thisUser.id);
        const refreshtoken = await this.generateRefreshToken(accesstoken);

        return {
            id: thisUser.id,
            accesstoken,
            refreshtoken
        }
    }
}