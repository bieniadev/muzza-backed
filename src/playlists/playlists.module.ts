import { Module } from '@nestjs/common';
import { PlaylistsController } from './controllers/playlists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './models/playlist.model';
import { PlaylistsRepository } from './repositories/playlists.repository';
import { PlaylistsService } from './service/playlists.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsRepository, PlaylistsService],
  exports: [PlaylistsRepository, PlaylistsService],
})
export class PlaylistsModule {}
