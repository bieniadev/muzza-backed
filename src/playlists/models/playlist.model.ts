import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from '../../common/bases/base.model';

export class Song {
  @prop({ required: true, type: String })
  title: string;

  @prop({ required: true, type: String })
  videoId: string;

  // @prop({ ref: User })
  // userId: Ref<User>;

  @prop({ required: true, type: String })
  userName: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Playlist extends BaseModel {
  @prop({ required: true, type: Number })
  playersCount: number;

  @prop({ required: true, type: Number })
  songsPerPlayer: number;

  @prop({
    required: true,
    each: true,
    type: () => [Song],
    _id: false,
    default: [],
  })
  songs: Song[];
}

export const PlaylistSchema = buildSchema(Playlist);
