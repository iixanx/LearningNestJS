import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { SignUpRequestDto } from 'src/dto/request/signUp.dto';
import { SignUpResponseDto } from 'src/dto/response/signUp.dto';
import { UserEntity } from 'src/model/user.entity';
import { Binary, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  async signUp(signUpDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, name, password, birth } = signUpDto;

    const isExistEmail = await this.userEntity.findOneBy({ email });
    if (isExistEmail) throw new ConflictException();

    const hashed = hashSync(password, Number(process.env.SALT)); // dotenv bcrypt @types/bcrypt

    await this.userEntity.save({
      email,
      name,
      password: hashed,
      birth,
    });

    return {
      email,
      name,
      birth,
    };
  }

  async userPage(userId: number) {
    const user = await this.userEntity.findOne({ where: {id: userId}, select: ['id', 'name', 'email', 'birth'] });
    if(!user) throw new NotFoundException(`userId ${userId} doesn't exist`);

    return user
  }
}
