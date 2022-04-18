const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const ClientError = require('../../exceptions/ClientError');
// const {mapDBToModel} = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
  async addPlaylist({name, username}) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, username],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new ClientError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }
  async getPlaylists(username) {
    const query = {
      text: 'SELECT * FROM playlists WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
    }
  }

  async addSongPlaylist({playlistId, songId}) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO playlistsong VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);
    // console.log(songId);
    if (!result.rows.length) {
      throw new ClientError('Lagu gagal ditambahkan');
    }
  }

  async checkSongFound(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
  }

  async getPlaylistById(playlistId) {
    const query = {
      // text: 'SELECT * FROM playlists WHERE id = $1',
      text: 'SELECT playlists.id,playlists.name,users.username FROM playlists INNER JOIN users ON playlists.username=users.id WHERE playlists.id = $1',

      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows[0];
  }
  async getSongPlaylists(playlistId) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs JOIN playlistsong ON songs.id = playlistsong.song_id WHERE playlistsong.playlist_id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);


    return result.rows;
  }
  async deleteSongPlaylistById(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsong WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new ClientError('Lagu gagal dihapus.');
    }
  }

  async verifyPlaylistOwner(id, username) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    const playlist = result.rows[0];
    if (playlist.username !== username) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}
module.exports = PlaylistsService;
