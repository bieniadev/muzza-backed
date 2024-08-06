import { Id } from './../../common/bases/base.repository';

import { PlaylistsRepository } from './../repositories/playlists.repository';
import { CreatePlaylistDto } from './../dtos/create-playlist.dto';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { AddSongToPlaylistDto } from '../dtos/add-song-to-playlist.dto';
@Injectable()
export class PlaylistsService {
  constructor(private playlistsRepository: PlaylistsRepository) {}

  async search(query: string) {
    const enhancedQuery = `${query} official video`;

    const searchResponse = await google.youtube('v3').search.list({
      key: process.env.YOUTUBE_API_KEY,
      q: enhancedQuery,
      part: ['snippet'],
      type: ['video'],
      maxResults: 5,
    });

    const videoIds = searchResponse.data.items.map((item) => item.id.videoId);

    const videosReponse = await google.youtube('v3').videos.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ['snippet', 'contentDetails'],
      id: videoIds,
      videoCategoryId: '10',
    });

    return videosReponse.data;
  }

  async create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsRepository.createOne(createPlaylistDto);
  }

  async addSongToPlaylist(
    playlistId: Id,
    addSongToPlaylistDto: AddSongToPlaylistDto,
  ) {
    return this.playlistsRepository.updateById(
      playlistId,
      {
        $push: { songs: addSongToPlaylistDto },
      },
      { new: true },
    );
  }

  async getSongsInRandomOrder(playlistId: Id) {
    const playlist = await this.playlistsRepository.findById(playlistId);

    return this.shuffle(playlist.songs);
  }

  private shuffle(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
