import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PlaylistsModule } from './playlists/playlists.module';

const mongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get<string>('MONGODB_URI'),
    };
  },
});

@Module({
  imports: [
    AuthModule,
    mongooseModule,
    ConfigModule.forRoot(),
    UsersModule,
    PlaylistsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
