import { IsNumber } from 'class-validator';

export class CreatePlaylistDto {
  @IsNumber()
  playersCount: number;

  @IsNumber()
  songsPerPlayer: number;
}
