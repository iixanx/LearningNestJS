import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '3h',
      },
      verifyOptions: {
        complete: false
      },
    }),
  ],
  providers: [AuthService, Logger],
  controllers: [AuthController]
})
export class AuthModule {}