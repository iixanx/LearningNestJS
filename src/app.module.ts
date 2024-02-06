import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './model/user.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        connectorPackage: 'mysql2',
        host: '127.0.0.1',
        port: Number(process.env.DB_PORT),
        username: 'root',
        password: config.get<string>(process.env.DB_PASSWORD),
        database: process.env.DB_NAME,
        // port: config.get<number>('DB_PORT'),
        // username: config.get<string>('DB_USER'),
        // password: config.get<string>('DB_PASSWORD'),
        // database: config.get<string>('DB_NAME'),
        entities: [UserEntity],
        synchronize: true,
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
