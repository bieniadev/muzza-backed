import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../common/bases/base.repository';
import { ReturnModelType } from '@typegoose/typegoose';
import { Playlist } from '../models/playlist.model';

export class PlaylistsRepository extends BaseRepository<Playlist> {
  constructor(
    @InjectModel(Playlist.name)
    private playlistModel: ReturnModelType<typeof Playlist>,
  ) {
    super(playlistModel);
  }
}
