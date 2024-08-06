import { ObjectIdParams } from './../../common/validators/object-id.params';
import { AddSongToPlaylistDto } from '../dtos/add-song-to-playlist.dto';
import { CreatePlaylistDto } from '../dtos/create-playlist.dto';
import { PlaylistsService } from './../service/playlists.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('/api/playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}

  @Get('/search')
  search(@Query('q') query: string) {
    return this.playlistsService.search(query);
  }

  @Post('/')
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Patch('/:id/add-song')
  addSongToPlaylist(
    @Body() addSongToPlaylistDto: AddSongToPlaylistDto,
    @Param() { id }: ObjectIdParams,
  ) {
    return this.playlistsService.addSongToPlaylist(id, addSongToPlaylistDto);
  }

  @Get('/:id/songs')
  getSongs(@Param() { id }: ObjectIdParams) {
    return this.playlistsService.getSongsInRandomOrder(id);
  }
}
