import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersModule } from 'src/users/users.module';

const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule.forFeature(authConfig)],
  useFactory: ({ jwtSecret }: ConfigType<typeof authConfig>) => ({
    secret: jwtSecret,
  }),
  inject: [authConfig.KEY],
});

@Module({
  imports: [
    jwtModule,
    PassportModule,
    ConfigModule.forFeature(authConfig),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
