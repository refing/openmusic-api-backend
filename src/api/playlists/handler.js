class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
    this.postSongPlaylistHandler = this.postSongPlaylistHandler.bind(this);
    this.getSongPlaylistsHandler = this.getSongPlaylistsHandler.bind(this);
    this.deleteSongPlaylistHandler = this.deleteSongPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const {name} = request.payload;
    const {id: credentialId} = request.auth.credentials;
    console.log(request.auth.credentials);
    // const {username} = 'own';

    const playlistId = await this._service.addPlaylist({name, username: credentialId});

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }
  async getPlaylistsHandler(request) {
    const {id: credentialId} = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }
  async deletePlaylistHandler(request, h) {
    const {playlistId} = request.params;
    const {id: credentialId} = request.auth.credentials;
    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    await this._service.deletePlaylistById(playlistId);
    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  async postSongPlaylistHandler(request, h) {
    this._validator.validateSongPlaylistPayload(request.payload);
    const {songId} = request.payload;
    const {playlistId} = request.params;
    const {id: credentialId} = request.auth.credentials;
    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    await this._service.checkSongFound(songId);
    await this._service.addSongPlaylist({playlistId, songId});

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }
  async getSongPlaylistsHandler(request) {
    const {playlistId} = request.params;
    const {id: credentialId} = request.auth.credentials;
    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    const playlist = await this._service.getPlaylistById(playlistId);
    playlist.songs = await this._service.getSongPlaylists(playlistId);
    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }
  async deleteSongPlaylistHandler(request, h) {
    const {playlistId} = request.params;
    const {songId} = request.payload;
    const {id: credentialId} = request.auth.credentials;
    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    await this._service.deleteSongPlaylistById(playlistId, songId);
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}
module.exports = PlaylistsHandler;
