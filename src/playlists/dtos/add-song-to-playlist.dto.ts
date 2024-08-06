import { IsString } from 'class-validator';

export class AddSongToPlaylistDto {
  @IsString()
  title: string;

  @IsString()
  videoId: string;

  @IsString()
  userName: string;
}
